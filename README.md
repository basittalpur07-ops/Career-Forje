
# 🏗️ Career Forge | Enterprise AI Career Suite

Career Forge is a premium career architect platform. It leverages Google Gemini AI for content intelligence and Firebase for secure, real-time identity management.

---

## 🚀 Quick Start & Setup

### 1. Environment Variables
- **Gemini API Key**: The application requires an `API_KEY` environment variable. This powers all AI features:
  - Work experience optimization (STAR method).
  - Professional summary generation.
  - Smart skill suggestions.
  - The real-time Career Assistant.

### 2. Firebase Configuration (Identity Tier)
The app is configured to use **Firebase Authentication** with Email and Password.
- **Current Project ID**: `career-forge-50018`
- **Setup Steps**:
  1. Ensure the project is active in your Firebase Console.
  2. In the **Authentication** section, enable the **Email/Password** sign-in provider.
  3. The `services/firebase.ts` file is pre-configured with the required parameters.

### 3. Formspree (Communication Tier)
The Contact page uses Formspree for headless form submissions.
- **Form ID**: `mzdaeped` (configured in `components/ContactPage.tsx`).

---

## 🎨 Custom Template Architect

Career Forge allows you to "Upload" and "Forge" your own design templates.

### How to use Custom Templates:
1. **Login**: Authenticate via the Sign In modal to access the Dashboard.
2. **Navigate to Architect**: Click the **🎨 Architect** tab in the dashboard navigation.
3. **Upload Your Design**:
   - Use the **"Upload .forge"** button.
   - Select a valid `.forge` (JSON) file from your local machine.
4. **Live Sculpting**: Adjust Primary Colors, Accent Colors, Font Families, and Spacing in real-time.
5. **Export**: Once your design is perfected, click **"Export Style"** to save your unique template for future use.

---

## 🏗️ Technical Architecture
- **Frontend**: React 19 + Tailwind CSS (Glassmorphism UI).
- **AI Engine**: @google/genai (Gemini 2.5 Flash).
- **Backend**: Firebase Auth + Analytics.
- **Export**: Native browser PDF print engine with custom `@media print` CSS.

---

## 🛡️ Operational Security
- **Data Privacy**: All AI processing is session-based.
- **Identity**: Managed via Firebase's secure Email/Password protocols.
- **Storage**: Custom styles are stored locally or managed via your account.

*Architected for the Bold. Built by the Forge Team.*
