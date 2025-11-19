# 📋 Plan de développement complet - RenovAI

## ✅ DÉJÀ FAIT

### Infrastructure Supabase
- [x] MCP Supabase configuré
- [x] Client Supabase (browser + server)
- [x] Middleware de session
- [x] Variables d'environnement

### Base de données
- [x] Table `profiles` avec RLS
- [x] Table `estimations` avec RLS
- [x] Table `shared_estimations` avec RLS
- [x] Table `contact_requests` avec RLS
- [x] Trigger auto-création profil
- [x] Trigger auto-update `updated_at`

### Authentification
- [x] Page inscription
- [x] Page connexion
- [x] Déconnexion
- [x] Session persistante
- [x] Protection routes privées
- [x] UserMenu avec avatar

### Fonctionnalités utilisateur
- [x] Dashboard liste estimations
- [x] Page profil éditable
- [x] Page paramètres
- [x] Sauvegarde estimations
- [x] Suppression estimations
- [x] Statistiques dashboard

---

## 🚧 PHASE 1 : Corrections & Stabilisation (Prioritaire)

### 1.1 Authentification
- [ ] **Désactiver confirmation email en dev** (Supabase Dashboard)
  - Aller dans Authentication > Settings
  - Désactiver "Enable email confirmations"
- [ ] **Ajouter auto-confirmation** pour les nouveaux comptes en dev
- [ ] **Améliorer messages d'erreur** de connexion
  - Email non confirmé → Message clair
  - Mauvais identifiants → Message clair
  - Rate limiting → Message clair

### 1.2 Gestion des erreurs
- [ ] **Toast notifications** au lieu de `alert()`
  - Installer `react-hot-toast` ou `sonner`
  - Remplacer tous les `alert()` par des toasts
- [ ] **Error boundary** React pour capturer les erreurs
- [ ] **Page 404** personnalisée
- [ ] **Page erreur** personnalisée

### 1.3 UX/UI
- [ ] **Loading states** partout (skeleton screens)
- [ ] **Animations** de transition (framer-motion)
- [ ] **Feedback visuel** sur toutes les actions
- [ ] **Responsive** : Vérifier mobile/tablet

---

## 📊 PHASE 2 : Fonctionnalités avancées (1-2 semaines)

### 2.1 Gestion des estimations
- [ ] **Favoris** - Marquer/démarquer estimations favorites
- [ ] **Filtres** dans le dashboard
  - Par type de travaux
  - Par fourchette de prix
  - Par date
- [ ] **Tri** des estimations
  - Par date (asc/desc)
  - Par montant (asc/desc)
  - Par nom
- [ ] **Recherche** dans les estimations
- [ ] **Notes personnelles** sur chaque estimation
- [ ] **Historique** des modifications d'une estimation
- [ ] **Comparaison** de plusieurs estimations côte à côte

### 2.2 Partage & Export
- [ ] **Partage d'estimation** via lien public
  - Générer un lien de partage unique
  - Page publique `/shared/[shareId]`
  - Expiration optionnelle du lien
  - Compteur de vues
- [ ] **Export PDF** des estimations
  - Template PDF professionnel
  - Logo + infos utilisateur
  - QR code vers le site
- [ ] **Export Excel/CSV** pour analyse
- [ ] **Envoi par email** de l'estimation

### 2.3 Profil & Paramètres
- [ ] **Photo de profil**
  - Upload via Supabase Storage
  - Crop/resize automatique
  - Affichage dans le UserMenu
- [ ] **Modification du mot de passe**
  - Formulaire sécurisé
  - Confirmation par email
- [ ] **Authentification à deux facteurs (2FA)**
- [ ] **Sessions actives** - Voir et révoquer
- [ ] **Notifications email**
  - Nouvelle estimation sauvegardée
  - Rappel devis expirés
  - Newsletter (opt-in)

---

## 🤖 PHASE 3 : IA & Analyse avancée (2-3 semaines)

### 3.1 Amélioration de l'IA d'estimation
- [ ] **Mode IA avancé** (avec clé API Anthropic)
  - Analyse plus détaillée
  - Recommandations personnalisées
  - Détection des optimisations possibles
- [ ] **Historique des prompts** pour débuggage
- [ ] **A/B testing** des prompts
- [ ] **Cache des estimations** similaires
- [ ] **Apprentissage** basé sur les retours utilisateurs

### 3.2 Analyse photo par IA (Vision)
- [ ] **Upload de photos** du chantier
  - Supabase Storage pour les images
  - Compression automatique
- [ ] **Analyse visuelle** avec Claude Vision
  - Détection du type de travaux
  - État actuel (bon/moyen/mauvais)
  - Surface approximative
  - Problèmes visibles
