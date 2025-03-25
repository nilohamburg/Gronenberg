"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "DE" ? "EN" : "DE")
  }

  return (
    <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10" onClick={toggleLanguage}>
      {language}
    </Button>
  )
}

