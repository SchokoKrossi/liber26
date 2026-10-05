#!/usr/bin/env python3
"""
scripts/generate_newsletter.py
Generates a bilingual (FR + DE) LIBER newsletter HTML for Mailchimp.

Requirements:
    pip install requests pillow

Usage:
    1. Fill in INSTAGRAM_POSTS below with the 3 latest posts from @liber.impro
       - Open a post on Instagram, right-click the image -> "Open image in new tab"
       - Copy the URL from the address bar and paste it as image_url
       - Add a short caption and the link to the post
    2. Optionally choose the members for the header in HEADER_MEMBERS (random otherwise)
    3. Run: python scripts/generate_newsletter.py
    4. If the script says the header is NOT ONLINE YET: commit + push the new
       images/newsletter/header_*.jpg to the website
    5. Open the generated newsletter_YYYY-MM-DD.html in a browser to preview
    6. Paste the HTML into Mailchimp -> Campaigns -> Create -> Email -> Code your own
"""

import os, io, re, random, hashlib, html as _html, requests
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

# Header collage: member cut-outs from images/members/ arranged around the logo.
# Set to False to fall back to the plain logo header.
INCLUDE_MEMBER_HEADER = True

# Pick exactly 4 members (file names without .png, listed left to right),
# e.g. ["marion", "celeste", "christoph", "gaelle"].
# Leave empty to pick 4 at random (stable for the same day, different next time).
HEADER_MEMBERS = ["marion", "celeste", "christoph", "gaelle"]

# Never picked at random (duplicates / placeholders)
HEADER_EXCLUDE = {"unnamed", "benjamin2", "roxane_2"}

# Intro paragraph under the greeting — update before each send. Plain text, no HTML needed.
INTRO_FR = ("Après un show de rentrée qui nous a emmenés tout autour du monde, le mois "
            "d'octobre s'annonce encore plus fantastique avec la LIBER : nous jouerons d'abord avec "
            "nos amies de PENG Impro à Münster le 11 octobre puis à l'ACUD le 18 pour un "
            "mini-match + un long format FILM NOIR qui s'annoncent excellents !")
INTRO_DE = ("Nach einer Auftaktshow, die uns einmal um die ganze Welt geführt hat, wird der Oktober "
            "mit der LIBER noch fantastischer: Zuerst spielen wir am 11. Oktober mit unseren Freundinnen "
            "von PENG Impro in Münster, dann am 18. im ACUD ein Mini-Match + eine Longform FILM NOIR "
            "– das wird großartig!")

# News section (below the next show, replaces the old Courses section).
# Update the texts before each send. Plain text, no HTML needed.
INCLUDE_NEWS = True   # set to False to leave the news section out
NEWS_TITLE_FR = "Retour sur le dernier show"
NEWS_TITLE_DE = "Rückblick auf die letzte Show"
NEWS_FR = ("Quel show incroyable dimanche dernier ! Une croisière intersidérale si romantique, "
           "une colonie de vacances au fin fond du Far West et une séance de vol acrobatique dans les "
           "nuages : l'agence de voyage de la LIBER nous a emmenés dans toutes vos destinations les "
           "plus belles et originales ! On a déjà hâte de remettre ça avec vous dès le "
           "18 octobre prochain pour un mini-match et un long format !")
NEWS_DE = ("So was von einer geilen Show am letzten Sonntag! Eine romantische Weltraumkreuzfahrt, "
           "ein Ferienlager mitten im Far West und akrobatisches Fliegen in den Wolken: das "
           "LIBER-Reisebüro hat uns in all eure schönsten und fantastischen Wunschreiseziele "
           "gebracht! Wir freuen uns schon auf die nächste Show (Mini-Match und Longform) am 18.10.!")
