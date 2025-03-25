"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export function MeetingsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image src="/placeholder.svg?height=600&width=800" alt="Meeting venue" fill className="object-cover" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-4 sm:mb-6">{t("meetingsTitle")}</h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">{t("meetingsDescription")}</p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
              <Link href="/meetings">{t("discoverMore")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

