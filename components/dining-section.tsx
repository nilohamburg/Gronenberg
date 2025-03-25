"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export function DiningSection() {
  const { t } = useLanguage()

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Fine dining restaurant"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-4 sm:mb-6">{t("diningTitle")}</h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">{t("diningDescription")}</p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-playfair">Mühle Restaurant</h3>
              <h3 className="text-xl sm:text-2xl font-playfair">The Lounge</h3>
              <h3 className="text-xl sm:text-2xl font-playfair">Garden Terrace</h3>
              <h3 className="text-xl sm:text-2xl font-playfair">Wine Cellar</h3>
            </div>

            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
              <Link href="/dining">{t("showAll")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

