const TRANSLATIONS = {
  en: {
    nav_home: "Home",
    nav_symptoms: "Symptoms",
    nav_facilities: "Facilities",
    nav_emergency: "Emergency",
    nav_reminders: "Reminders",
    nav_appointments: "Appointments",
    nav_documents: "Documents",
    hero_badge: "Healthcare navigation made simpler",
    hero_title: "Find the right care.<br><span>Without the confusion.</span>",
    hero_sub:
      "CAERNZA helps you understand your care options, discover healthcare facilities, and organize essential health information — all in one place.",
    btn_start: "Start now",
    trust_heading: "Designed to help you navigate care — not replace it.",
    trust_sub: "Built around clarity, privacy, and non-diagnostic guidance.",
  },
  bn: {
    nav_home: "হোম",
    nav_symptoms: "লক্ষণসমূহ",
    nav_facilities: "হাসপাতাল",
    nav_emergency: "জরুরি সেবা",
    nav_reminders: "রিমাইন্ডার",
    nav_appointments: "অ্যাপয়েন্টমেন্ট",
    nav_documents: "ডকুমেন্টস",
    hero_badge: "স্বাস্থ্যসেবা পথনির্দেশনা এখন আরও সহজ",
    hero_title: "সঠিক সেবা পান।<br><span>কোনো বিভ্রান্তি ছাড়াই।</span>",
    hero_sub:
      "কারনজা (CAERNZA) আপনাকে সঠিক স্বাস্থ্যসেবা নির্বাচন এবং প্রয়োজনীয় তথ্য গুছিয়ে রাখতে সাহায্য করে।",
    btn_start: "শুরু করুন",
    trust_heading: "আপনাকে সাহায্য করার জন্য তৈরি — বিকল্প হিসেবে নয়।",
    trust_sub:
      "স্বচ্ছতা, গোপনীয়তা এবং অ-রোগ নির্ণয়কারী নির্দেশনার ভিত্তিতে গঠিত।",
  },
};

let currentLang = "en";

function toggleLanguage() {
  currentLang = currentLang === "en" ? "bn" : "en";
  const langBtn = document.getElementById("lang-btn");
  if (langBtn)
    langBtn.innerText = currentLang === "en" ? "EN | বাংলা" : "বাংলা | EN";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (TRANSLATIONS[currentLang][key]) {
      el.innerHTML = TRANSLATIONS[currentLang][key];
    }
  });
}
