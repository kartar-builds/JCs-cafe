/* ============================================================
   CAFÉ JC'S — config.js
   
   ⚙️  SIRF YE FILE CHANGE KARO — baaki sab automatic update ho jayega
   
   Client change hone par:
   1. CAFE_WHATSAPP_NUMBER update karo
   2. GOOGLE_SCRIPT_URL update karo (Apps Script deploy karne ke baad)
   3. ADMIN_PASSWORD change karo
   4. CAFE_NAME update karo (optional)
============================================================ */

const CAFE_CONFIG = {

  // ── Café Details ──────────────────────────────────────────
  CAFE_NAME:        "Café JC's",
  CAFE_PHONE:       "+91 84370 43234",
  CAFE_ADDRESS:     "Coal Depot Complex, Sector 10D, Chandigarh – 160011",
  CAFE_HOURS:       "08:30 AM – 11:30 PM (All Days)",

  // ── Owner Email (Google Sheets se aayegi notification) ────
  OWNER_EMAIL:      "kartarsaini305@gmail.com",

  // ── WhatsApp Number (country code ke saath, no spaces) ───
  // Example: India +91 = "918437043234"
  CAFE_WHATSAPP:    "918690763916",

  // ── Google Apps Script URL ────────────────────────────────
  // Ye URL Google Apps Script deploy karne ke baad milegi
  // Setup guide: README mein dekho
  // Abhi placeholder hai — deploy karne ke baad yahan paste karo:
  GOOGLE_SCRIPT_URL: "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE",

  // ── Admin Panel Password ──────────────────────────────────
  // Client ko dene ke baad change karo
  ADMIN_PASSWORD:   "Saini@123",

  // ── Social Links ──────────────────────────────────────────
  INSTAGRAM_URL:    "https://www.instagram.com/cafejcs",
  FACEBOOK_URL:     "https://www.facebook.com/cafejcs",
  ZOMATO_URL:       "https://www.zomato.com/chandigarh/cafe-jcs-sector-10/order",
  SWIGGY_URL:       "https://www.swiggy.com/restaurants/cafe-jcs-sector-10-chandigarh-41453",

};