- [ ] **Recommandations** basées sur les photos
- [ ] **Avant/Après** - Galerie photos

### 3.3 Chatbot assistant
- [ ] **Chatbot IA** pour aide à la décision
  - Intégration Anthropic Claude
  - Contexte : type de travaux, budget, délai
  - Suggestions de matériaux, artisans, timing
- [ ] **Historique des conversations**
- [ ] **Export des conseils** en PDF

---

## 👷 PHASE 4 : Écosystème & Intégrations (3-4 semaines)

### 4.1 Réseau d'artisans
- [ ] **Table `artisans`** dans Supabase
  - Profil artisan complet
  - Spécialités, zones d'intervention
  - Tarifs moyens, disponibilité
- [ ] **Inscription artisan** - Formulaire dédié
- [ ] **Profil public artisan** - Page `/artisans/[id]`
- [ ] **Matching** estimation ↔ artisans
  - Algorithme de recommandation
  - Notification aux artisans pertinents
- [ ] **Demande de devis** directement aux artisans
- [ ] **Système d'avis** et notes (5 étoiles)
- [ ] **Messagerie** utilisateur ↔ artisan
  - Supabase Realtime
  - Notifications push

### 4.2 Calendrier & Planification
- [ ] **Calendrier des travaux**
  - Vue mensuelle/hebdomadaire
  - Drag & drop pour réorganiser
- [ ] **Planning prévisionnel** généré par l'IA
  - Ordre des travaux optimal
  - Dépendances entre tâches
  - Estimation durée par tâche
- [ ] **Rappels** et notifications
  - Début des travaux
  - Jalons importants
  - Paiements prévus

### 4.3 Suivi de chantier
- [ ] **Table `projects`** - Projets en cours
- [ ] **Statuts** : Planifié → En cours → Terminé
- [ ] **Journal de bord**
  - Notes quotidiennes
  - Photos de progression
  - Problèmes rencontrés
- [ ] **Factures** - Upload et stockage
- [ ] **Paiements** - Suivi des échéances
- [ ] **Documents** - Contrats, assurances, etc.

---

## 💰 PHASE 5 : Monétisation & Business (4-5 semaines)

### 5.1 Modèle freemium
- [ ] **Limites version gratuite**
  - 3 estimations/mois
  - Pas d'export PDF
  - Pas d'analyse photo IA
- [ ] **Plans payants**
  - Essential : 9.90€/mois
  - Pro : 24.90€/mois
  - Business : 49.90€/mois
- [ ] **Intégration Stripe**
  - Abonnements récurrents
  - Essai gratuit 14 jours
  - Gestion annulations

### 5.2 Commissions artisans
- [ ] **Abonnement artisan**
  - Profil premium
  - Visibilité augmentée
  - Lead generation
- [ ] **Commission** sur devis acceptés (5-10%)
- [ ] **Tableau de bord artisan** - Suivi des leads

### 5.3 Partenariats & Affiliations
- [ ] **Programme d'affiliation** magasins de matériaux
- [ ] **Codes promo** avec négociations
- [ ] **API publique** pour partenaires
- [ ] **White label** pour franchises

---

## 📈 PHASE 6 : Analytics & Optimisation (Continu)

### 6.1 Analytics
- [ ] **Google Analytics 4**
- [ ] **Posthog** ou **Plausible** (privacy-first)
- [ ] **Supabase Analytics**
  - Requêtes les plus utilisées
  - Performance API
- [ ] **Dashboards admin**
  - Utilisateurs actifs
  - Estimations créées
  - Taux de conversion
  - Revenus

### 6.2 Performance
- [ ] **Caching** avec Redis (Upstash)
- [ ] **CDN** pour images (Cloudflare)
- [ ] **Lazy loading** composants
- [ ] **Code splitting** optimisé
- [ ] **Bundle size** analysis

### 6.3 SEO & Marketing
- [ ] **SEO on-page** optimisé
  - Meta tags dynamiques
  - Sitemap XML
  - Schema.org markup
- [ ] **Blog** avec articles
  - CMS (Sanity/Contentful)
  - Guides de travaux
  - Conseils rénovation
- [ ] **Landing pages** par type de travaux
- [ ] **Email marketing** (Resend/Mailchimp)

---

## 🔒 PHASE 7 : Sécurité & Conformité (Prioritaire mais continu)

### 7.1 Sécurité
- [ ] **Rate limiting** sur toutes les API
  - Upstash Ratelimit
  - Protection contre bruteforce
- [ ] **CAPTCHA** sur signup/login (hCaptcha)
- [ ] **Validation** stricte côté serveur
- [ ] **Sanitisation** des inputs utilisateur
- [ ] **Audit** de sécurité régulier
- [ ] **Logs** d'activité suspecte