# Photo above the news text: file name in images/newsletter/ (empty = no photo).
# The credit is printed into the bottom-right corner (empty = no credit).
# A generated news_*.jpg can be used directly — it already has its credit, so the
# original photo can be deleted once that file is pushed.
NEWS_IMAGE        = "news_62a401f2a8.jpg"
NEWS_IMAGE_CREDIT = "© Photo: Christian"

# "LIBER on tour" section (guest shows elsewhere, below the next show).
INCLUDE_TOUR   = True   # set to False to leave the section out
TOUR_TITLE_FR  = "La LIBER en vadrouille"
TOUR_TITLE_DE  = "LIBER unterwegs"
TOUR_FR        = ("Le 11 octobre, la LIBER part à Münster pour jouer avec Peng! Impro !")
TOUR_DE        = ("Am 11. Oktober geht die LIBER nach Münster und spielt mit Peng! Impro!")
TOUR_LINK      = "https://www.peng-impro.de/termine/"   # ticket link (empty = no button)

YT_ICAL_URL    = "https://www.yesticket.org/ical/liber-ligue-dimpro-de-berlin.ics"
INSTAGRAM_USER = "liber.impro"

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_DIR   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE_URL   = "https://liber-impro.com"

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
    # The CDN caches each URL for 30 days, so a poster replaced on YesTicket would still
    # show the old image. The daily `v` parameter forces a fresh copy.
    return (f"https://cdn.yesticket.org/picture_me.php?type=event&id={m.group(1)}"
            f"&width=1200&height=628&v={date.today():%Y%m%d}") if m else None

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
# HEADER COLLAGE — members around the logo, rendered as one image
# =============================================================================
# Email clients can't position or overlap images, so the whole header is
# composed here as a single JPEG. It is saved under images/newsletter/ and
# must be pushed to the website before the newsletter is sent.

HDR_SCALE = 2                       # render at 2x for sharp retina display
HDR_W, HDR_H = 560 * HDR_SCALE, 260 * HDR_SCALE
HDR_LOGO_D   = 168 * HDR_SCALE      # logo diameter
# Member boxes per side, outer then inner: (centre x from edge, max width, max height).
# Each photo is fitted into its box, so neighbours barely overlap.
HDR_SLOTS    = [(58, 122, 200), (152, 124, 216)]
HDR_COUNT    = 2 * len(HDR_SLOTS)

def _pick_header_members():
    members_dir = os.path.join(REPO_DIR, "images", "members")
    available = sorted(f[:-4] for f in os.listdir(members_dir) if f.lower().endswith(".png"))
    if HEADER_MEMBERS:
        missing = [m for m in HEADER_MEMBERS if m not in available]
        if missing:
            raise SystemExit(f"  Error: no image for {missing} in images/members/")
        if len(HEADER_MEMBERS) != HDR_COUNT:
            raise SystemExit(f"  Error: HEADER_MEMBERS must list exactly {HDR_COUNT} names")
        return HEADER_MEMBERS
    pool = [m for m in available if m not in HEADER_EXCLUDE]
    return random.Random(date.today().isoformat()).sample(pool, HDR_COUNT)

def _sticker(path, max_w, max_h):
    """Load a cut-out, fit it into max_w x max_h and give it a white outline + shadow."""
    from PIL import Image, ImageFilter
    im = Image.open(path).convert("RGBA")
    im = im.crop(im.getchannel("A").getbbox())
    k  = min(max_w / im.width, max_h / im.height)
    im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)

    pad    = 8 * HDR_SCALE
    canvas = Image.new("RGBA", (im.width + 2 * pad, im.height + pad), (0, 0, 0, 0))
    alpha  = Image.new("L", canvas.size, 0)
    alpha.paste(im.getchannel("A"), (pad, pad))

    shadow = alpha.filter(ImageFilter.GaussianBlur(5 * HDR_SCALE)).point(lambda a: a * 0.45)
    canvas.paste((10, 10, 46, 255), (0, 0), shadow)
    outline = alpha.filter(ImageFilter.MaxFilter(2 * 2 * HDR_SCALE + 1))
    canvas.paste((255, 255, 255, 255), (0, 0), outline)
    canvas.alpha_composite(im, (pad, pad))
    return canvas

