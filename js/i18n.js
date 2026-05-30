/**
 * js/i18n.js — All French & German UI strings for LIBER
 * (Ligue d'Improvisation de Berlin)
 */
const I18N = {
  fr: {
    /* Nav */
    nav_home:'Accueil', nav_about:'À propos', nav_courses:'Ateliers',
    nav_shows:'Spectacles', nav_contact:'Contact', nav_login:'Connexion',
    /* Hero */
    hero_eyebrow:"Une ligue d'improvisation franco-allemande",
    hero_word1:'Bienvenue', hero_word2:'chez LIBER !',
    hero_desc:"Joueurs, arbitres et maîtres de cérémonie collaborent pour offrir des spectacles d'improvisation en français, en allemand, en gromelot et bien plus encore — au service de l'imagination, de l'échange et du plaisir.",
    hero_btn_shows:'🎟️ Voir les spectacles', hero_btn_courses:'📚 Nos ateliers',
    next_show_label:'Prochain spectacle', tickets_btn:"Plus d'infos",
    reg_open_label:'Inscriptions ouvertes !',
    reg_open_title:"Ateliers d'improvisation — Saison en cours",
    reg_open_sub:'Cours en français, allemand et gromelot · Tous niveaux',
    reg_btn:"S'inscrire maintenant",
    /* Generic announcement banner (homepage, below next-show) */
    challenge_label:'🎬 48hLIBERfilm',
    challenge_title:'Rejoins nous dans notre challenge de 48hLIBERfilm',
    challenge_text:"Réalisez un film en 48 heures ! Écrivez, tournez, montez et soumettez-le ! Formez votre équipe et inscrivez-vous dès maintenant ! La participation est ouverte à tous. Inscription jusqu'au 19 juillet 2026.",
    challenge_btn:"S'inscrire",
    /* Stats */
    stat_num_years:'15+', stat_num_shows:'150+', stat_num_members:'100+',
    stat_years:"Années d'existence", stat_shows:'Matchs joués', stat_members:'Joueur·euses formé·es',
    /* Home extra text fields */
    home_extra1:'🎭 Retrouvez-nous au théâtre ACUD chaque 3ᵉ dimanche du mois !',
    home_extra2:"🎬 LIBER a fait l'objet d'un reportage sur ARTE.",
    home_extra3:'🌍 Échanges réguliers avec des troupes en France, en Suisse, au Québec et au-delà.',
    /* About */
    about_pill:'Notre ligue', about_title:'Qui sommes-nous ?',
    about_body:"LIBER (Ligue d'Improvisation de Berlin) est une troupe franco-allemande fondée en 2010 par Marjorie Nadal et Denis Aubert. Depuis bientôt quinze ans, nous pratiquons le théâtre d'improvisation à Berlin — en français, en allemand et au-delà des langues.\n\nNous organisons des matchs d'improvisation publics, des ateliers pour tous niveaux, et nous tournons régulièrement à l'international. Plus de cent joueur·euses ont été formé·es aux bases de l'improvisation à travers nos cours.\n\nL'improvisation, pour nous, c'est avant tout une rencontre interculturelle : écouter, accepter, construire ensemble — l'imagination, l'échange et le plaisir au pouvoir !",
    about_cta:'Nous rejoindre 🤸',
    members_title:'Notre équipe', members_subtitle:"Joueur·euses, arbitres et MCs venu·es de France, d'Allemagne et d'ailleurs.",
    visibility_label:'Visible sur le site',
    /* Courses */
    courses_pill:'Ateliers', courses_title:'Nos ateliers',
    courses_subtitle:"Que vous découvriez l'improvisation ou que vous souhaitiez approfondir votre pratique, nos ateliers vous offrent un espace bienveillant pour explorer, rire et grandir — en français et en allemand.",
    reg_section_title:'📋 Inscriptions ouvertes !',
    reg_section_desc:'Remplissez le formulaire ci-dessous pour réserver votre place, ou écrivez-nous à liber.impro@gmail.com.',
    form_placeholder:'Intégrez votre Google Form ici.',
    reg_closed_title:'Inscriptions fermées',
    reg_closed_desc:'Les inscriptions pour la prochaine session ouvriront bientôt. Inscrivez-vous à notre newsletter pour être averti·e !',
    reg_notify_btn:"M'alerter à l'ouverture",
    /* Shows */
    shows_pill:'Scène', shows_title:'Nos spectacles',
    shows_subtitle:"Matchs d'improvisation franco-allemands au théâtre ACUD, chaque 3ᵉ dimanche du mois. Et plus encore en tournée !",
    calendar_title:'Calendrier des spectacles',
    upcoming_title:'À venir', videos_title:'Revivez nos moments', gallery_title:'Galerie photos',
    no_shows:'Aucun spectacle à venir.',
    /* Contact */
    contact_pill:'Contact', contact_title:'Parlons impro !',
    contact_desc:"Une question, l'envie de jouer avec nous ou simplement envie de discuter ? On adore entendre de nouvelles voix !",
    contact_address:'Adresse', contact_email:'Email', contact_phone:'Presse',
    form_title:'Écrivez-nous',
    contact_write_intro:'Pour toute question, suggestion ou collaboration, écrivez-nous directement :',
    contact_press_intro:'Pour la presse :',
    /* Newsletter */
    newsletter_title:'Newsletter',
    newsletter_desc:'Recevez chaque mois nos spectacles à venir, les prochains ateliers et les actualités de LIBER directement dans votre boîte mail.',
    newsletter_placeholder:'votre@email.com',
    newsletter_btn:"S'abonner",
    newsletter_success:'🎉 Merci ! Vous êtes abonné·e à notre newsletter.',
    newsletter_error:'❌ Adresse e-mail invalide.',
    /* Footer */
    footer_tagline:"L'imagination, l'échange et le plaisir au pouvoir.",
    footer_imprint:'Mentions légales', footer_privacy:'Politique de confidentialité',
    /* Auth (admin only) */
    login_title:'Connexion administrateur',
    login_email:'Email', login_password:'Mot de passe', login_btn:'Se connecter',
    demo_hint:"Réservé à l'équipe d'administration LIBER.",
    /* Admin sidebar */
    admin_shows_menu:'Spectacles',
    admin_members_menu:'Membres', admin_courses_menu:'Ateliers', admin_logout:'Déconnexion',
    admin_shows_h:'Gestion des spectacles', admin_members_h:'Gestion des membres',
    admin_courses_h:'Gestion des ateliers',
    admin_reg_status:'Statut des inscriptions',
    /* ─────────────────────────────────────────────────────────
       Legal pages — drafted to meet § 5 TMG (Impressum) and the
       GDPR / DSGVO (Datenschutzerklärung) for an entity based
       in Berlin. Placeholders in brackets [ ] should be edited
       in the admin dashboard with LIBER's official details.
       ───────────────────────────────────────────────────────── */
    imprint_title:'Mentions légales (Impressum)',
    imprint_body:`<h2>Mentions légales selon § 5 TMG</h2>

<h3>Éditeur du site</h3>
<p><strong>LIBER — Ligue d'Improvisation de Berlin</strong><br>
[Forme juridique : à compléter, p.ex. e.V.]<br>
ACUD Theater<br>
Veteranenstraße 21<br>
10119 Berlin, Allemagne</p>

<h3>Représentation</h3>
<p>Cofondateur·rices : Marjorie Nadal, Denis Aubert</p>

<h3>Contact</h3>
<p>Email : <a href="mailto:liber.impro@gmail.com">liber.impro@gmail.com</a><br>
Presse : <a href="mailto:polecommunication.liber.impro@gmail.com">polecommunication.liber.impro@gmail.com</a></p>

<h3>Registre</h3>
<p>Vereinsregister : [Numéro et tribunal d'enregistrement à compléter]<br>
Numéro d'identification fiscale (Steuernummer) : [à compléter si applicable]</p>

<h3>Responsable du contenu selon § 18 al. 2 MStV</h3>
<p>Marjorie Nadal &amp; Denis Aubert, adresse ci-dessus.</p>

<h3>Résolution des litiges en ligne</h3>
<p>La Commission européenne met à disposition une plateforme de règlement extrajudiciaire des litiges (ODR) : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a>. Nous ne sommes ni obligés ni disposés à participer à une procédure de règlement des litiges devant un organe de conciliation.</p>

<h3>Limitation de responsabilité</h3>
<p><strong>Contenu du site :</strong> Le contenu de ce site a été rédigé avec le plus grand soin. Nous ne pouvons toutefois garantir l'exactitude, l'exhaustivité ou l'actualité de tous les contenus.</p>
<p><strong>Liens externes :</strong> Notre site contient des liens vers des sites tiers sur le contenu desquels nous n'avons aucune influence. Nous ne pouvons donc assumer aucune responsabilité pour ces contenus externes.</p>
<p><strong>Droit d'auteur :</strong> Les contenus et œuvres créés par les opérateurs du site sur ces pages sont soumis au droit d'auteur allemand. Toute reproduction, modification, diffusion ou utilisation hors des limites du droit d'auteur nécessite l'accord écrit préalable des auteur·rices respectif·ves.</p>`,
    privacy_title:'Politique de confidentialité',
    privacy_body:`<h2>Politique de confidentialité (RGPD / DSGVO)</h2>

<h3>1. Responsable du traitement</h3>
<p><strong>LIBER — Ligue d'Improvisation de Berlin</strong><br>
ACUD Theater, Veteranenstraße 21, 10119 Berlin, Allemagne<br>
Email : <a href="mailto:liber.impro@gmail.com">liber.impro@gmail.com</a></p>

<h3>2. Données collectées et finalités</h3>
<p>Nous traitons uniquement les données que vous nous transmettez activement :</p>
<ul>
  <li><strong>Formulaire de contact :</strong> nom, email, sujet, message — utilisés pour répondre à votre demande (base légale : art. 6 §1 f RGPD, intérêt légitime à communiquer).</li>
  <li><strong>Newsletter :</strong> votre adresse email — utilisée pour vous envoyer nos actualités (base légale : art. 6 §1 a RGPD, consentement, retirable à tout moment via le lien de désinscription).</li>
  <li><strong>Inscription aux ateliers :</strong> nom, email et informations transmises via notre formulaire d'inscription — utilisés pour gérer votre participation (base légale : art. 6 §1 b RGPD, exécution d'un contrat ou de mesures pré-contractuelles).</li>
</ul>

<h3>3. Sous-traitants et hébergement</h3>
<p>Notre site et notre base de données sont hébergés par <strong>Supabase</strong> (datacenters européens, Francfort) en tant que sous-traitant au sens de l'art. 28 RGPD. Aucun transfert de données hors UE n'est effectué dans le cadre normal du service.</p>

<h3>4. Cookies et stockage local</h3>
<p>Ce site n'utilise pas de cookies de suivi ni d'analyse. Le seul stockage local utilisé est :</p>
<ul>
  <li>un jeton de session pour les comptes administrateur (strictement nécessaire, art. 6 §1 f RGPD).</li>
</ul>

<h3>5. Durée de conservation</h3>
<p>Les messages reçus via le formulaire de contact sont conservés tant qu'ils sont nécessaires au traitement de votre demande, puis supprimés. Les abonnements à la newsletter sont conservés jusqu'à votre désinscription. Les inscriptions aux ateliers sont conservées pour la durée de la saison concernée.</p>

<h3>6. Vos droits</h3>
<p>Vous disposez à tout moment des droits suivants sur vos données :</p>
<ul>
  <li>Droit d'accès (art. 15 RGPD)</li>
  <li>Droit de rectification (art. 16 RGPD)</li>
  <li>Droit à l'effacement (art. 17 RGPD)</li>
  <li>Droit à la limitation du traitement (art. 18 RGPD)</li>
  <li>Droit à la portabilité (art. 20 RGPD)</li>
  <li>Droit d'opposition (art. 21 RGPD)</li>
  <li>Droit de retirer votre consentement à tout moment (art. 7 §3 RGPD)</li>
</ul>
<p>Pour exercer ces droits, écrivez-nous à <a href="mailto:liber.impro@gmail.com">liber.impro@gmail.com</a>.</p>

<h3>7. Droit de réclamation</h3>
<p>Vous avez le droit de déposer une réclamation auprès d'une autorité de contrôle, notamment l'autorité berlinoise pour la protection des données :<br>
<strong>Berliner Beauftragte für Datenschutz und Informationsfreiheit</strong><br>
Friedrichstr. 219, 10969 Berlin — <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener">datenschutz-berlin.de</a></p>`,
    /* Calendar */
    month_names:['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    day_names:['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],
  },

  de: {
    /* Nav */
    nav_home:'Startseite', nav_about:'Über uns', nav_courses:'Workshops',
    nav_shows:'Aufführungen', nav_contact:'Kontakt', nav_login:'Anmelden',
    /* Hero */
    hero_eyebrow:'Deutsch-französische Improvisationsliga in Berlin',
    hero_word1:'Willkommen', hero_word2:'bei LIBER!',
    hero_desc:'Spieler·innen, Schiedsrichter·innen und Moderator·innen arbeiten zusammen für Improvisationsaufführungen auf Deutsch, Französisch, in Grommelo und vielem mehr — für Vorstellungskraft, Austausch und das Vergnügen!',
    hero_btn_shows:'🎟️ Aufführungen ansehen', hero_btn_courses:'📚 Unsere Workshops',
    next_show_label:'Nächste Aufführung', tickets_btn:'Mehr Infos',
    reg_open_label:'Anmeldungen offen!',
    reg_open_title:'Improvisations-Workshops — laufende Saison',
    reg_open_sub:'Kurse auf Französisch, Deutsch und Grommelo · Alle Niveaus',
    reg_btn:'Jetzt anmelden',
    /* Generisches Ankündigungs-Banner (Startseite, unter „Nächste Aufführung") */
    challenge_label:'🎬 48hLIBERfilm',
    challenge_title:'Sei dabei bei unserem 48hLIBERfilm-Wettbewerb',
    challenge_text:'Mache einen Film in 48 Stunden! Schreibe, drehe, schneide und reiche ihn ein! Stelle dein Team zusammen und registriere dich jetzt! Die Teilnahme ist für alle offen. Anmeldung bis zum 19. Juli 2026.',
    challenge_btn:'Jetzt anmelden',
    /* Stats */
    stat_num_years:'15+', stat_num_shows:'150+', stat_num_members:'100+',
    stat_years:'Jahre auf der Bühne', stat_shows:'Aufführungen', stat_members:'ausgebildete Spieler·innen',
    /* Home extra */
    home_extra1:'🎭 Jeden 3. Sonntag im Monat im ACUD Theater in Berlin!',
    home_extra2:'🎬 ARTE hat über LIBER einen Beitrag produziert.',
    home_extra3:'🌍 Regelmäßiger Austausch mit Truppen aus Frankreich, der Schweiz, Québec und darüber hinaus.',
    /* About */
    about_pill:'Unsere Liga', about_title:'Wer sind wir?',
    about_body:"LIBER (Ligue d'Improvisation de Berlin) ist eine deutsch-französische Improvisationsgruppe, die 2010 von Marjorie Nadal und Denis Aubert gegründet wurde. Seit fast fünfzehn Jahren spielen wir Impro-Theater in Berlin — auf Französisch, Deutsch und jenseits der Sprachen.\n\nWir organisieren öffentliche Impro-Matches, Workshops für alle Niveaus und touren regelmäßig international. Über hundert Spieler·innen haben in unseren Kursen die Grundlagen der Improvisation gelernt.\n\nImprovisation bedeutet für uns vor allem eine interkulturelle Begegnung: zuhören, akzeptieren, gemeinsam aufbauen — Vorstellungskraft, Austausch und das Vergnügen an der Macht!",
    about_cta:'Mitmachen 🤸',
    members_title:'Unser Team', members_subtitle:'Spieler·innen, Schiedsrichter·innen und Moderator·innen aus Frankreich, Deutschland und der ganzen Welt.',
    visibility_label:'Auf der Website sichtbar',
    /* Courses */
    courses_pill:'Workshops', courses_title:'Unsere Workshops',
    courses_subtitle:'Egal ob du Improvisation entdeckst oder deine Praxis vertiefen möchtest — unsere Workshops bieten dir einen sicheren Raum zum Erkunden, Lachen und Wachsen, auf Deutsch und Französisch.',
    reg_section_title:'📋 Anmeldungen offen!',
    reg_section_desc:'Fülle das Formular aus, um deinen Platz zu reservieren, oder schreib uns an liber.impro@gmail.com.',
    form_placeholder:'Bette dein Google-Formular hier ein.',
    reg_closed_title:'Anmeldungen geschlossen',
    reg_closed_desc:'Die Anmeldungen für die nächste Runde öffnen bald. Meld dich für unseren Newsletter an!',
    reg_notify_btn:'Mich benachrichtigen',
    /* Shows */
    shows_pill:'Bühne', shows_title:'Unsere Aufführungen',
    shows_subtitle:'Deutsch-französische Impro-Matches im ACUD Theater — jeden 3. Sonntag im Monat. Und vieles mehr auf Tournee!',
    calendar_title:'Aufführungskalender',
    upcoming_title:'Demnächst', videos_title:'Unsere Momente erleben', gallery_title:'Fotogalerie',
    no_shows:'Keine bevorstehenden Aufführungen.',
    /* Contact */
    contact_pill:'Kontakt', contact_title:'Lass uns reden!',
    contact_desc:'Eine Frage, Lust mitzuspielen oder einfach plaudern? Wir freuen uns immer über neue Stimmen!',
    contact_address:'Adresse', contact_email:'E-Mail', contact_phone:'Presse',
    form_title:'Schreib uns',
    contact_write_intro:'Bei Fragen, Anregungen oder Kooperationsanfragen schreiben Sie uns direkt:',
    contact_press_intro:'Für Presseanfragen:',
    /* Newsletter */
    newsletter_title:'Newsletter',
    newsletter_desc:'Erhalte jeden Monat unsere kommenden Aufführungen, Workshops und LIBER-Neuigkeiten direkt in dein Postfach.',
    newsletter_placeholder:'ihre@email.com',
    newsletter_btn:'Abonnieren',
    newsletter_success:'🎉 Danke! Sie haben unseren Newsletter abonniert.',
    newsletter_error:'❌ Ungültige E-Mail-Adresse.',
    /* Footer */
    footer_tagline:'Vorstellungskraft, Austausch und Vergnügen an der Macht.',
    footer_imprint:'Impressum', footer_privacy:'Datenschutzerklärung',
    /* Auth (admin only) */
    login_title:'Administrator-Anmeldung',
    login_email:'E-Mail', login_password:'Passwort', login_btn:'Einloggen',
    demo_hint:'Nur für das LIBER-Verwaltungsteam.',
    /* Admin sidebar */
    admin_shows_menu:'Aufführungen',
    admin_members_menu:'Mitglieder', admin_courses_menu:'Workshops', admin_logout:'Abmelden',
    admin_shows_h:'Aufführungsverwaltung', admin_members_h:'Mitgliederverwaltung',
    admin_courses_h:'Workshop-Verwaltung',
    admin_reg_status:'Anmeldestatus',
    /* ─────────────────────────────────────────────────────────
       Rechtliche Seiten — § 5 TMG (Impressum) und DSGVO.
       Platzhalter in [ ] über das Admin-Dashboard ausfüllen.
       ───────────────────────────────────────────────────────── */
    imprint_title:'Impressum',
    imprint_body:`<h2>Impressum gemäß § 5 TMG</h2>

<h3>Anbieter</h3>
<p><strong>LIBER — Ligue d'Improvisation de Berlin</strong><br>
[Rechtsform: bitte ergänzen, z. B. e.V.]<br>
ACUD Theater<br>
Veteranenstraße 21<br>
10119 Berlin, Deutschland</p>

<h3>Vertreten durch</h3>
<p>Mitgründer·innen: Marjorie Nadal, Denis Aubert</p>

<h3>Kontakt</h3>
<p>E-Mail: <a href="mailto:liber.impro@gmail.com">liber.impro@gmail.com</a><br>
Presse: <a href="mailto:polecommunication.liber.impro@gmail.com">polecommunication.liber.impro@gmail.com</a></p>

<h3>Registereintrag</h3>
<p>Vereinsregister: [Nummer und Registergericht ergänzen]<br>
Umsatzsteuer-ID/Steuernummer: [ggf. ergänzen]</p>

<h3>Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV</h3>
<p>Marjorie Nadal &amp; Denis Aubert, Anschrift wie oben.</p>

<h3>Streitschlichtung</h3>
<p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a>. Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

<h3>Haftungsausschluss</h3>
<p><strong>Inhalte:</strong> Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
<p><strong>Externe Links:</strong> Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.</p>
<p><strong>Urheberrecht:</strong> Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung jeder Art bedürfen der schriftlichen Zustimmung der jeweiligen Autor·innen.</p>`,
    privacy_title:'Datenschutzerklärung',
    privacy_body:`<h2>Datenschutzerklärung (DSGVO)</h2>

<h3>1. Verantwortlicher</h3>
<p><strong>LIBER — Ligue d'Improvisation de Berlin</strong><br>
ACUD Theater, Veteranenstraße 21, 10119 Berlin, Deutschland<br>
E-Mail: <a href="mailto:liber.impro@gmail.com">liber.impro@gmail.com</a></p>

<h3>2. Erhobene Daten und Zwecke</h3>
<p>Wir verarbeiten ausschließlich Daten, die Sie uns aktiv übermitteln:</p>
<ul>
  <li><strong>Kontaktformular:</strong> Name, E-Mail, Betreff, Nachricht — zur Bearbeitung Ihrer Anfrage (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse an Kommunikation).</li>
  <li><strong>Newsletter:</strong> Ihre E-Mail-Adresse — zum Versand unserer Neuigkeiten (Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO, Einwilligung, jederzeit widerruflich über den Abmeldelink).</li>
  <li><strong>Workshop-Anmeldung:</strong> Name, E-Mail und im Formular angegebene Informationen — zur Verwaltung Ihrer Teilnahme (Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO, Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen).</li>
</ul>

<h3>3. Auftragsverarbeiter und Hosting</h3>
<p>Unsere Website und Datenbank werden bei <strong>Supabase</strong> (EU-Rechenzentren, Frankfurt) als Auftragsverarbeiter im Sinne des Art. 28 DSGVO gehostet. Im normalen Betrieb findet keine Datenübermittlung außerhalb der EU statt.</p>

<h3>4. Cookies und lokaler Speicher</h3>
<p>Diese Website verwendet keine Tracking- oder Analyse-Cookies. Lediglich folgender lokaler Speicher wird genutzt:</p>
<ul>
  <li>ein Sitzungs-Token für Administrator-Konten (zwingend erforderlich, Art. 6 Abs. 1 lit. f DSGVO).</li>
</ul>

<h3>5. Speicherdauer</h3>
<p>Über das Kontaktformular eingegangene Nachrichten werden so lange aufbewahrt, wie es zur Bearbeitung erforderlich ist, und anschließend gelöscht. Newsletter-Abonnements bleiben bis zur Abmeldung gespeichert. Workshop-Anmeldungen werden für die Dauer der jeweiligen Saison aufbewahrt.</p>

<h3>6. Ihre Rechte</h3>
<p>Sie haben jederzeit folgende Rechte bezüglich Ihrer Daten:</p>
<ul>
  <li>Auskunftsrecht (Art. 15 DSGVO)</li>
  <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
  <li>Recht auf Löschung (Art. 17 DSGVO)</li>
  <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
  <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
  <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
  <li>Recht auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
</ul>
<p>Zur Ausübung dieser Rechte schreiben Sie uns an <a href="mailto:liber.impro@gmail.com">liber.impro@gmail.com</a>.</p>

<h3>7. Beschwerderecht</h3>
<p>Sie haben das Recht, Beschwerde bei einer Aufsichtsbehörde einzulegen, insbesondere bei der zuständigen Berliner Behörde:<br>
<strong>Berliner Beauftragte für Datenschutz und Informationsfreiheit</strong><br>
Friedrichstr. 219, 10969 Berlin — <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener">datenschutz-berlin.de</a></p>`,
    /* Calendar */
    month_names:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    day_names:['Mo','Di','Mi','Do','Fr','Sa','So'],
  }
};