### 7.2 Conformité RGPD
- [ ] **Politique de confidentialité** détaillée
- [ ] **CGU** complètes
- [ ] **Cookies banner** (conforme RGPD)
- [ ] **Droit à l'oubli** - Suppression compte complète
- [ ] **Export des données** utilisateur
- [ ] **Consentements** explicites (newsletter, etc.)

### 7.3 Backup & Disaster Recovery
- [ ] **Backups automatiques** quotidiens
- [ ] **Point-in-time recovery** (Supabase)
- [ ] **Monitoring** (Sentry, Datadog)
- [ ] **Plan de reprise d'activité**

---

## 🧪 PHASE 8 : Tests & Qualité (Continu)

### 8.1 Tests automatisés
- [ ] **Tests unitaires** (Vitest)
  - Fonctions utilitaires
  - Validation de formulaires
- [ ] **Tests d'intégration** (Playwright)
  - Parcours utilisateur complets
  - API endpoints
- [ ] **Tests E2E** (Playwright)
  - Inscription → Estimation → Sauvegarde
  - Paiement (mode test)
- [ ] **Tests de charge** (k6)

### 8.2 CI/CD
- [ ] **GitHub Actions**
  - Tests automatiques sur PR
  - Linting & formatting
  - Build check
- [ ] **Déploiement automatique**
  - Preview deployments (Vercel)
  - Production après merge main
- [ ] **Rollback** automatique si erreur

---

## 📱 PHASE 9 : Mobile (Optionnel, 6-8 semaines)

### 9.1 PWA (Progressive Web App)
- [ ] **Manifest.json**
- [ ] **Service Worker**
- [ ] **Installation** sur écran d'accueil
- [ ] **Mode offline** (basic)
- [ ] **Push notifications**

### 9.2 Application native (React Native)
- [ ] **Setup** Expo/React Native
- [ ] **Partage du code** avec Next.js
- [ ] **Store listing** (App Store + Play Store)

---

## 🎯 PRIORITÉS IMMÉDIATES (Cette semaine)

### Jour 1-2 : Corrections critiques
1. ✅ Désactiver confirmation email (ou auto-confirmer)
2. ✅ Améliorer gestion erreurs (toasts)
3. ✅ Vérifier responsive mobile
4. ✅ Ajouter loading states

### Jour 3-4 : Fonctionnalités clés
5. ✅ Export PDF des estimations
6. ✅ Partage d'estimations (lien public)
7. ✅ Favoris dans le dashboard
8. ✅ Filtres/tri dashboard

### Jour 5-7 : Polish & Tests
9. ✅ Tests E2E parcours complet
10. ✅ Correction bugs découverts
11. ✅ Documentation utilisateur
12. ✅ Déploiement production

---

## 📊 MÉTRIQUES DE SUCCÈS

### Court terme (1 mois)
- [ ] 100 utilisateurs inscrits
- [ ] 500 estimations créées
- [ ] Taux de conversion signup : >30%
- [ ] Temps moyen par estimation : <5 min

### Moyen terme (3 mois)
- [ ] 1000 utilisateurs actifs/mois
- [ ] 50 artisans inscrits
- [ ] 100 devis envoyés via la plateforme
- [ ] Revenus : 500€/mois

### Long terme (6 mois)
- [ ] 5000 utilisateurs actifs/mois
- [ ] 200 artisans actifs
- [ ] 1000 devis/mois
- [ ] Revenus : 5000€/mois

---

## 🛠️ STACK TECHNIQUE

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion (animations)
- React Hook Form + Zod

### Backend
- Next.js API Routes
- Supabase (PostgreSQL)
- Supabase Auth
- Supabase Storage
- Supabase Realtime

### IA
- Anthropic Claude (Sonnet 3.5)
- Claude Vision (analyse photo)

### Paiements
- Stripe (abonnements + one-time)

### Email
- Resend (transactionnel)
- Mailchimp (marketing)

### Monitoring
- Sentry (erreurs)
- Posthog (analytics)
- Vercel Analytics

### Tests
- Vitest (unit)
- Playwright (E2E)
- k6 (charge)

---

## 📞 SUPPORT & MAINTENANCE

### Quotidien
- Monitoring erreurs (Sentry)
- Support utilisateurs (email)
- Modération contenus

### Hebdomadaire
- Review analytics
- Optimisations performance
- Nouveaux artisans

### Mensuel
- Backup complet
- Audit sécurité
- Planification roadmap

---

**Créé le :** 19 novembre 2024  
**Dernière mise à jour :** 19 novembre 2024  
**Version :** 1.0

