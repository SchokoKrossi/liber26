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
    newsletter_btn:"S'abonner sur YesTicket ↗",
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
    privacy_body:`<h2>Politique de confidentialité</h2>
<p><em>Dernière mise à jour : 11 septembre 2026</em></p>

<h3>1. Responsable du traitement</h3>
<p><strong>Cours et jardins gUG (haftungsbeschränkt)</strong><br>
Skalitzer Straße 27, 10999 Berlin, Allemagne<br>
Représentée par Damien Poinsard, Geschäftsführer.<br>
Contact : <a href="mailto:info@liber-impro.com">info@liber-impro.com</a><br>
Téléphone : +49 (0)30 499 670 91</p>
<p>Pour toute question relative à la protection des données ou pour exercer vos droits, contactez-nous à l'adresse ci-dessus.</p>

<h3>2. Données personnelles collectées</h3>
<p>Selon votre utilisation du site et de nos services, nous pouvons collecter et traiter les données suivantes :</p>
<ul>
  <li>nom et prénom ;</li>
  <li>adresse électronique ;</li>
  <li>informations relatives aux inscriptions aux ateliers ;</li>
  <li>données communiquées au moyen de nos formulaires ;</li>
  <li>données techniques nécessaires au fonctionnement et à la sécurité du site.</li>
</ul>
<p>Nous ne collectons que les données nécessaires aux finalités décrites dans la présente politique.</p>

<h3>3. Finalités du traitement</h3>
<p>Nous traitons vos données personnelles afin de :</p>
<ul>
  <li>répondre à vos demandes ;</li>
  <li>gérer les inscriptions aux ateliers et les réservations de billets ;</li>
  <li>organiser les ateliers et les projets culturels ;</li>
  <li>communiquer avec les participant·es, les familles, les intervenant·es et les partenaires ;</li>
  <li>assurer la sécurité et le bon déroulement de nos activités ;</li>
  <li>respecter nos obligations légales, fiscales et administratives ;</li>
  <li>vous envoyer notre newsletter, si vous y avez souscrit ;</li>
  <li>assurer le fonctionnement, la sécurité et l'amélioration du site.</li>
</ul>

<h3>4. Bases juridiques</h3>
<p>Selon le traitement concerné, vos données sont traitées sur les bases juridiques suivantes :</p>
<ul>
  <li>l'exécution d'un contrat ou de mesures précontractuelles ;</li>
  <li>votre consentement (notamment pour la newsletter — retirable à tout moment) ;</li>
  <li>notre intérêt légitime à assurer le fonctionnement et la sécurité de nos activités.</li>
</ul>

<h3>5. Hébergement du site</h3>
<p>Le site est hébergé sur <strong>GitHub Pages</strong> (GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis). GitHub stocke automatiquement, à chaque visite, un fichier journal contenant l'adresse IP, la date/heure, l'URL appelée et l'agent utilisateur, à des fins de sécurité. Le transfert vers les États-Unis s'appuie sur les Clauses Contractuelles Types de la Commission européenne et sur la certification de GitHub au Data Privacy Framework UE–USA. Politique : <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">github.com/site-policy</a>.</p>

<h3>6. Prestataires et destinataires des données</h3>
<ul>
  <li><strong>Supabase</strong> (Supabase Inc., hébergement en UE — Francfort) : base de données, authentification administrateur et stockage des images. Sous-traitant au sens de l'art. 28 RGPD. Politique : <a href="https://supabase.com/privacy" target="_blank" rel="noopener">supabase.com/privacy</a>.</li>
  <li><strong>YesTicket</strong> (yesticket.org) : vente de billets pour nos spectacles. En cliquant sur « Plus d'infos » depuis la page Spectacles, vous quittez notre site et la politique de YesTicket s'applique.</li>
  <li><strong>Mailchimp / Intuit Inc.</strong> (États-Unis) : envoi de notre newsletter. Vos données (adresse email) sont transmises à Mailchimp lorsque vous vous abonnez via YesTicket. Politique : <a href="https://mailchimp.com/legal/privacy/" target="_blank" rel="noopener">mailchimp.com/legal/privacy</a>.</li>
  <li><strong>Google Forms / Google LLC</strong> (États-Unis) : formulaires d'inscription aux ateliers. En cliquant sur le bouton d'inscription, vous quittez notre site et entrez sur les services de Google. Politique : <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.</li>
  <li><strong>Gmail / Google LLC</strong> : nos adresses <code>liber.impro@gmail.com</code> et <code>polecommunication.liber.impro@gmail.com</code> sont hébergées chez Google. Tout courriel que vous nous envoyez transite par les serveurs de Google.</li>
</ul>

<h3>7. Cookies et stockage local</h3>
<p>Ce site n'utilise ni cookies de suivi ni outils d'analyse. Le stockage local du navigateur est utilisé uniquement pour :</p>
<ul>
  <li>mémoriser la langue choisie (FR / DE) — strictement nécessaire ;</li>
  <li>maintenir la session d'un administrateur connecté — strictement nécessaire.</li>
</ul>
<p>Aucun consentement n'est requis pour ces usages au titre du § 25 al. 2 TTDSG.</p>

<h3>8. Durée de conservation</h3>
<p>Les données des personnes n'ayant eu aucune relation active avec nous pendant trois ans sont supprimées ou anonymisées, sauf obligation légale contraire. Les abonnements à la newsletter sont conservés jusqu'à désinscription.</p>

<h3>9. Vos droits</h3>
<p>Conformément au RGPD, vous disposez des droits suivants :</p>
<ul>
  <li>droit d'accès (art. 15 RGPD) ;</li>
  <li>droit de rectification (art. 16 RGPD) ;</li>
  <li>droit à l'effacement (art. 17 RGPD) ;</li>
  <li>droit à la limitation du traitement (art. 18 RGPD) ;</li>
  <li>droit à la portabilité (art. 20 RGPD) ;</li>
  <li>droit d'opposition (art. 21 RGPD) ;</li>
  <li>droit de retirer votre consentement à tout moment (art. 7 §3 RGPD).</li>
</ul>
<p>Pour exercer ces droits : <a href="mailto:info@liber-impro.com">info@liber-impro.com</a></p>

<h3>10. Droit de réclamation</h3>
<p>Vous avez le droit de déposer une réclamation auprès de l'autorité de contrôle compétente :<br>
<strong>Berliner Beauftragte für Datenschutz und Informationsfreiheit</strong><br>
Alt-Moabit 59–61, 10555 Berlin<br>
E-mail : <a href="mailto:mailbox@datenschutz-berlin.de">mailbox@datenschutz-berlin.de</a> — Tél. +49 30 13889-0</p>

<h3>11. Mise à jour de la présente politique</h3>
<p>La présente politique peut être modifiée lorsque nos activités, nos outils techniques ou les obligations légales évoluent. La version publiée sur cette page est la version applicable.</p>`,
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
    newsletter_btn:'Auf YesTicket abonnieren ↗',
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
    privacy_body:`<h2>Datenschutzerklärung</h2>
<p><em>Stand: 11. September 2026</em></p>

<h3>1. Verantwortliche Stelle</h3>
<p><strong>Cours et jardins gUG (haftungsbeschränkt)</strong><br>
Skalitzer Straße 27, 10999 Berlin, Deutschland<br>
Vertreten durch Damien Poinsard, Geschäftsführer.<br>
Kontakt: <a href="mailto:info@liber-impro.com">info@liber-impro.com</a><br>
Telefon: +49 (0)30 499 670 91</p>
<p>Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte können Sie uns unter der oben genannten Adresse kontaktieren.</p>

<h3>2. Erhobene personenbezogene Daten</h3>
<p>Je nach Nutzung unserer Website und unserer Angebote können folgende Daten verarbeitet werden:</p>
<ul>
  <li>Vor- und Nachname;</li>
  <li>E-Mail-Adresse;</li>
  <li>Angaben zu Anmeldungen für Workshops;</li>
  <li>Daten aus unseren Formularen;</li>
  <li>technische Daten für den Betrieb und die Sicherheit der Website.</li>
</ul>
<p>Wir erheben nur Daten, die für die genannten Zwecke erforderlich sind.</p>

<h3>3. Zwecke der Verarbeitung</h3>
<p>Wir verarbeiten personenbezogene Daten, um:</p>
<ul>
  <li>Anfragen zu beantworten;</li>
  <li>Anmeldungen für Workshops und Ticketreservierungen zu verwalten;</li>
  <li>Workshops und kulturelle Projekte zu organisieren;</li>
  <li>mit Teilnehmer:innen, Familien, freien Mitarbeiter:innen und Partner:innen zu kommunizieren;</li>
  <li>die Sicherheit und ordnungsgemäße Durchführung unserer Aktivitäten zu gewährleisten;</li>
  <li>gesetzliche, steuerliche und administrative Pflichten zu erfüllen;</li>
  <li>unseren Newsletter zu versenden, sofern Sie sich angemeldet haben;</li>
  <li>den Betrieb, die Sicherheit und die Verbesserung der Website zu gewährleisten.</li>
</ul>

<h3>4. Rechtsgrundlagen</h3>
<p>Je nach Verarbeitung erfolgt die Datenverarbeitung auf Grundlage von:</p>
<ul>
  <li>der Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen;</li>
  <li>Ihrer Einwilligung (insbesondere für den Newsletter — jederzeit widerruflich);</li>
  <li>unserem berechtigten Interesse am sicheren Betrieb und an der Verwaltung unserer Aktivitäten.</li>
</ul>

<h3>5. Hosting der Website</h3>
<p>Die Website wird bei <strong>GitHub Pages</strong> (GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA) gehostet. GitHub speichert bei jedem Aufruf automatisch ein Server-Logfile mit IP-Adresse, Datum/Uhrzeit, aufgerufener URL und User-Agent zum Zweck der Sicherheit. Der Transfer in die USA stützt sich auf die Standardvertragsklauseln der EU-Kommission sowie auf die Zertifizierung von GitHub unter dem EU-USA Data Privacy Framework. Datenschutz: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">github.com/site-policy</a>.</p>

<h3>6. Dienstleister und Empfänger der Daten</h3>
<ul>
  <li><strong>Supabase</strong> (Supabase Inc., Hosting in der EU — Frankfurt, Deutschland): Datenbank, Administrator-Authentifizierung und Bildspeicher. Auftragsverarbeiter im Sinne des Art. 28 DSGVO. Datenschutz: <a href="https://supabase.com/privacy" target="_blank" rel="noopener">supabase.com/privacy</a>.</li>
  <li><strong>YesTicket</strong> (yesticket.org): Unsere Aufführungs-Tickets werden über YesTicket verkauft. Wenn Sie auf der Aufführungs-Seite auf „Mehr Infos" klicken, verlassen Sie unsere Website und es gilt die Datenschutzerklärung von YesTicket.</li>
  <li><strong>Mailchimp / Intuit Inc.</strong> (USA): Versand unseres Newsletters. Ihre E-Mail-Adresse wird bei einer Newsletter-Anmeldung über YesTicket an Mailchimp übermittelt. Datenschutz: <a href="https://mailchimp.com/legal/privacy/" target="_blank" rel="noopener">mailchimp.com/legal/privacy</a>.</li>
  <li><strong>Google Forms / Google LLC</strong> (USA): Workshop-Anmeldeformulare. Wenn Sie auf den Anmelde-Button klicken, verlassen Sie unsere Website und nutzen die Dienste von Google. Datenschutz: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.</li>
  <li><strong>Gmail / Google LLC</strong>: Unsere E-Mail-Adressen <code>liber.impro@gmail.com</code> und <code>polecommunication.liber.impro@gmail.com</code> werden bei Google gehostet. E-Mails, die Sie uns senden, werden über Google-Server geleitet.</li>
</ul>

<h3>7. Cookies und lokaler Speicher</h3>
<p>Diese Website verwendet weder Tracking-Cookies noch Analyse-Tools. Der lokale Browser-Speicher wird ausschließlich für Folgendes genutzt:</p>
<ul>
  <li>Speichern der gewählten Sprache (FR / DE) — zwingend erforderlich;</li>
  <li>Aufrechterhaltung der Sitzung eines eingeloggten Administrators — zwingend erforderlich.</li>
</ul>
<p>Für diese Zwecke ist gemäß § 25 Abs. 2 TTDSG keine Einwilligung erforderlich.</p>

<h3>8. Speicherdauer</h3>
<p>Daten von Personen, die drei Jahre lang keine aktive Beziehung zu uns unterhalten haben, werden gelöscht oder anonymisiert, sofern keine gesetzliche Aufbewahrungspflicht besteht. Newsletter-Abonnements werden bis zur Abmeldung gespeichert.</p>

<h3>9. Ihre Rechte</h3>
<p>Sie haben nach Maßgabe der gesetzlichen Voraussetzungen folgende Rechte:</p>
<ul>
  <li>Auskunftsrecht (Art. 15 DSGVO);</li>
  <li>Recht auf Berichtigung (Art. 16 DSGVO);</li>
  <li>Recht auf Löschung (Art. 17 DSGVO);</li>
  <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO);</li>
  <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO);</li>
  <li>Widerspruchsrecht (Art. 21 DSGVO);</li>
  <li>Recht auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO).</li>
</ul>
<p>Zur Ausübung Ihrer Rechte: <a href="mailto:info@liber-impro.com">info@liber-impro.com</a></p>

<h3>10. Beschwerderecht</h3>
<p>Sie haben das Recht, Beschwerde bei der zuständigen Aufsichtsbehörde einzulegen:<br>
<strong>Berliner Beauftragte für Datenschutz und Informationsfreiheit</strong><br>
Alt-Moabit 59–61, 10555 Berlin<br>
E-Mail: <a href="mailto:mailbox@datenschutz-berlin.de">mailbox@datenschutz-berlin.de</a> — Tel. +49 30 13889-0</p>

<h3>11. Aktualisierung dieser Datenschutzerklärung</h3>
<p>Diese Datenschutzerklärung kann geändert werden, wenn sich unsere Aktivitäten, die verwendeten technischen Dienste oder die gesetzlichen Anforderungen ändern. Es gilt jeweils die auf dieser Website veröffentlichte Fassung.</p>`,
    /* Calendar */
    month_names:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    day_names:['Mo','Di','Mi','Do','Fr','Sa','So'],
  }
};