def build_header_image(members):
    """Compose the header image and return its public URL."""
    from PIL import Image, ImageDraw, ImageFilter
    s = HDR_SCALE
    img = Image.new("RGBA", (HDR_W, HDR_H), BLUE)

    # Soft light spot behind the logo
    glow = Image.new("L", img.size, 0)
    r = HDR_LOGO_D * 0.85
    ImageDraw.Draw(glow).ellipse((HDR_W / 2 - r, HDR_H / 2 - r, HDR_W / 2 + r, HDR_H / 2 + r), fill=70)
    img.paste((255, 255, 255, 255), (0, 0), glow.filter(ImageFilter.GaussianBlur(40 * s)))

    # Members: left side then right side, back (outer) to front (inner)
    members_dir = os.path.join(REPO_DIR, "images", "members")
    half = len(HDR_SLOTS)
    left, right = members[:half], members[half:][::-1]
    for side, names in (("left", left), ("right", right)):
        for (cx, max_w, max_h), name in zip(HDR_SLOTS, names):
            st = _sticker(os.path.join(members_dir, f"{name}.png"), max_w * s, max_h * s)
            x  = cx * s if side == "left" else HDR_W - cx * s
            img.alpha_composite(st, (round(x - st.width / 2), HDR_H - st.height + 4 * s))

    # Logo on top: shadow, round-cropped logo
    d = HDR_LOGO_D
    lx, ly = (HDR_W - d) // 2, (HDR_H - d) // 2
    shadow = Image.new("L", img.size, 0)
    ImageDraw.Draw(shadow).ellipse((lx, ly + 4 * s, lx + d, ly + d + 4 * s), fill=120)
    img.paste((10, 10, 46, 255), (0, 0), shadow.filter(ImageFilter.GaussianBlur(8 * s)))
    logo = Image.open(os.path.join(REPO_DIR, "images", "logo.jpg")).convert("RGBA").resize((d, d), Image.LANCZOS)
    mask = Image.new("L", (d * 4, d * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, d * 4, d * 4), fill=255)
    img.paste(logo, (lx, ly), mask.resize((d, d), Image.LANCZOS))

    return _save_jpeg(img, "header")

def _save_jpeg(img, prefix):
    """Save to images/newsletter/ and return the public URL.
    Named after its content: re-running with the same input reuses the file that
    is already online, a changed image gets a new name (no stale caches)."""
    buf = io.BytesIO()
    img.convert("RGB").save(buf, "JPEG", quality=88, optimize=True, progressive=True)
    data  = buf.getvalue()
    fname = f"{prefix}_{hashlib.sha1(data).hexdigest()[:10]}.jpg"
    out_dir = os.path.join(REPO_DIR, "images", "newsletter")
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, fname), "wb") as f:
        f.write(data)
    return f"{SITE_URL}/images/newsletter/{fname}"

NEWS_IMG_W = 496   # width inside the news section (560 - 2 x 32 padding)

