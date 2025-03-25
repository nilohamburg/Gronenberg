"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-4 sm:mb-6">{t("aboutTitle")}</h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">{t("aboutDescription")}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div>
                <p className="flex items-center gap-2">
                  <span className="text-primary">✉</span>
                  info@gronenberger-muhle.com
                </p>
              </div>
              <div>
                <p className="flex items-center gap-2">
                  <span className="text-primary">✆</span>
                  +49 123 456 7890
                </p>
              </div>
              <div>
                <p className="flex items-center gap-2">
                  <span className="text-primary">⌖</span>
                  Gronenberg, Germany
                </p>
              </div>
            </div>

            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
              <Link href="/about">{t("hotelDetails")}</Link>
            </Button>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image src="/placeholder.svg?height=600&width=800" alt="Hotel exterior" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

