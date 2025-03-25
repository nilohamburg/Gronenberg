"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "EN" | "DE"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations for English and German
const translations = {
  EN: {
    // Navbar
    home: "Home",
    rooms: "Rooms & Suites",
    dining: "Restaurants & Bars",
    spa: "Alpine Spa",
    meetings: "Meetings & Events",
    about: "About",
    contact: "Contact",
    signIn: "SIGN IN",
    bookNow: "BOOK NOW",

    // Hero
    heroTitle: "Historic Charm Meets Modern Luxury",
    heroSubtitle: "Experience the perfect blend of traditional elegance and contemporary comfort at Gronenberger Mühle",
    checkAvailability: "CHECK AVAILABILITY",
    guests: "Guests",
    person: "Person",
    persons: "Persons",
    checkIn: "Check-in",
    checkOut: "Check-out",
    selectCheckIn: "Select check-in date",
    selectCheckOut: "Select check-out date",

    // Rooms
    roomsTitle: "Rooms & Suites",
    roomsDescription:
      "Wake up to mesmerizing views of the countryside. Immerse yourself in five-star luxury, where elegance meets contemporary design. Choose from our beautifully appointed rooms and suites, each designed for ultimate comfort and relaxation.",
    discoverMore: "DISCOVER MORE",

    // Dining
    diningTitle: "Restaurants & Bars",
    diningDescription:
      "Discover a tempting mix of traditional and cosmopolitan tastes with our renowned culinary touch. Experience a culinary journey in award-winning restaurants with a mix of gourmet cuisine, local delicacies, and international dishes. Relish fine wines and cocktails in our sophisticated lobby bar.",
    showAll: "SHOW ALL",

    // Spa
    spaTitle: "Wellness Spa",
    spaDescription:
      "The Spa is the place to be pampered after a day of outdoor adventure. For the ultimate spa experience, immerse yourself in ultimate luxury and tranquility at the Spa. Built on 1,200 sqm our Wellness centre has different saunas, an indoor heated pool, Garden, and a state of the art Gym.",
    readMore: "READ MORE",

    // Meetings
    meetingsTitle: "Meetings & Events",
    meetingsDescription:
      "Uplift your business to new heights of quality, with impeccable services, world-class cuisine, and sophisticated venues. Plan your corporate events, conferences, team buildings, incentives, and weddings with state-of-the-art technology in the inspiring and pristine countryside setting.",

    // About
    aboutTitle: "Gronenberger Mühle",
    aboutDescription:
      "Set in an iconic 19th-century building, this luxury 5-star hotel offers timeless European Luxury with unrivalled access to nature trails. The urban charm in the peaceful surroundings of the countryside makes the resort a true hideaway.",
    hotelDetails: "HOTEL DETAILS",

    // Footer
    aboutUs: "About Us",
    services: "Services",
    newsletter: "Newsletter",
    emailPlaceholder: "Your email",
    subscribe: "Subscribe",
    allRightsReserved: "All rights reserved.",

    // Calendar and Booking
    selectDates: "Select dates",
    selectDatesAlert: "Please select check-in and check-out dates",
    selectCheckInOut: "Select check-in and check-out dates",
    clickForCheckIn: "Click once for check-in, twice for check-out",
    resetToToday: "Reset to today",
    apply: "Apply",
    availableRooms: "Available Rooms",
    noRoomsAvailable: "No rooms available for the selected dates",
    dateFilter: "Date Filter",
    clearFilter: "Clear Filter",
  },
  DE: {
    // Navbar
    home: "Startseite",
    rooms: "Zimmer & Suiten",
    dining: "Restaurants & Bars",
    spa: "Alpen Spa",
    meetings: "Tagungen & Events",
    about: "Über uns",
    contact: "Kontakt",
    signIn: "ANMELDEN",
    bookNow: "JETZT BUCHEN",

    // Hero
    heroTitle: "Urlaub an der Ostsee mit historischem Charme",
    heroSubtitle:
      "Erleben Sie die perfekte Mischung aus traditioneller Eleganz und zeitgemäßem Komfort in der Gronenberger Mühle",
    checkAvailability: "VERFÜGBARKEIT PRÜFEN",
    guests: "Gäste",
    person: "Person",
    persons: "Personen",
    checkIn: "Anreise",
    checkOut: "Abreise",
    selectCheckIn: "Wählen Sie das Anreisedatum",
    selectCheckOut: "Wählen Sie das Abreisedatum",

    // Rooms
    roomsTitle: "Ferienhäuser",
    roomsDescription:
      "Freuen Sie sich auf neu errichtete, modernste Ferienhäuser in einer märchenhaften Naturidylle, die schon jetzt für Sie buchbar ist. Herzstück des wundervoll ruhig gelegenen Hains ist die denkmalgeschützte Gronenberger Wassermühle aus dem 17. Jahrhundert, die in liebevoller Kleinarbeit saniert wurde.",
    discoverMore: "MEHR ENTDECKEN",

    // Dining
    diningTitle: "Restaurant",
    diningDescription:
      "In unserer historischen Wassermühle verbinden sich Tradition und Genuss: umgeben von altem Gemäuer und rustikalen Holzbalken können Sie unserem Küchenchef Konstantin direkt bei der Zubereitung unserer saisonalen Köstlichkeiten zusehen.",
    showAll: "ALLE ANZEIGEN",

    // Spa
    spaTitle: "Wellness & Massage",
    spaDescription:
      "Das Spa ist der Ort, um sich nach einem Tag voller Outdoor-Abenteuer verwöhnen zu lassen. Für das ultimative Spa-Erlebnis tauchen Sie ein in ultimativen Luxus und Ruhe im Spa. Auf 1.200 qm bietet unser Wellnesscenter verschiedene Saunen, einen beheizten Innenpool, einen Garten und ein hochmodernes Fitnessstudio.",
    readMore: "WEITERLESEN",

    // Meetings
    meetingsTitle: "Tagungen & Events",
    meetingsDescription:
      "Die Gronenberger Mühle ist nicht nur ein Ort der Erholung, sondern auch eine exklusive Location für unvergessliche Events. Ob Hochzeiten, Familienfeiern oder Firmenevents – in unserer Hofküche, im Weinkeller oder im stilvollen Seminarraum sowie auf dem gesamten Anwesen bieten wir Ihnen den perfekten Rahmen für ihre besonderen Anlässe. Feiern Sie in historischem Ambiente und lassen sich und ihre Gäste verzaubern!",

    // About
    aboutTitle: "Gronenberger Mühle",
    aboutDescription:
      "Dein exklusives Wohlfühlresort mit wunderschönen Ferienhäusern nahe der Ostsee, eingebettet in die atemberaubende Natur der Pönitzer Seenplatte.",
    hotelDetails: "HOTELDETAILS",

    // Footer
    aboutUs: "Über uns",
    services: "Dienstleistungen",
    newsletter: "Newsletter",
    emailPlaceholder: "Ihre E-Mail",
    subscribe: "Abonnieren",
    allRightsReserved: "Alle Rechte vorbehalten.",

    // Calendar and Booking
    selectDates: "Daten auswählen",
    selectDatesAlert: "Bitte wählen Sie An- und Abreisedaten",
    selectCheckInOut: "Wählen Sie An- und Abreisedaten",
    clickForCheckIn: "Einmal klicken für Anreise, zweimal für Abreise",
    resetToToday: "Auf heute zurücksetzen",
    apply: "Anwenden",
    availableRooms: "Verfügbare Zimmer",
    noRoomsAvailable: "Keine Zimmer für die ausgewählten Daten verfügbar",
    dateFilter: "Datumsfilter",
    clearFilter: "Filter löschen",
  },
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Try to get the language from localStorage, default to "EN"
  const [language, setLanguageState] = useState<Language>("EN")

  // Load language preference from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "EN" || savedLanguage === "DE")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

