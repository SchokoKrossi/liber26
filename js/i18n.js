/**
 * js/i18n.js — All French & German UI strings for LIBER
 * (Ligue d'Improvisation de Berlin)
 */
const I18N = {
  fr: {
    /* Nav */
    // Page-level metadata (also picked up by SEO crawlers via DOM)
    site_title:'LIBER — Ligue d\'Improvisation de Berlin',
    site_description:"Spectacles et ateliers d'improvisation franco-allemands au théâtre ACUD à Berlin.",
    /* Nav */
    nav_home:'Accueil', nav_about:'À propos', nav_courses:'Ateliers',
    nav_shows:'Spectacles & billets', nav_contact:'Contact', nav_login:'Connexion',
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
    /* Gift voucher banner (homepage + shows page) */
    voucher_label:'🎁 Bons cadeaux',
    voucher_title:'🎭 Des bons cadeaux pour notre spectacle d’impro ! 🎁',
    voucher_text:"Tu cherches une idée cadeau qui garantit des rires, des surprises et des moments inoubliables ?\nAlors offre un bon pour l’un de nos spectacles d’improvisation !\nQue ce soit pour un anniversaire, une petite attention ou juste pour faire plaisir – avec un bon cadeau pour notre show, tu fais toujours le bon choix.",
    voucher_btn:'👉 Disponibles dès maintenant',
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
    contact_address:'Adresse', contact_email:'Email',
    follow_us:'📱 Suivez-nous',
    form_title:'Écrivez-nous',
    contact_write_intro:'Pour toute question, suggestion ou collaboration, écrivez-nous directement :',
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
    back_btn:'← Retour',
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
<p><strong>THEALINGUA</strong><br>
c/o Cours et Jardins gUG<br>
Skalitzer Str. 27<br>
10999 Berlin, Allemagne</p>
<p>LIBER (Ligue d'Improvisation de Berlin) est une activité de Thealingua / Cours et Jardins gUG.</p>

<h3>Gérance (Geschäftsführer)</h3>
<p>Damien Poinsard<br>
Marjorie Nadal</p>

<h3>Contact</h3>
<p>Email : <a href="mailto:info@liber-impro.com">info@liber-impro.com</a></p>

<h3>Inscription au registre</h3>
<p>Tribunal d'enregistrement : Amtsgericht Charlottenburg, section B<br>
Numéro de registre : <strong>HRB 162571 B</strong></p>

<h3>Responsable du contenu selon § 18 al. 2 MStV (ex-§ 55 Abs. 2 RStV)</h3>
<p>Damien Poinsard et Marjorie Nadal<br>
THEALINGUA, c/o Cours et Jardins gUG<br>
Skalitzer Str. 27, 10999 Berlin, Allemagne</p>

<h3>Résolution des litiges en ligne</h3>
<p>La Commission européenne met à disposition une plateforme de règlement extrajudiciaire des litiges (ODR) : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a>. Nous ne sommes ni obligés ni disposés à participer à une procédure de règlement des litiges devant un organe de conciliation des consommateurs.</p>

<h3>Limitation de responsabilité</h3>
<p><strong>Contenu du site :</strong> Le contenu de ce site a été rédigé avec le plus grand soin. Nous ne pouvons toutefois garantir l'exactitude, l'exhaustivité ou l'actualité de tous les contenus. En tant que prestataire de services, nous sommes responsables, conformément au § 7 al. 1 TMG, de nos propres contenus sur ces pages selon les lois générales. Selon les §§ 8 à 10 TMG, nous ne sommes toutefois pas tenus de surveiller les informations transmises ou stockées par des tiers, ni de rechercher des circonstances indiquant des activités illégales.</p>
<p><strong>Liens externes :</strong> Notre site contient des liens vers des sites tiers sur le contenu desquels nous n'avons aucune influence. La responsabilité du contenu de ces liens incombe toujours à leurs éditeurs respectifs. Les sites liés ont été vérifiés pour détecter d'éventuelles infractions au moment de leur intégration ; aucun contenu illicite n'a alors été constaté. Un contrôle permanent du contenu des pages liées n'est cependant pas raisonnablement exigible sans indices concrets d'une infraction.</p>
<p><strong>Droit d'auteur :</strong> Les contenus et œuvres créés par les opérateurs du site sur ces pages sont soumis au droit d'auteur allemand. Toute reproduction, modification, diffusion ou utilisation hors des limites du droit d'auteur nécessite l'accord écrit préalable des auteur·rices respectif·ves.</p>`,
    privacy_title:'Politique de confidentialité',
    privacy_body:`<h2>Politique de confidentialité (RGPD / DSGVO)</h2>

<h3>1. Responsable du traitement</h3>
<p><strong>THEALINGUA</strong><br>
c/o Cours et Jardins gUG<br>
Skalitzer Str. 27, 10999 Berlin, Allemagne<br>
Gérance : Damien Poinsard, Marjorie Nadal<br>
Inscrit au registre du commerce sous HRB 162571 B (Amtsgericht Charlottenburg)<br>
Email : <a href="mailto:info@liber-impro.com">info@liber-impro.com</a></p>
<p>Aucun délégué à la protection des données (DPO) n'a été nommé : Cours et Jardins gUG ne remplit pas les critères de l'art. 37 RGPD ni du § 38 BDSG (moins de 20 personnes traitant des données, pas de traitement à grande échelle de données sensibles).</p>

<h3>2. Hébergement du site</h3>
<p>Le site est hébergé sur <strong>GitHub Pages</strong> (GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis). GitHub stocke automatiquement, à chaque visite, un fichier journal contenant l'adresse IP, la date/heure, l'URL appelée, l'agent utilisateur et la réponse HTTP, à des fins de sécurité et de prévention des abus. Le transfert vers les États-Unis s'appuie sur les Clauses Contractuelles Types de la Commission européenne et sur la certification de GitHub au Data Privacy Framework UE-USA. Politique de GitHub : <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">github.com/site-policy</a>.</p>

<h3>3. Données collectées sur le site et finalités</h3>
<p>Nous ne collectons que les données que vous nous transmettez activement :</p>
<ul>
  <li><strong>Newsletter :</strong> votre adresse email et la langue choisie — utilisées pour vous envoyer nos actualités (base légale : art. 6 §1 a RGPD, consentement, retirable à tout moment en nous écrivant).</li>
  <li><strong>Inscription aux ateliers :</strong> les données saisies dans le formulaire d'inscription Google Forms (voir section 4) — utilisées pour gérer votre participation (base légale : art. 6 §1 b RGPD, mesures pré-contractuelles).</li>
  <li><strong>Compte administrateur :</strong> email + mot de passe haché — uniquement pour les membres du Vorstand qui gèrent le site (base légale : art. 6 §1 f RGPD, intérêt légitime à sécuriser l'accès au backend).</li>
</ul>
<p>Le site ne contient <strong>aucun formulaire de contact</strong> : vous nous écrivez directement à <a href="mailto:liber.impro@gmail.com">liber.impro@gmail.com</a>. Le traitement de cet email est régi par la politique de votre fournisseur de messagerie et par celle de Google (Gmail).</p>

<h3>4. Sous-traitants et destinataires</h3>
<ul>
  <li><strong>Supabase</strong> (Supabase Inc., hébergement en UE — Francfort, Allemagne) : base de données, authentification administrateur et stockage des images. Sous-traitant au sens de l'art. 28 RGPD. Politique : <a href="https://supabase.com/privacy" target="_blank" rel="noopener">supabase.com/privacy</a>.</li>
  <li><strong>YesTicket</strong> (yesticket.org) : nos billets de spectacles sont vendus via YesTicket. En cliquant sur « Plus d'infos » depuis la page Spectacles, vous quittez notre site et la politique de YesTicket s'applique.</li>
  <li><strong>Google Forms / Google LLC</strong> (États-Unis) : lorsque vous cliquez sur le bouton du bandeau « Bannière » ou « Atelier » et qu'il pointe vers un Google Form, vous quittez notre site et entrez sur les services de Google. Politique : <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.</li>
  <li><strong>Gmail / Google LLC</strong> : nos adresses email <code>liber.impro@gmail.com</code> et <code>polecommunication.liber.impro@gmail.com</code> sont hébergées chez Google. Tout courriel que vous nous envoyez transite donc par les serveurs de Google.</li>
</ul>

<h3>5. Polices d'écriture et CDN externes</h3>
<p>Les polices d'écriture (Bangers, Fredoka, Nunito) sont <strong>hébergées localement</strong> sur le serveur du site. Aucune requête n'est faite vers Google Fonts et aucune adresse IP n'est transmise à Google pour le chargement des polices.</p>
<p>La bibliothèque cliente Supabase est chargée depuis le CDN <strong>jsDelivr</strong> (StackPath). Aucune donnée personnelle n'est transmise lors de ce chargement, hormis l'adresse IP technique nécessaire à toute requête HTTP.</p>

<h3>6. Cookies et stockage local</h3>
<p>Ce site n'utilise ni cookies de suivi ni outils d'analyse (pas de Google Analytics, Matomo, Plausible, etc.). Le stockage local du navigateur est utilisé uniquement pour :</p>
<ul>
  <li>mémoriser la langue choisie (FR / DE) — strictement nécessaire ;</li>
  <li>maintenir la session d'un administrateur connecté — strictement nécessaire.</li>
</ul>
<p>Aucun consentement n'est requis pour ces usages au titre du § 25 al. 2 TTDSG.</p>

<h3>7. Durée de conservation</h3>
<p>Les abonnements à la newsletter sont conservés jusqu'à votre désinscription. Les inscriptions aux ateliers sont conservées pour la durée de la saison concernée, puis archivées ou supprimées. Les comptes administrateur sont conservés tant que la personne est habilitée par le Vorstand.</p>

<h3>8. Vos droits</h3>
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
<p>Pour exercer ces droits, écrivez au responsable du traitement : <a href="mailto:info@liber-impro.com">info@liber-impro.com</a>.</p>

<h3>9. Droit de réclamation auprès d'une autorité de contrôle</h3>
<p>Vous avez le droit de déposer une réclamation auprès de l'autorité berlinoise compétente :<br>
<strong>Berliner Beauftragte für Datenschutz und Informationsfreiheit</strong><br>
Friedrichstr. 219, 10969 Berlin<br>
Tél. +49 30 13 889-0 — <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener">datenschutz-berlin.de</a></p>

<h3>10. Modifications</h3>
<p>Nous nous réservons le droit d'adapter cette politique pour qu'elle reste conforme à l'évolution de la réglementation. Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}.</p>`,
    /* Calendar */
    month_names:['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    day_names:['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],
  },

  de: {
    /* Nav */
    // Page-level metadata (also picked up by SEO crawlers via DOM)
    site_title:'LIBER — Deutsch-französische Improvisationsliga in Berlin',
    site_description:'Improvisations-Aufführungen und -Workshops auf Deutsch und Französisch im ACUD Theater in Berlin.',
    /* Nav */
    nav_home:'Startseite', nav_about:'Über uns', nav_courses:'Workshops',
    nav_shows:'Spielplan & Tickets', nav_contact:'Kontakt', nav_login:'Anmelden',
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
    /* Gutschein-Banner (Startseite + Aufführungs-Seite) */
    voucher_label:'🎁 Gutscheine',
    voucher_title:'🎭 Impro-Gutscheine! 🎁',
    voucher_text:'Du suchst ein Geschenk, das garantiert für Lacher, Überraschungen und unvergessliche Momente sorgt?\nDann schnapp dir jetzt einen Gutschein für unsere Impro-Show! Ob als Geburtstagsgeschenk, kleine Aufmerksamkeit oder spontane Freude – mit einem Gutschein für unsere Auftritte liegst du immer richtig.',
    voucher_btn:'👉 Jetzt erhältlich',
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
    contact_address:'Adresse', contact_email:'E-Mail',
    follow_us:'📱 Folge uns',
    form_title:'Schreib uns',
    contact_write_intro:'Bei Fragen, Anregungen oder Kooperationsanfragen schreiben Sie uns direkt:',
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
    back_btn:'← Zurück',
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
    imprint_body:`<h2>Angaben gemäß § 5 TMG</h2>

<h3>Anbieter</h3>
<p><strong>THEALINGUA</strong><br>
c/o Cours et Jardins gUG<br>
Skalitzer Str. 27<br>
10999 Berlin, Deutschland</p>
<p>LIBER (Ligue d'Improvisation de Berlin) ist eine Aktivität von Thealingua / Cours et Jardins gUG.</p>

<h3>Geschäftsführer</h3>
<p>Damien Poinsard<br>
Marjorie Nadal</p>

<h3>Kontakt</h3>
<p>E-Mail: <a href="mailto:info@liber-impro.com">info@liber-impro.com</a></p>

<h3>Registereintrag</h3>
<p>Eintragung im Registergericht: Amtsgericht Charlottenburg, Abteilung B<br>
Registernummer: <strong>HRB 162571 B</strong></p>

<h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV (vormals § 55 Abs. 2 RStV)</h3>
<p>Damien Poinsard und Marjorie Nadal<br>
THEALINGUA, c/o Cours et Jardins gUG<br>
Skalitzer Str. 27, 10999 Berlin, Deutschland</p>

<h3>Online-Streitbeilegung</h3>
<p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a>. Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

<h3>Haftungsausschluss</h3>
<p><strong>Inhalte:</strong> Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
<p><strong>Externe Links:</strong> Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren nicht erkennbar. Eine permanente inhaltliche Kontrolle ohne konkrete Anhaltspunkte einer Rechtsverletzung ist nicht zumutbar.</p>
<p><strong>Urheberrecht:</strong> Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung der jeweiligen Autor·innen.</p>`,
    privacy_title:'Datenschutzerklärung',
    privacy_body:`<h2>Datenschutzerklärung (DSGVO)</h2>

<h3>1. Verantwortlicher</h3>
<p><strong>THEALINGUA</strong><br>
c/o Cours et Jardins gUG<br>
Skalitzer Str. 27, 10999 Berlin, Deutschland<br>
Geschäftsführer: Damien Poinsard, Marjorie Nadal<br>
Handelsregister: HRB 162571 B (Amtsgericht Charlottenburg)<br>
E-Mail: <a href="mailto:info@liber-impro.com">info@liber-impro.com</a></p>
<p>Es wurde kein Datenschutzbeauftragter bestellt: Cours et Jardins gUG erfüllt weder die Schwellen des Art. 37 DSGVO noch die des § 38 BDSG (weniger als 20 mit der Datenverarbeitung beschäftigte Personen, keine umfangreiche Verarbeitung besonderer Datenkategorien).</p>

<h3>2. Hosting der Website</h3>
<p>Die Website wird bei <strong>GitHub Pages</strong> (GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA) gehostet. GitHub speichert bei jedem Aufruf automatisch ein Server-Logfile mit IP-Adresse, Datum/Uhrzeit, aufgerufener URL, User-Agent und HTTP-Status, um Sicherheit zu gewährleisten und Missbrauch zu verhindern. Der Transfer in die USA stützt sich auf die Standardvertragsklauseln der EU-Kommission sowie auf die Zertifizierung von GitHub unter dem EU-USA Data Privacy Framework. Datenschutzhinweise von GitHub: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">github.com/site-policy</a>.</p>

<h3>3. Auf der Website erhobene Daten und Zwecke</h3>
<p>Wir erheben nur Daten, die Sie uns aktiv übermitteln:</p>
<ul>
  <li><strong>Newsletter:</strong> Ihre E-Mail-Adresse und die gewählte Sprache — zum Versand unserer Neuigkeiten (Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO, Einwilligung, jederzeit widerruflich per E-Mail an uns).</li>
  <li><strong>Workshop-Anmeldung:</strong> Die Daten, die Sie in das Google-Forms-Anmeldeformular eingeben (siehe Abschnitt 4) — zur Verwaltung Ihrer Teilnahme (Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO, vorvertragliche Maßnahmen).</li>
  <li><strong>Administrator-Konto:</strong> E-Mail-Adresse + gehashtes Passwort — ausschließlich für Vorstandsmitglieder zur Verwaltung der Website (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse an der Sicherung des Backends).</li>
</ul>
<p>Die Website enthält <strong>kein Kontaktformular</strong>: Sie schreiben uns direkt an <a href="mailto:liber.impro@gmail.com">liber.impro@gmail.com</a>. Die Verarbeitung dieser E-Mail unterliegt den Bestimmungen Ihres E-Mail-Anbieters sowie denen von Google (Gmail).</p>

<h3>4. Auftragsverarbeiter und Empfänger</h3>
<ul>
  <li><strong>Supabase</strong> (Supabase Inc., Hosting in der EU — Frankfurt, Deutschland): Datenbank, Administrator-Authentifizierung und Bildspeicher. Auftragsverarbeiter im Sinne des Art. 28 DSGVO. Datenschutz: <a href="https://supabase.com/privacy" target="_blank" rel="noopener">supabase.com/privacy</a>.</li>
  <li><strong>YesTicket</strong> (yesticket.org): Unsere Aufführungs-Tickets werden über YesTicket verkauft. Wenn Sie auf der Aufführungs-Seite auf „Mehr Infos" klicken, verlassen Sie unsere Website und es gilt die Datenschutzerklärung von YesTicket.</li>
  <li><strong>Google Forms / Google LLC</strong> (USA): Wenn Sie auf den Button im Banner oder im Workshop-Anmeldebereich klicken und dieser auf ein Google Form verweist, verlassen Sie unsere Website und nutzen die Dienste von Google. Datenschutz: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.</li>
  <li><strong>Gmail / Google LLC</strong>: Unsere E-Mail-Adressen <code>liber.impro@gmail.com</code> und <code>polecommunication.liber.impro@gmail.com</code> werden bei Google gehostet. E-Mails, die Sie uns schicken, werden also über Google-Server geleitet.</li>
</ul>

<h3>5. Schriften und externe CDNs</h3>
<p>Die Schriftarten (Bangers, Fredoka, Nunito) werden <strong>lokal vom Server</strong> dieser Website ausgeliefert. Es wird keine Anfrage an Google Fonts gestellt und keine IP-Adresse an Google übermittelt, um die Schriftarten zu laden.</p>
<p>Die Supabase-Client-Bibliothek wird vom CDN <strong>jsDelivr</strong> (StackPath) geladen. Hierbei werden außer der technisch erforderlichen IP-Adresse keine personenbezogenen Daten übertragen.</p>

<h3>6. Cookies und lokaler Speicher</h3>
<p>Diese Website verwendet weder Tracking-Cookies noch Analyse-Tools (kein Google Analytics, Matomo, Plausible o. ä.). Der lokale Browser-Speicher wird ausschließlich für Folgendes genutzt:</p>
<ul>
  <li>Speichern der gewählten Sprache (FR / DE) — zwingend erforderlich;</li>
  <li>Aufrechterhaltung der Sitzung eines eingeloggten Administrators — zwingend erforderlich.</li>
</ul>
<p>Für diese Zwecke ist gemäß § 25 Abs. 2 TTDSG keine Einwilligung erforderlich.</p>

<h3>7. Speicherdauer</h3>
<p>Newsletter-Abonnements bleiben bis zur Abmeldung gespeichert. Workshop-Anmeldungen werden für die Dauer der jeweiligen Saison aufbewahrt und anschließend archiviert oder gelöscht. Administrator-Konten bleiben so lange bestehen, wie die Person vom Vorstand dazu berechtigt ist.</p>

<h3>8. Ihre Rechte</h3>
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
<p>Zur Ausübung dieser Rechte schreiben Sie an den Verantwortlichen: <a href="mailto:info@liber-impro.com">info@liber-impro.com</a>.</p>

<h3>9. Beschwerderecht bei einer Aufsichtsbehörde</h3>
<p>Sie haben das Recht, Beschwerde bei der zuständigen Berliner Aufsichtsbehörde einzulegen:<br>
<strong>Berliner Beauftragte für Datenschutz und Informationsfreiheit</strong><br>
Friedrichstr. 219, 10969 Berlin<br>
Tel. +49 30 13 889-0 — <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener">datenschutz-berlin.de</a></p>

<h3>10. Änderungen</h3>
<p>Wir behalten uns vor, diese Erklärung an geänderte Rechtslagen oder Änderungen unserer Dienste anzupassen. Letzte Aktualisierung: ${new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}.</p>`,
    /* Calendar */
    month_names:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    day_names:['Mo','Di','Mi','Do','Fr','Sa','So'],
  }
};
