#!/usr/bin/env python3
"""
scripts/generate_newsletter.py
Generates a bilingual (FR + DE) LIBER newsletter HTML for Mailchimp.

Requirements:
    pip install requests

Usage:
    1. Fill in INSTAGRAM_POSTS below with the 3 latest posts from @liber.impro
       - Open a post on Instagram, right-click the image -> "Open image in new tab"
       - Copy the URL from the address bar and paste it as image_url
       - Add a short caption and the link to the post
    2. Run: python scripts/generate_newsletter.py
    3. Open the generated newsletter_YYYY-MM-DD.html in a browser to preview
    4. Paste the HTML into Mailchimp -> Campaigns -> Create -> Email -> Code your own
"""

import os, re, html as _html, requests
from datetime import date, datetime

# =============================================================================
# INSTAGRAM POSTS — fill in before each newsletter send
# =============================================================================
# How to get the image URL:
#   1. Go to https://www.instagram.com/liber.impro/
#   2. Click a post, right-click the image -> "Open image in new tab"
#   3. Copy the URL from the address bar of the new tab
# Note: paste the URLs right before running — they expire after a few hours.

INSTAGRAM_POSTS = [
    {
        "image_url": "",   # <- paste image URL here
        "caption":   "",   # <- short caption
        "link":      "https://www.instagram.com/liber.impro/",
    },
    {
        "image_url": "",   # <- paste image URL here
        "caption":   "",   # <- short caption
        "link":      "https://www.instagram.com/liber.impro/",
    },
    {
        "image_url": "",   # <- paste image URL here
        "caption":   "",   # <- short caption
        "link":      "https://www.instagram.com/liber.impro/",
    },
]

# =============================================================================
# CONFIG
# =============================================================================

SUPABASE_URL      = "https://hfbqnjuxuvmmakhxgqbp.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmYnFuanV4dXZtbWFraHhncWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDI5MTcsImV4cCI6MjA5NDg3ODkxN30.It_38kzIHZ6iF_7q33lx4E55esRow2U4CByJUMEVTRY"

YT_ICAL_URL    = "https://www.yesticket.org/ical/liber-ligue-dimpro-de-berlin.ics"
INSTAGRAM_USER = "liber.impro"

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

# =============================================================================
# BRAND COLOURS (from main.css)
# =============================================================================

BLUE     = "#1F37C8"
BLUE_D   = "#142480"
YELLOW   = "#FFD93D"
WHITE    = "#FFFFFF"
BG       = "#F4F6FF"

# =============================================================================
# YESTICKET iCal PARSER
# =============================================================================

def _unfold(text):
    return text.replace("\r\n ", "").replace("\r\n\t", "").replace("\n ", "").replace("\n\t", "")

def _unescape(s):
    return (s or "").replace("\\n", "\n").replace("\\,", ",").replace("\\;", ";").replace("\\\\", "\\")

def _clean_title(s):
    return re.sub(r"\s*\(LIBER,?\s*Ligue d['']Impro de Berlin\)\s*$", "", s, flags=re.IGNORECASE).strip()

def _image_url(uid):
    m = re.match(r"^(\d+)", uid or "")
    return f"https://cdn.yesticket.org/picture_me.php?type=event&id={m.group(1)}&width=560&height=292" if m else None

def _split_desc(desc):
    if not desc:
        return {"de": "", "fr": ""}
    parts = re.split(r"\n\s*-{20,}\s*\n", desc)
    if len(parts) >= 2:
        return {"de": parts[0].strip(), "fr": "\n".join(parts[1:]).strip()}
    return {"de": desc.strip(), "fr": desc.strip()}