def build_news_image():
    """Resize the news photo for email and print the credit into it. Returns its public URL."""
    from PIL import Image, ImageDraw, ImageFont
    s   = HDR_SCALE
    src = os.path.join(REPO_DIR, "images", "newsletter", NEWS_IMAGE)
    if not os.path.exists(src):
        raise SystemExit(f"  Error: NEWS_IMAGE not found: images/newsletter/{NEWS_IMAGE}\n"
                         "         (if the original was deleted, set NEWS_IMAGE to its generated news_*.jpg)")
    if re.fullmatch(r"news_[0-9a-f]{10}\.jpg", NEWS_IMAGE):
        return f"{SITE_URL}/images/newsletter/{NEWS_IMAGE}"   # already processed
    img = Image.open(src).convert("RGB")
    w   = NEWS_IMG_W * s
    img = img.resize((w, round(img.height * w / img.width)), Image.LANCZOS)

    if NEWS_IMAGE_CREDIT:
        try:
            font = ImageFont.truetype("arial.ttf", 11 * s)
        except OSError:
            font = ImageFont.load_default(11 * s)
        overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
        draw    = ImageDraw.Draw(overlay)
        l, t, r, b = draw.textbbox((0, 0), NEWS_IMAGE_CREDIT, font=font)
        px, py, margin = 6 * s, 3 * s, 8 * s
        x1, y1 = img.width - margin, img.height - margin
        x0, y0 = x1 - (r - l) - 2 * px, y1 - (b - t) - 2 * py
        draw.rounded_rectangle((x0, y0, x1, y1), radius=4 * s, fill=(0, 0, 0, 140))
        draw.text((x0 + px - l, y0 + py - t), NEWS_IMAGE_CREDIT, font=font, fill=(255, 255, 255, 235))
        img = Image.alpha_composite(img.convert("RGBA"), overlay)
    return _save_jpeg(img, "news")

def is_online(url):
    try:
        return requests.head(url, timeout=10, allow_redirects=True).status_code == 200
    except Exception:
        return False

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

def _entities(s):
    """Escape plain text and write accents as numeric entities, like the rest of the template."""
    return h(s).encode("ascii", "xmlcharrefreplace").decode()

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
    btn      = "R&#233;server des billets" if lang == "fr" else "Tickets kaufen"

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

