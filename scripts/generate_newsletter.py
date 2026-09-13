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

INCLUDE_INSTAGRAM = False#True   # set to False to leave the Instagram section out

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
    return f"https://cdn.yesticket.org/picture_me.php?type=event&id={m.group(1)}&width=1200&height=628" if m else None

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
    raw_url  = show.get("url", "") or ""
    # Fall back to the general events page if the slug looks malformed (leading dash)
    if not raw_url or re.search(r"/event/[a-z]{2}/-", raw_url):
        raw_url = "https://www.yesticket.org/events/fr/liber-ligue-dimpro-de-berlin/"
    url      = h(raw_url)
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
    desc_p   = f'<p class="text-444" style="margin:0 0 18px;font-size:14px;color:#444;line-height:1.7">{desc}</p>' if desc else ""

    return f"""
    <table width="100%" cellpadding="0" cellspacing="0"
           style="margin-bottom:24px;border-radius:10px;overflow:hidden;
                  box-shadow:0 2px 12px rgba(31,55,200,0.10)">
      {img_row}
      <tr><td class="white-bg" bgcolor="#fff" style="background:#fff;padding:22px 28px">
        <p class="brand-text" style="margin:0 0 8px;font-size:12px;font-weight:bold;color:{BLUE};
                  text-transform:uppercase;letter-spacing:0.08em">
          {h(date_str)}{time_row}
        </p>
        <h3 class="navy-text" style="margin:0 0 12px;font-size:22px;font-weight:bold;color:#0a0a2e;
                   font-family:Georgia,'Times New Roman',serif">{title}</h3>
        {desc_p}
        <table cellpadding="0" cellspacing="0" border="0"><tr>
          <td class="btn-bg" bgcolor="{BLUE}" style="background:{BLUE};border-radius:8px">
            <a href="{url}" class="yellow-text" style="display:inline-block;padding:12px 26px;
               color:{YELLOW};text-decoration:none;
               font-weight:bold;font-size:15px;border-radius:8px">{btn}</a>
          </td>
        </tr></table>
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

def lang_section(shows, lang):
    if lang == "fr":
        lang_label  = "Version fran&#231;aise"
        greeting    = "Bonjour &#224; toutes et tous,"
        intro       = "Voici les derni&#232;res nouvelles de la LIBER &#8212; Ligue d&#8217;Improvisation de Berlin."
        shows_h     = "Prochain spectacle"
        no_shows    = "Aucun spectacle pr&#233;vu pour le moment."
        courses_h   = "Ateliers d&#8217;improvisation"
        courses_txt = ("Tu as d&#233;j&#224; une premi&#232;re exp&#233;rience en th&#233;&#226;tre "
                       "d&#8217;improvisation (1-2 ans) et tu souhaites approfondir&#160;? Alors tu es "
                       "exactement au bon endroit&#160;! N&#8217;h&#233;site pas &#224; nous &#233;crire "
                       f'&#224;&#160;: <a href="mailto:liber.impro@gmail.com" style="color:{BLUE};font-weight:bold">liber.impro@gmail.com</a>')
    else:
        lang_label  = "Deutsche Version"
        greeting    = "Hallo zusammen,"
        intro       = "Hier sind die neuesten Nachrichten von der LIBER &#8212; Ligue d&#8217;Improvisation de Berlin."
        shows_h     = "N&#228;chste Auff&#252;hrung"
        no_shows    = "Derzeit keine Auff&#252;hrungen geplant."
        courses_h   = "Improvisationsworkshops"
        courses_txt = ("Du hast schon erste Erfahrungen im Improtheater (1-2 Jahre) gesammelt und "
                       "m&#246;chtest tiefer einsteigen? Dann bist du hier genau richtig! Schick uns "
                       f'gern eine Mail an: <a href="mailto:liber.impro@gmail.com" style="color:{BLUE};font-weight:bold">liber.impro@gmail.com</a>')

    shows_html   = "".join(show_card(s, lang) for s in shows[:1]) or f'<p style="color:#888;font-size:14px;padding:8px 0">{no_shows}</p>'

    return f"""
  <!-- LANG BADGE {lang.upper()} -->
  <tr>
    <td class="badge-bg" bgcolor="{BLUE_D}" style="background:{BLUE_D};padding:10px 32px">
      <p class="yellow-text" style="margin:0;font-size:13px;font-weight:bold;color:{YELLOW};
                letter-spacing:0.06em;text-transform:uppercase">{lang_label}</p>
    </td>
  </tr>

  <!-- INTRO {lang.upper()} -->
  <tr>
    <td class="white-bg" bgcolor="{WHITE}" style="background:{WHITE};padding:28px 32px 14px">
      <p class="navy-text" style="margin:0 0 6px;font-size:17px;font-weight:bold;color:#0a0a2e">{greeting}</p>
      <p class="text-444" style="margin:0;font-size:15px;color:#444;line-height:1.7">{intro}</p>
    </td>
  </tr>

  <!-- SHOWS {lang.upper()} -->
  <tr>
    <td class="white-bg" bgcolor="{WHITE}" style="background:{WHITE};padding:6px 32px 28px">
      <h2 class="brand-text" style="margin:0 0 18px;font-size:20px;font-weight:bold;color:{BLUE};
                 font-family:Georgia,'Times New Roman',serif;border-bottom:3px solid {YELLOW};
                 padding-bottom:10px">{shows_h}</h2>
      {shows_html}
    </td>
  </tr>

  <!-- COURSES {lang.upper()} -->
  <tr>
    <td class="page-section-bg" bgcolor="{BG}" style="background:{BG};padding:24px 32px">
      <h2 class="brand-text" style="margin:0 0 6px;font-size:20px;font-weight:bold;color:{BLUE};
                 font-family:Georgia,'Times New Roman',serif;border-bottom:3px solid {YELLOW};
                 padding-bottom:10px">{courses_h}</h2>
      <p class="text-444" style="margin:0;font-size:15px;color:#444;line-height:1.7">{courses_txt}</p>
    </td>
  </tr>"""

# =============================================================================
# FULL BILINGUAL HTML
# =============================================================================

def build_html(shows, ig_posts):
    fr_block = lang_section(shows, "fr")
    de_block = lang_section(shows, "de")
    if INCLUDE_INSTAGRAM and ig_posts:
        ig_html = "".join(ig_cell(p) for p in ig_posts[:3])
        ig_section = f"""
  <!-- INSTAGRAM -->
  <tr>
    <td class="white-bg" bgcolor="{WHITE}" style="background:{WHITE};padding:28px 32px">
      <h2 class="brand-text" style="margin:0 0 16px;font-size:20px;font-weight:bold;color:{BLUE};
                 font-family:Georgia,'Times New Roman',serif;border-bottom:3px solid {YELLOW};
                 padding-bottom:10px">Instagram &#64;{INSTAGRAM_USER}</h2>
      <table width="100%" cellpadding="0" cellspacing="0"><tr>{ig_html}</tr></table>
      <p style="margin:16px 0 0;text-align:center">
        <a href="https://www.instagram.com/{INSTAGRAM_USER}/"
           style="color:{BLUE};font-size:13px;font-weight:bold;text-decoration:none">
          Suivez-nous / Folgt uns &#8594;
        </a>
      </p>
    </td>
  </tr>"""
    else:
        ig_section = ""

    return f"""<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="color-scheme" content="light dark"/>
  <meta name="supported-color-schemes" content="light dark"/>
  <title>LIBER Newsletter</title>
  <style>
    /* Gmail's app only trusts our colors (instead of auto-flipping lightness
       while preserving hue) once we declare support for BOTH schemes and
       mirror every color inside prefers-color-scheme:dark below. */
    :root {{ color-scheme: light dark; }}
    body {{ font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #e8ecf8 !important; color: #0a0a2e !important; }}
    h1, h2, h3 {{ font-family: Georgia, 'Times New Roman', serif; font-weight: 700; }}
    /* Outlook.com / Yahoo mark the DOM with these attributes when their dark
       mode is on; re-assert every brand color, not just the body background.
       Gmail's mobile app ignores this entirely (and the meta tags above) — it
       is handled separately via bgcolor/color HTML attributes on the elements. */
    [data-ogsc] body, [data-ogsb] body {{ background-color: #e8ecf8 !important; color: #0a0a2e !important; }}
    [data-ogsc] .hdr-bg, [data-ogsb] .hdr-bg {{ background-color: {BLUE} !important; }}
    [data-ogsc] .badge-bg, [data-ogsb] .badge-bg {{ background-color: {BLUE_D} !important; }}
    [data-ogsc] .white-bg, [data-ogsb] .white-bg {{ background-color: {WHITE} !important; }}
    [data-ogsc] .page-section-bg, [data-ogsb] .page-section-bg {{ background-color: {BG} !important; }}
    [data-ogsc] .btn-bg, [data-ogsb] .btn-bg {{ background-color: {BLUE} !important; }}
    [data-ogsc] .yellow-text, [data-ogsb] .yellow-text {{ color: {YELLOW} !important; }}
    [data-ogsc] .brand-text, [data-ogsb] .brand-text {{ color: {BLUE} !important; }}
    [data-ogsc] .navy-text, [data-ogsb] .navy-text {{ color: #0a0a2e !important; }}
    [data-ogsc] .text-444, [data-ogsb] .text-444 {{ color: #444444 !important; }}
    @media (prefers-color-scheme: dark) {{
      body {{ background-color: #e8ecf8 !important; color: #0a0a2e !important; }}
      .hdr-bg {{ background-color: {BLUE} !important; }}
      .badge-bg {{ background-color: {BLUE_D} !important; }}
      .white-bg {{ background-color: {WHITE} !important; }}
      .page-section-bg {{ background-color: {BG} !important; }}
      .btn-bg {{ background-color: {BLUE} !important; }}
      .yellow-text {{ color: {YELLOW} !important; }}
      .brand-text {{ color: {BLUE} !important; }}
      .navy-text {{ color: #0a0a2e !important; }}
      .text-444 {{ color: #444444 !important; }}
    }}
  </style>
</head>
<body bgcolor="#e8ecf8" text="#0a0a2e" style="margin:0;padding:0;background:#e8ecf8 !important;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#0a0a2e">

<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#e8ecf8" style="background:#e8ecf8">
<tr><td align="center" bgcolor="#e8ecf8" style="padding:28px 12px;background:#e8ecf8">
<table width="560" cellpadding="0" cellspacing="0"
       style="max-width:560px;width:100%;border-radius:12px;overflow:hidden;
              box-shadow:0 4px 24px rgba(0,0,0,0.12)">

  <!-- HEADER -->
  <tr>
    <td class="hdr-bg" bgcolor="{BLUE}" style="background:{BLUE};padding:32px;text-align:center">
      <img src="https://liber-impro.com/images/logo.jpg"
           alt="LIBER — Ligue d'Improvisation de Berlin" width="200"
           style="width:200px;max-width:200px;height:200px;display:block;margin:0 auto;border-radius:50%"/>
    </td>
  </tr>

  {fr_block}

  <!-- DIVIDER -->
  <tr>
    <td class="hdr-bg" bgcolor="{BLUE}" style="background:{BLUE};padding:12px 32px;text-align:center">
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.5);
                letter-spacing:0.1em;text-transform:uppercase">
        &#8212; Deutsche Version unten / Version allemande ci-dessous &#8212;
      </p>
    </td>
  </tr>

  {de_block}

  {ig_section}

  <!-- FOOTER -->
  <tr>
    <td class="badge-bg" bgcolor="{BLUE_D}" style="background:{BLUE_D};padding:28px 32px;text-align:center">
      <p style="margin:0 0 12px">
        <a href="https://www.instagram.com/{INSTAGRAM_USER}/"
           style="display:inline-block;margin:0 8px;padding:8px 16px 8px 12px;
                  background:rgba(255,255,255,0.1);color:{WHITE};text-decoration:none;
                  font-size:13px;border-radius:6px;vertical-align:middle">
          <img src="https://liber-impro.com/images/instagram_logo_email.png" width="16" height="16"
               alt="" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;border-radius:50%"/>Instagram</a>
        <a href="https://www.facebook.com/liber.impro"
           style="display:inline-block;margin:0 8px;padding:8px 16px 8px 12px;
                  background:rgba(255,255,255,0.1);color:{WHITE};text-decoration:none;
                  font-size:13px;border-radius:6px;vertical-align:middle">
          <img src="https://liber-impro.com/images/facebook_logo_email.png" width="16" height="16"
               alt="" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;border-radius:50%"/>Facebook</a>
        <a href="https://liber-impro.com"
           style="display:inline-block;margin:0 8px;padding:8px 16px 8px 12px;
                  background:rgba(255,255,255,0.1);color:{WHITE};text-decoration:none;
                  font-size:13px;border-radius:6px;vertical-align:middle">
          <img src="https://liber-impro.com/images/logo.jpg" width="16" height="16"
               alt="" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;border-radius:50%"/>liber-impro.com</a>
      </p>
      <p style="margin:12px 0 6px;font-size:12px;color:rgba(255,255,255,0.5)">
        Vous recevez cet email car vous vous &#234;tes abonn&#233;&#183;e &#224; la newsletter de LIBER.<br/>
        Du erh&#228;ltst diese E-Mail, weil du den LIBER-Newsletter abonniert hast.
      </p>

      <p style="margin:10px 0 0;font-size:11px;color:rgba(255,255,255,0.3)">
        LIBER &#183; c/o Cours et Jardins gUG &#183; Berlin &#183;
        <a href="https://liber-impro.com/#imprint"
           style="color:rgba(255,255,255,0.3)">Impressum</a> &#183;
        <a href="https://www.coursetjardins.org/datenschutz"
           style="color:rgba(255,255,255,0.3)">Datenschutz</a>
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
    print("[1/3] Fetching shows from YesTicket...")
    shows = fetch_shows()
    print(f"      -> {len(shows)} upcoming show(s)")

    print("[2/3] Reading Instagram posts...")
    ig_posts = fetch_instagram_posts() if INCLUDE_INSTAGRAM else []
    if not INCLUDE_INSTAGRAM:
        print("      -> Instagram section disabled (INCLUDE_INSTAGRAM = False)")

    print("[3/3] Generating HTML...")
    today    = date.today().strftime("%Y-%m-%d")
    filename = os.path.join(OUTPUT_DIR, f"newsletter_{today}.html")
    with open(filename, "w", encoding="utf-8-sig") as f:
        f.write(build_html(shows, ig_posts))

    print(f"\nSaved: {filename}")
    print("Open in a browser to preview, then paste into Mailchimp.")