def fetch_shows():
    try:
        r = requests.get(YT_ICAL_URL, timeout=10)
        r.raise_for_status()
        r.encoding = 'utf-8'   # iCal feed is UTF-8; override wrong auto-detection
    except Exception as e:
        print(f"  Warning: YesTicket fetch failed: {e}")
        return []

    today = date.today().isoformat()
    events, cur = [], None

    for raw in _unfold(r.text).split("\n"):
        raw = raw.rstrip()
        if raw == "BEGIN:VEVENT":
            cur = {}
        elif raw == "END:VEVENT":
            if cur and cur.get("date", "") >= today:
                events.append(cur)
            cur = None
        elif cur is not None and ":" in raw:
            key, _, val = raw.partition(":")
            key = key.split(";")[0].upper()
            val = _unescape(val.strip())
            if   key == "SUMMARY":     cur["title"] = _clean_title(val)
            elif key == "URL":         cur["url"]   = val
            elif key == "UID":         cur["image_url"] = _image_url(val)
            elif key == "DTSTART":
                m = re.match(r"(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})", val)
                if m:
                    cur["date"] = f"{m[1]}-{m[2]}-{m[3]}"
                    cur["time"] = f"{m[4]}:{m[5]}"
            elif key == "DESCRIPTION":
                d = _split_desc(val)
                cur["desc_fr"] = d["fr"]
                cur["desc_de"] = d["de"]

    events.sort(key=lambda e: e.get("date", ""))
    return events

# =============================================================================
# INSTAGRAM — uses the manual list defined at the top of this file
# =============================================================================

def fetch_instagram_posts():
    filled = [p for p in INSTAGRAM_POSTS if p.get("image_url")]
    if not filled:
        print("  Note: no Instagram images filled in — section will show placeholders")
    return INSTAGRAM_POSTS

# =============================================================================
# SUPABASE FETCHERS
# =============================================================================

def _sb(path, params=None):
    headers = {"apikey": SUPABASE_ANON_KEY, "Authorization": f"Bearer {SUPABASE_ANON_KEY}"}
    r = requests.get(f"{SUPABASE_URL}/rest/v1/{path}", headers=headers, params=params, timeout=10)
    r.raise_for_status()
    return r.json()

def fetch_courses():
    try:
        return _sb("courses", {"visible": "eq.true", "select": "*"})
    except Exception as e:
        print(f"  Warning: Supabase courses failed: {e}")
        return []

def fetch_registrations_open():
    try:
        data = _sb("site_content", {"key": "eq.__registrations_open", "select": "value_fr"})
        return (data[0].get("value_fr", "true") != "false") if data else True
    except Exception as e:
        print(f"  Warning: Supabase registrations failed: {e}")
        return True

# =============================================================================
# HTML HELPERS
# =============================================================================

MONTHS_FR = ["janvier","fevrier","mars","avril","mai","juin",
             "juillet","aout","septembre","octobre","novembre","decembre"]
MONTHS_FR_ACC = ["janvier","f&#233;vrier","mars","avril","mai","juin",
                 "juillet","ao&#251;t","septembre","octobre","novembre","d&#233;cembre"]
MONTHS_DE = ["Januar","Februar","M&#228;rz","April","Mai","Juni",
             "Juli","August","September","Oktober","November","Dezember"]

def _fmt_date(s, lang):
    try:
        d = datetime.strptime(s, "%Y-%m-%d")
        if lang == "fr":
            return f"{d.day} {MONTHS_FR_ACC[d.month-1]} {d.year}"
        else:
            return f"{d.day}. {MONTHS_DE[d.month-1]} {d.year}"
    except Exception:
        return s

def h(s):
    return _html.escape(str(s or ""), quote=True)

def show_card(show, lang):
    title    = h(show.get("title", ""))
    date_str = _fmt_date(show.get("date", ""), lang)
    time_str = show.get("time", "")
    url      = h(show.get("url", "#"))
    img      = show.get("image_url")
    desc_raw = show.get(f"desc_{lang}") or show.get("desc_fr") or ""
    desc     = h(desc_raw[:300] + ("..." if len(desc_raw) > 300 else ""))
    btn      = "R&#233;server des billets &rarr;" if lang == "fr" else "Tickets kaufen &rarr;"

    img_row = f"""
      <tr><td style="padding:0;line-height:0">
        <a href="{url}"><img src="{h(img)}" alt="{title}" width="560"
           style="width:100%;max-width:560px;height:auto;display:block"/></a>
      </td></tr>""" if img else ""

    time_row = f" &nbsp;&#183;&nbsp; {h(time_str)}" if time_str else ""
    desc_p   = f'<p style="margin:0 0 18px;font-size:14px;color:#444;line-height:1.7">{desc}</p>' if desc else ""

    return f"""
    <table width="100%" cellpadding="0" cellspacing="0"
           style="margin-bottom:24px;border-radius:10px;overflow:hidden;
                  box-shadow:0 2px 12px rgba(31,55,200,0.10)">
      {img_row}
      <tr><td style="background:#fff;padding:22px 28px">
        <p style="margin:0 0 8px;font-size:12px;font-weight:bold;color:{BLUE};
                  text-transform:uppercase;letter-spacing:0.08em">
          {h(date_str)}{time_row}
        </p>
        <h3 style="margin:0 0 12px;font-size:22px;font-weight:bold;color:#0a0a2e;
                   font-family:'Fredoka',Georgia,serif">{title}</h3>
        {desc_p}
        <a href="{url}" style="display:inline-block;padding:12px 26px;
           background:{BLUE};color:{YELLOW};text-decoration:none;
           font-weight:bold;font-size:15px;border-radius:8px">{btn}</a>
      </td></tr>
    </table>"""