def lang_section(shows, lang, news_img_url=None):
    if lang == "fr":
        lang_label  = "Version fran&#231;aise"
        greeting    = "Bonjour &#224; toutes et tous,"
        intro       = _entities(INTRO_FR)
        shows_h     = "Prochain spectacle"
        no_shows    = "Aucun spectacle pr&#233;vu pour le moment."
        news_h      = NEWS_TITLE_FR
        news        = NEWS_FR
        tour_h      = TOUR_TITLE_FR
        tour        = TOUR_FR
        tour_btn    = "Billets"
    else:
        lang_label  = "Deutsche Version"
        greeting    = "Hallo zusammen,"
        intro       = _entities(INTRO_DE)
        shows_h     = "N&#228;chste Auff&#252;hrung"
        no_shows    = "Derzeit keine Auff&#252;hrungen geplant."
        news_h      = NEWS_TITLE_DE
        news        = NEWS_DE
        tour_h      = TOUR_TITLE_DE
        tour        = TOUR_DE
        tour_btn    = "Tickets"

    news_img = f"""<img src="{h(news_img_url)}" alt="" width="{NEWS_IMG_W}"
           style="width:100%;max-width:{NEWS_IMG_W}px;height:auto;display:block;border:0;border-radius:10px;margin:0 0 18px"/>
      """ if news_img_url else ""
    news_section = f"""

  <!-- NEWS {lang.upper()} -->
  <tr>
    <td class="page-section-bg" bgcolor="{BG}" style="background:{BG};padding:24px 32px">
      {news_img}<h2 class="brand-text" style="margin:0 0 6px;font-size:20px;font-weight:bold;color:{BLUE};
                 font-family:Georgia,'Times New Roman',serif;border-bottom:3px solid {YELLOW};
                 padding-bottom:10px">{_entities(news_h)}</h2>
      <p class="text-444" style="margin:0;font-size:15px;color:#444;line-height:1.7">{_entities(news)}</p>
    </td>
  </tr>""" if INCLUDE_NEWS and news else ""
    tour_button = f"""
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top:18px"><tr>
        <td class="btn-bg" bgcolor="{BLUE}" style="background:{BLUE};border-radius:8px">
          <a href="{h(TOUR_LINK)}" class="yellow-text" style="display:inline-block;padding:12px 26px;
             color:{YELLOW};text-decoration:none;
             font-weight:bold;font-size:15px;border-radius:8px">{tour_btn}</a>
        </td>
      </tr></table>""" if TOUR_LINK else ""
    tour_section = f"""

  <!-- TOUR {lang.upper()} -->
  <tr>
    <td class="white-bg" bgcolor="{WHITE}" style="background:{WHITE};padding:0 32px 28px">
      <h2 class="brand-text" style="margin:0 0 6px;font-size:20px;font-weight:bold;color:{BLUE};
                 font-family:Georgia,'Times New Roman',serif;border-bottom:3px solid {YELLOW};
                 padding-bottom:10px">{_entities(tour_h)}</h2>
      <p class="text-444" style="margin:0;font-size:15px;color:#444;line-height:1.7">{_entities(tour)}</p>{tour_button}
    </td>
  </tr>""" if INCLUDE_TOUR and tour else ""
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
  </tr>{tour_section}{news_section}"""

# =============================================================================
# FULL BILINGUAL HTML
# =============================================================================

def build_html(shows, ig_posts, header_url=None, news_img_url=None):
    fr_block = lang_section(shows, "fr", news_img_url)
    de_block = lang_section(shows, "de", news_img_url)
    if header_url:
        header_cell = f"""<td class="hdr-bg" bgcolor="{BLUE}" style="background:{BLUE};padding:0;line-height:0">
      <img src="{h(header_url)}"
           alt="LIBER — Ligue d'Improvisation de Berlin" width="560"
           style="width:100%;max-width:560px;height:auto;display:block;border:0"/>
    </td>"""
    else:
        header_cell = f"""<td class="hdr-bg" bgcolor="{BLUE}" style="background:{BLUE};padding:32px;text-align:center">
      <img src="https://liber-impro.com/images/logo.jpg"
           alt="LIBER — Ligue d'Improvisation de Berlin" width="200"
           style="width:200px;max-width:200px;height:200px;display:block;margin:0 auto;border-radius:50%"/>
    </td>"""
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
    {header_cell}
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
    print("[1/4] Fetching shows from YesTicket...")
    shows = fetch_shows()
    print(f"      -> {len(shows)} upcoming show(s)")

    print("[2/4] Reading Instagram posts...")
    ig_posts = fetch_instagram_posts() if INCLUDE_INSTAGRAM else []
    if not INCLUDE_INSTAGRAM:
        print("      -> Instagram section disabled (INCLUDE_INSTAGRAM = False)")

    print("[3/4] Building images...")
    header_url = None
    if INCLUDE_MEMBER_HEADER:
        members    = _pick_header_members()
        header_url = build_header_image(members)
        print(f"      -> header members: {', '.join(members)}")
    else:
        print("      -> member header disabled (INCLUDE_MEMBER_HEADER = False)")
    news_img_url = build_news_image() if INCLUDE_NEWS and NEWS_IMAGE else None
    if news_img_url:
        print(f"      -> news photo: {NEWS_IMAGE}")

    print("[4/4] Generating HTML...")
    today    = date.today().strftime("%Y-%m-%d")
    filename = os.path.join(OUTPUT_DIR, f"newsletter_{today}.html")
    with open(filename, "w", encoding="utf-8-sig") as f:
        f.write(build_html(shows, ig_posts, header_url, news_img_url))

    print(f"\nSaved: {filename}")
    for label, url in (("Header", header_url), ("News photo", news_img_url)):
        if not url:
            continue
        local = "images/newsletter/" + url.rsplit("/", 1)[1]
        if is_online(url):
            print(f"{label}: {local} (already online)")
        else:
            print(f"{label}: {local}")
            print("  !! NOT ONLINE YET - commit + push it to the website BEFORE sending,")
            print("     otherwise the image is missing (also in the browser preview).")
    print("Open in a browser to preview, then paste into Mailchimp.")
