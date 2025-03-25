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
    heroTitle: "Historischer Charme trifft modernen Luxus",
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
    roomsTitle: "Zimmer & Suiten",
    roomsDescription:
      "Wachen Sie auf mit atemberaubenden Ausblicken auf die Landschaft. Tauchen Sie ein in Fünf-Sterne-Luxus, wo Eleganz auf zeitgemäßes Design trifft. Wählen Sie aus unseren wunderschön eingerichteten Zimmern und Suiten, die für höchsten Komfort und Entspannung konzipiert sind.",
    discoverMore: "MEHR ENTDECKEN",

    // Dining
    diningTitle: "Restaurants & Bars",
    diningDescription:
      "Entdecken Sie eine verlockende Mischung aus traditionellen und kosmopolitischen Geschmäckern mit unserer renommierten kulinarischen Note. Erleben Sie eine kulinarische Reise in preisgekrönten Restaurants mit einer Mischung aus Gourmetküche, lokalen Spezialitäten und internationalen Gerichten. Genießen Sie erlesene Weine und Cocktails in unserer anspruchsvollen Lobbybar.",
    showAll: "ALLE ANZEIGEN",

    // Spa
    spaTitle: "Wellness Spa",
    spaDescription:
      "Das Spa ist der Ort, um sich nach einem Tag voller Outdoor-Abenteuer verwöhnen zu lassen. Für das ultimative Spa-Erlebnis tauchen Sie ein in ultimativen Luxus und Ruhe im Spa. Auf 1.200 qm bietet unser Wellnesscenter verschiedene Saunen, einen beheizten Innenpool, einen Garten und ein hochmodernes Fitnessstudio.",
    readMore: "WEITERLESEN",

    // Meetings
    meetingsTitle: "Tagungen & Events",
    meetingsDescription:
      "Heben Sie Ihr Geschäft auf ein neues Qualitätsniveau mit tadellosen Dienstleistungen, erstklassiger Küche und anspruchsvollen Veranstaltungsorten. Planen Sie Ihre Firmenveranstaltungen, Konferenzen, Teambuildings, Incentives und Hochzeiten mit modernster Technologie in der inspirierenden und unberührten Landschaft.",

    // About
    aboutTitle: "Gronenberger Mühle",
    aboutDescription:
      "In einem ikonischen Gebäude aus dem 19. Jahrhundert bietet dieses luxuriöse 5-Sterne-Hotel zeitlosen europäischen Luxus mit unvergleichlichem Zugang zu Naturpfaden. Der urbane Charme in der friedlichen Umgebung des Landes macht das Resort zu einem wahren Rückzugsort.",
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

