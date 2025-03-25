"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { SuperMenu } from "@/components/super-menu"

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "EN" ? "DE" : "EN")
  }, [language, setLanguage])

  // Mobile navigation items
  const mobileNavItems = [
    {
      label: t("home"),
      href: "/",
    },
    {
      label: t("rooms"),
      href: "/rooms",
    },
    {
      label: t("dining"),
      href: "/dining",
    },
    {
      label: t("spa"),
      href: "/spa",
    },
    {
      label: t("meetings"),
      href: "/meetings",
    },
    {
      label: t("about"),
      href: "/about",
    },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-1" : "bg-transparent py-2",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="relative z-20">
            <h1
              className={cn(
                "font-playfair text-xl font-bold transition-colors",
                scrolled ? "text-gray-900" : "text-white",
              )}
            >
              Gronenberger Mühle
            </h1>
          </Link>

          {/* Desktop Navigation - Super Menu */}
          <div className="hidden lg:flex items-center justify-center flex-1 ml-16 relative">
            <SuperMenu scrolled={scrolled} />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "font-medium transition-colors p-1.5",
                scrolled ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-white hover:bg-white/10",
              )}
              onClick={toggleLanguage}
            >
              <Globe className="h-4 w-4 mr-1" />
              {language}
            </Button>

            {/* Book Now Button */}
            <Link href="/rooms">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground hidden sm:inline-flex"
              >
                {t("bookNow")}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn("lg:hidden relative z-20", scrolled ? "text-gray-700" : "text-white")}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-10 transform transition-transform duration-300 lg:hidden overflow-auto pt-16",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {mobileNavItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-3">
                <Link
                  href={item.href}
                  className={cn("text-base font-medium", pathname === item.href ? "text-primary" : "text-gray-800")}
                >
                  {item.label}
                </Link>
              </div>
            ))}

            {/* Mobile Book Now Button */}
            <div className="pt-2 mt-2">
              <Link href="/rooms" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90">{t("bookNow")}</Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

