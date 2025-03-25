"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export interface AdminBookingProps {
  id: string
  guestName: string
  guestEmail: string
  roomId: number
  roomName: string
  checkIn: Date
  checkOut: Date
  guests: number
  totalPrice: number
  status: "confirmed" | "pending" | "cancelled" | "completed"
  paymentStatus: "paid" | "pending" | "refunded"
  createdAt: Date
}

interface BookingAdminContextType {
  bookings: AdminBookingProps[]
  loading: boolean
  updateBooking: (booking: AdminBookingProps) => Promise<void>
  deleteBooking: (id: string) => Promise<void>
  addBooking: (booking: Omit<AdminBookingProps, "id" | "createdAt">) => Promise<void>
}

const BookingAdminContext = createContext<BookingAdminContextType | undefined>(undefined)

// Generate sample booking data
const generateSampleBookings = (): AdminBookingProps[] => {
  const statuses: ("confirmed" | "pending" | "cancelled" | "completed")[] = [
    "confirmed",
    "pending",
    "cancelled",
    "completed",
  ]
  const paymentStatuses: ("paid" | "pending" | "refunded")[] = ["paid", "pending", "refunded"]

  // Generate 50 random bookings
  return Array.from({ length: 50 }, (_, i) => {
    const id = `BK${100000 + i}`
    const today = new Date()

    // Random check-in date between 30 days ago and 60 days in future
    const checkInOffset = Math.floor(Math.random() * 90) - 30
    const checkIn = new Date(today)
    checkIn.setDate(today.getDate() + checkInOffset)

    // Random stay length between 1-7 days
    const stayLength = Math.floor(Math.random() * 7) + 1
    const checkOut = new Date(checkIn)
    checkOut.setDate(checkIn.getDate() + stayLength)

    // Random room ID between 1-32
    const roomId = Math.floor(Math.random() * 32) + 1

    // Random number of guests between 1-4
    const guests = Math.floor(Math.random() * 4) + 1

    // Random price between €100-€500
    const totalPrice = Math.floor(Math.random() * 400) + 100

    // Random status and payment status
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)]

    // Random created date between 60 days ago and today
    const createdAtOffset = Math.floor(Math.random() * 60)
    const createdAt = new Date(today)
    createdAt.setDate(today.getDate() - createdAtOffset)

    return {
      id,
      guestName: `Guest ${i + 1}`,
      guestEmail: `guest${i + 1}@example.com`,
      roomId,
      roomName: `Room ${roomId}`,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status,
      paymentStatus,
      createdAt,
    }
  })
}

export function BookingAdminProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<AdminBookingProps[]>([])
  const [loading, setLoading] = useState(true)

  // Load bookings from localStorage or generate sample data
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const savedBookings = localStorage.getItem("adminBookings")
        if (savedBookings) {
          // Parse the JSON and convert date strings back to Date objects
          const parsedBookings = JSON.parse(savedBookings, (key, value) => {
            if (key === "checkIn" || key === "checkOut" || key === "createdAt") {
              return new Date(value)
            }
            return value
          })
          setBookings(parsedBookings)
        } else {
          // Generate sample data if nothing in localStorage
          const sampleBookings = generateSampleBookings()
          setBookings(sampleBookings)
          saveBookingsToLocalStorage(sampleBookings)
        }
      } catch (error) {
        console.error("Failed to load bookings:", error)
        const sampleBookings = generateSampleBookings()
        setBookings(sampleBookings)
      } finally {
        setLoading(false)
      }
    }

    loadBookings()
  }, [])

  // Helper function to save bookings to localStorage
  const saveBookingsToLocalStorage = useCallback((bookingsToSave: AdminBookingProps[]) => {
    try {
      localStorage.setItem("adminBookings", JSON.stringify(bookingsToSave))
    } catch (error) {
      console.error("Failed to save bookings to localStorage:", error)
    }
  }, [])

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    if (bookings.length > 0 && !loading) {
      saveBookingsToLocalStorage(bookings)
    }
  }, [bookings, loading, saveBookingsToLocalStorage])

  // Update a booking
  const updateBooking = async (updatedBooking: AdminBookingProps) => {
    return new Promise<void>((resolve, reject) => {
      try {
        setBookings((prevBookings) => {
          const newBookings = prevBookings.map((booking) =>
            booking.id === updatedBooking.id ? updatedBooking : booking,
          )
          return newBookings
        })
        resolve()
      } catch (error) {
        console.error("Failed to update booking:", error)
        reject(error)
      }
    })
  }

  // Delete a booking
  const deleteBooking = async (id: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id))
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  // Add a new booking
  const addBooking = async (newBooking: Omit<AdminBookingProps, "id" | "createdAt">) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const bookingWithId: AdminBookingProps = {
          ...newBooking,
          id: `BK${Math.floor(100000 + Math.random() * 900000)}`,
          createdAt: new Date(),
        }
        setBookings((prevBookings) => [...prevBookings, bookingWithId])
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  return (
    <BookingAdminContext.Provider value={{ bookings, loading, updateBooking, deleteBooking, addBooking }}>
      {children}
    </BookingAdminContext.Provider>
  )
}

export function useBookingAdmin() {
  const context = useContext(BookingAdminContext)
  if (context === undefined) {
    throw new Error("useBookingAdmin must be used within a BookingAdminProvider")
  }
  return context
}

