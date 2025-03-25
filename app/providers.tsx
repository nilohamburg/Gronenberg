"use client"

import type React from "react"

import { AdminAuthProvider } from "@/hooks/use-admin-auth"
import { HousesProvider } from "@/hooks/use-houses"
import { BookingProvider } from "@/contexts/booking-context"
import { BookingAdminProvider } from "@/contexts/booking-admin-context"
import { UsersProvider } from "@/contexts/users-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <HousesProvider>
        <BookingProvider>
          <BookingAdminProvider>
            <UsersProvider>{children}</UsersProvider>
          </BookingAdminProvider>
        </BookingProvider>
      </HousesProvider>
    </AdminAuthProvider>
  )
}