def course_card(course, lang):
    name  = h(course.get(f"title_{lang}") or course.get("title_fr") or "")
    level = course.get(f"level_{lang}") or course.get("level_fr") or ""
    desc  = course.get(f"desc_{lang}") or course.get("desc_fr") or ""
    desc  = h(desc[:300] + ("..." if len(desc) > 300 else ""))
    pill  = (f'<span style="display:inline-block;margin-bottom:6px;padding:3px 12px;'
             f'background:{BLUE};color:{YELLOW};border-radius:20px;font-size:11px;'
             f'font-weight:bold;letter-spacing:0.05em">{h(level)}</span><br/>') if level else ""
    dp    = f'<p style="margin:5px 0 0;font-size:13px;color:#555;line-height:1.6">{desc}</p>' if desc else ""
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0"
           style="margin-bottom:10px;background:{WHITE};border-radius:8px;
                  border-left:4px solid {YELLOW}">
      <tr><td style="padding:14px 18px">
        {pill}<strong style="font-size:15px;color:#0a0a2e">{name}</strong>{dp}
      </td></tr>
    </table>"""

def ig_cell(post):
    img = post.get("image_url", "")
    cap = h((post.get("caption") or "")[:80])
    lnk = h(post.get("link", f"https://www.instagram.com/{INSTAGRAM_USER}/"))
    if img:
        inner = f'<img src="{h(img)}" alt="{cap}" width="160" style="width:100%;height:160px;object-fit:cover;display:block;border-radius:8px"/>'
    else:
        inner = f'<div style="width:100%;height:160px;background:#dde3f5;border-radius:8px;display:table-cell;vertical-align:middle;text-align:center;font-size:12px;color:#888">Add image</div>'
    return f"""
    <td width="33%" style="padding:4px;vertical-align:top">
      <a href="{lnk}" style="display:block;text-decoration:none">{inner}
        <p style="margin:6px 4px 0;font-size:12px;color:#333;line-height:1.4">{cap}</p>
      </a>
    </td>"""

# =============================================================================
# LANGUAGE SECTION
# =============================================================================

def lang_section(shows, courses, reg_open, lang):
    if lang == "fr":
        lang_label  = "Version fran&#231;aise"
        greeting    = "Bonjour &#224; toutes et tous,"
        intro       = "Voici les derni&#232;res nouvelles de LIBER &#8212; Ligue d&#8217;Improvisation de Berlin."
        shows_h     = "Prochain spectacle"
        no_shows    = "Aucun spectacle pr&#233;vu pour le moment."
        courses_h   = "Ateliers d&#8217;improvisation"
        reg_txt     = "Les inscriptions sont ouvertes !" if reg_open else "Les inscriptions sont actuellement ferm&#233;es."
        reg_color   = "#1a7a3c" if reg_open else "#b91c1c"
        courses_btn = "Voir les ateliers et s&#8217;inscrire &rarr;"
        no_courses  = "Aucun atelier en cours."
    else:
        lang_label  = "Deutsche Version"
        greeting    = "Hallo zusammen,"
        intro       = "Hier sind die neuesten Nachrichten von LIBER &#8212; Ligue d&#8217;Improvisation de Berlin."
        shows_h     = "N&#228;chste Auff&#252;hrung"
        no_shows    = "Derzeit keine Auff&#252;hrungen geplant."
        courses_h   = "Improvisationsworkshops"
        reg_txt     = "Anmeldungen sind offen!" if reg_open else "Anmeldungen sind derzeit geschlossen."
        reg_color   = "#1a7a3c" if reg_open else "#b91c1c"
        courses_btn = "Workshops ansehen und anmelden &rarr;"
        no_courses  = "Derzeit keine Workshops."

    shows_html   = "".join(show_card(s, lang) for s in shows[:1]) or f'<p style="color:#888;font-size:14px;padding:8px 0">{no_shows}</p>'
    courses_html = "".join(course_card(c, lang) for c in courses) or f'<p style="color:#888;font-size:14px;padding:8px 0">{no_courses}</p>'

    return f"""
  <!-- LANG BADGE {lang.upper()} -->
  <tr>
    <td style="background:{BLUE_D};padding:10px 32px">
      <p style="margin:0;font-size:13px;font-weight:bold;color:{YELLOW};
                letter-spacing:0.06em;text-transform:uppercase">{lang_label}</p>
    </td>
  </tr>

  <!-- INTRO {lang.upper()} -->
  <tr>
    <td style="background:{WHITE};padding:28px 32px 14px">
      <p style="margin:0 0 6px;font-size:17px;font-weight:bold;color:#0a0a2e">{greeting}</p>
      <p style="margin:0;font-size:15px;color:#444;line-height:1.7">{intro}</p>
    </td>
  </tr>

  <!-- SHOWS {lang.upper()} -->
  <tr>
    <td style="background:{WHITE};padding:6px 32px 28px">
      <h2 style="margin:0 0 18px;font-size:20px;font-weight:bold;color:{BLUE};
                 font-family:'Fredoka',Georgia,serif;border-bottom:3px solid {YELLOW};
                 padding-bottom:10px">{shows_h}</h2>
      {shows_html}
    </td>
  </tr>

  <!-- COURSES {lang.upper()} -->
  <tr>
    <td style="background:{BG};padding:24px 32px">
      <h2 style="margin:0 0 6px;font-size:20px;font-weight:bold;color:{BLUE};
                 font-family:'Fredoka',Georgia,serif;border-bottom:3px solid {YELLOW};
                 padding-bottom:10px">{courses_h}</h2>
      <p style="margin:0 0 14px;font-size:13px;font-weight:bold;color:{reg_color}">{reg_txt}</p>
      {courses_html}
      <a href="https://liber-impro.com/#courses"
         style="display:inline-block;margin-top:14px;padding:11px 24px;
                background:{BLUE};color:{YELLOW};text-decoration:none;
                font-weight:bold;font-size:14px;border-radius:8px">{courses_btn}</a>
    </td>
  </tr>"""

# =============================================================================
# FULL BILINGUAL HTML
# =============================================================================

def build_html(shows, courses, reg_open, ig_posts):
    ig_html  = "".join(ig_cell(p) for p in ig_posts[:3])
    fr_block = lang_section(shows, courses, reg_open, "fr")
    de_block = lang_section(shows, courses, reg_open, "de")

    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>LIBER Newsletter</title>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@700&family=Nunito:wght@400;700&display=swap" rel="stylesheet"/>
  <style>
    body {{ font-family: 'Nunito', Arial, Helvetica, sans-serif; }}
    h1, h2, h3 {{ font-family: 'Fredoka', Georgia, serif; font-weight: 700; }}
  </style>
</head>
<body style="margin:0;padding:0;background:#e8ecf8;font-family:'Nunito',Arial,Helvetica,sans-serif">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#e8ecf8">
<tr><td align="center" style="padding:28px 12px">
<table width="560" cellpadding="0" cellspacing="0"
       style="max-width:560px;width:100%;border-radius:12px;overflow:hidden;
              box-shadow:0 4px 24px rgba(0,0,0,0.12)">

  <!-- HEADER -->
  <tr>
    <td style="background:{BLUE};padding:40px 32px;text-align:center">
      <h1 style="margin:0 0 4px;font-family:'Fredoka',Georgia,serif;font-size:64px;
                 font-weight:700;color:{YELLOW};letter-spacing:0.06em;line-height:1">
        LIBER
      </h1>
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.75);
                letter-spacing:0.16em;text-transform:uppercase">
        Ligue d&#8217;Improvisation de Berlin
      </p>
    </td>
  </tr>

  {fr_block}

  <!-- DIVIDER -->
  <tr>
    <td style="background:{BLUE};padding:12px 32px;text-align:center">
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);
                letter-spacing:0.1em;text-transform:uppercase">
        &#8212; Deutsche Version unten / Version allemande ci-dessous &#8212;
      </p>
    </td>
  </tr>

  {de_block}

  <!-- INSTAGRAM -->
  <tr>
    <td style="background:{WHITE};padding:28px 32px">
      <h2 style="margin:0 0 16px;font-size:20px;font-weight:bold;color:{BLUE};
                 font-family:'Fredoka',Georgia,serif;border-bottom:3px solid {YELLOW};
                 padding-bottom:10px">Instagram &#64;{INSTAGRAM_USER}</h2>
      <table width="100%" cellpadding="0" cellspacing="0"><tr>{ig_html}</tr></table>
      <p style="margin:16px 0 0;text-align:center">
        <a href="https://www.instagram.com/{INSTAGRAM_USER}/"
           style="color:{BLUE};font-size:13px;font-weight:bold;text-decoration:none">
          Suivez-nous / Folgt uns &#8594;
        </a>
      </p>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="background:{BLUE_D};padding:28px 32px;text-align:center">
      <p style="margin:0 0 12px">
        <a href="https://www.instagram.com/{INSTAGRAM_USER}/"
           style="display:inline-block;margin:0 8px;padding:8px 16px;
                  background:rgba(255,255,255,0.1);color:{WHITE};text-decoration:none;
                  font-size:13px;border-radius:6px">Instagram</a>
        <a href="https://www.facebook.com/liber.impro"
           style="display:inline-block;margin:0 8px;padding:8px 16px;
                  background:rgba(255,255,255,0.1);color:{WHITE};text-decoration:none;
                  font-size:13px;border-radius:6px">Facebook</a>
        <a href="https://liber-impro.com"
           style="display:inline-block;margin:0 8px;padding:8px 16px;
                  background:rgba(255,255,255,0.1);color:{WHITE};text-decoration:none;
                  font-size:13px;border-radius:6px">liber-impro.com</a>
      </p>
      <p style="margin:12px 0 6px;font-size:12px;color:rgba(255,255,255,0.5)">
        Vous recevez cet email car vous vous &#234;tes abonn&#233;&#183;e &#224; la newsletter de LIBER.<br/>
        Du erh&#228;ltst diese E-Mail, weil du den LIBER-Newsletter abonniert hast.
      </p>
      <p style="margin:8px 0;font-size:13px">
        <a href="*|UNSUB|*" style="color:{YELLOW};text-decoration:none;font-weight:bold">
          Se d&#233;sabonner / Abmelden
        </a>
      </p>
      <p style="margin:10px 0 0;font-size:11px;color:rgba(255,255,255,0.3)">
        LIBER &#183; c/o THEALINGUA gGmbH &#183; Berlin &#183;
        <a href="https://liber-impro.com/#imprint"
           style="color:rgba(255,255,255,0.3)">Impressum</a>
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>

</body>
</html>"""

# =============================================================================
# MAIN
# =============================================================================

if __name__ == "__main__":
    print("[1/4] Fetching shows from YesTicket...")
    shows = fetch_shows()
    print(f"      -> {len(shows)} upcoming show(s)")

    print("[2/4] Fetching courses & registration status from Supabase...")
    courses  = fetch_courses()
    reg_open = fetch_registrations_open()
    print(f"      -> {len(courses)} course(s), registrations {'open' if reg_open else 'closed'}")

    print("[3/4] Reading Instagram posts...")
    ig_posts = fetch_instagram_posts()

    print("[4/4] Generating HTML...")
    today    = date.today().strftime("%Y-%m-%d")
    filename = os.path.join(OUTPUT_DIR, f"newsletter_{today}.html")
    with open(filename, "w", encoding="utf-8-sig") as f:
        f.write(build_html(shows, courses, reg_open, ig_posts))

    print(f"\nSaved: {filename}")
    print("Open in a browser to preview, then paste into Mailchimp.")
