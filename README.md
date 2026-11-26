# ÉLAN PHYSIO — Aesthetic Animated Physiotherapy & Testimonials Platform

A luxurious, high-performance web application designed for a premier physical therapy and musculoskeletal longevity clinic (**ÉLAN PHYSIO**). Built with an editorial aesthetic, smooth animations, interactive symptom diagnostics, a multi-step appointment booking engine, and an animated before/after patient testimonials showcase.

---

## ✨ Key Features & Aesthetic Elements

### 1. 🌿 Classy & Restorative Aesthetic
* **Color Palette**: Deep Forest Sage (`#1B382B`), Earthen Linen (`#FAF7F2`), Warm Champagne Gold (`#C29B38`, `#DFBF6D`), and Soft Warm Grays.
* **Typography**: Editorial serif (*Cormorant Garamond* & *Playfair Display*) paired with clean geometric sans-serif (*Plus Jakarta Sans*).
* **Glassmorphism & Micro-Interactions**: Ambient glowing fluid background orbs, floating recovery metric badges, smooth hover tilt effects, and custom scrollbars.

---

### 2. 📅 Interactive 4-Step Appointment Booking Engine
* **Step 1: Protocol & Setting Selection**:
  * Choose between *Spinal Decompression*, *Sports Biomechanics & ACL*, *Trigger Point Dry Needling*, *Post-Op Joint Restoration*, etc.
  * Select consultation setting: Penthouse Suite, At-Home Concierge (+ $75), or HD Telehealth.
  * Choose your Doctor of Physical Therapy (DPT, Board-Certified).
* **Step 2: Date & Time Slot Engine**:
  * 14-day interactive date selector with day-of-week badges.
  * Morning, Afternoon, and Evening slots with real-time selection state.
* **Step 3: Confidential Patient Intake**:
  * Patient personal info, interactive discomfort slider (1 to 10), chief complaint text, and prior imaging/surgery flags.
* **Step 4: Digital Boarding Pass & Confirmation**:
  * Generates a sleek VIP Clinical Pass with unique booking ID (e.g. `ELAN-849201`), QR pass graphic, and summary.
  * **Confetti Celebration Animation** on confirmation.
  * **Add to Calendar (.ics)**: Direct one-click download of calendar event file for Apple Calendar, Google Calendar, or Outlook.

---

### 3. ⭐ Animated Patient Testimonials & Recovery Stories
* **Quantifiable Clinical Recovery Metrics**:
  * Pain score reduction bar (e.g., `9/10 ➔ 0/10`).
  * Mobility gain meter (e.g., `+92% Range of Motion`).
  * Duration & Protocol tag (`6 Weeks Protocol`).
  * Attending therapist attribution and verified patient checkmark.
* **Interactive Carousel**:
  * Category filtering (*Spine & Disc*, *Sports Rehab*, *Shoulder & Neck*, *Pelvic & Core*).
  * Smooth next/previous slide controls, auto-play with pause on hover, and slide indicators.
* **"Submit Your Recovery Story" Modal**:
  * Real patients can rate with interactive hover stars, input their diagnosis, describe their recovery, and publish their review.
  * Newly submitted stories animate directly into the live gallery with celebration effects!

---

### 4. 🔬 Interactive Body Zone & Pain Diagnostic Visualizer
* Patients can interactively click between anatomical zones (*Lower Back & Sciatica*, *Neck & Cervical*, *Knee & ACL*, *Shoulder & Rotator Cuff*, etc.).
* Dynamic pain slider shifts clinical advice in real-time (*Mild*, *Moderate*, *Acute*).
* Instantly matches the patient to the recommended therapy protocol, expected recovery timeline, and assigned doctoral specialist with 1-click booking pre-fill.

---

### 5. 🎥 Video Case Study Modal
* Interactive video case study modal showing patient recovery transformations with clinical milestone breakdowns (Week 1, Week 3, Week 6).

---

## 🚀 How to Run the Project

### Option A: Instant Double-Click (Zero Setup Needed)
Simply open the file:
```
C:\Users\MY ACER\.gemini\antigravity\scratch\physiotherapy-clinic\standalone.html
```
Double-click it to run immediately in Google Chrome, Microsoft Edge, or any modern browser.

---

### Option B: Run Vite Development Server
1. Navigate to the project folder:
   ```powershell
   cd "C:\Users\MY ACER\.gemini\antigravity\scratch\physiotherapy-clinic"
   ```
2. Run via batch script:
   ```cmd
   start.bat
   ```
   *Or* run via npm command:
   ```powershell
   cmd /c "npm run dev"
   ```
3. Open your browser at:
   ```
   http://localhost:3000
   ```

---

### Option C: Production Build
```powershell
cmd /c "npm run build"
```
The optimized production bundle is compiled into `dist/`.

---

## 📁 Project Architecture

```
physiotherapy-clinic/
├── index.html                     # HTML Entry point with Google Fonts
├── vite.config.js                 # Vite configuration with React & Tailwind plugins
├── package.json                   # Dependencies and scripts
├── start.bat                      # 1-click Windows runner
├── standalone.html                # Self-contained instant browser preview
├── src/
│   ├── main.jsx                   # React DOM render entry
│   ├── App.jsx                    # Core application coordinator & toast state
│   ├── index.css                  # Tailwind styles, keyframe animations & glassmorphism
│   ├── data/
│   │   └── clinicData.js          # Specialists, Services, Testimonials, Zones, & FAQs
│   └── components/
│       ├── Navbar.jsx             # Floating glass header & mobile drawer
│       ├── Hero.jsx               # Headline, ambient glowing blobs & floating cards
│       ├── StatsRibbon.jsx        # Clinical trust metrics
│       ├── SymptomChecker.jsx     # Interactive anatomical zone & pain analyzer
│       ├── ServicesSection.jsx    # Category filtered treatment cards
│       ├── SpecialistsSection.jsx # Doctor profiles & booking links
│       ├── BookingWizard.jsx      # 4-Step booking engine + Boarding Pass ticket + .ics
│       ├── TestimonialsSection.jsx# Animated patient recoveries carousel & metrics
│       ├── ReviewModal.jsx        # Interactive review submission modal
│       ├── VideoStoryModal.jsx    # Clinical case study video player modal
│       ├── ClinicAmbience.jsx     # Restorative sanctuary photo gallery
│       ├── FaqSection.jsx         # Accordion for patient inquiries
│       └── Footer.jsx             # Clinic hours, address, and newsletter
```
