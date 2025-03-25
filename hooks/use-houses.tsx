"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import type { RoomProps } from "@/components/room-card"

// Sample room data (same as in rooms/page.tsx)
const initialHousesData: RoomProps[] = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  name: `${["Deluxe", "Premium", "Luxury", "Standard"][i % 4]} ${["Cottage", "Villa", "House", "Suite"][i % 4]} ${i + 1}`,
  description: `A beautiful ${["cozy", "spacious", "elegant", "charming"][i % 4]} accommodation with ${(i % 3) + 2} bedrooms and modern amenities. Perfect for a relaxing getaway in the countryside.`,
  capacity: (i % 3) + 2, // 2, 3, or 4 people
  price: 150 + ((i * 10) % 200),
  image: `/placeholder.svg?height=400&width=600&text=House ${i + 1}`,
  dogsAllowed: i % 3 === 0, // Every 3rd room allows dogs
  seaView: i % 4 === 0, // Every 4th room has sea view
  amenities: [
    "WiFi",
    "Coffee Machine",
    "TV",
    ...(i % 2 === 0 ? ["Fireplace"] : []),
    ...(i % 5 === 0 ? ["Private Garden"] : []),
    ...(i % 7 === 0 ? ["Balcony"] : []),
  ],
}))

interface HousesContextType {
  houses: RoomProps[]
  loading: boolean
  updateHouse: (house: RoomProps) => Promise<void>
  deleteHouse: (id: number) => Promise<void>
  addHouse: (house: Omit<RoomProps, "id">) => Promise<void>
}

const HousesContext = createContext<HousesContextType | undefined>(undefined)

export function HousesProvider({ children }: { children: React.ReactNode }) {
  const [houses, setHouses] = useState<RoomProps[]>([])
  const [loading, setLoading] = useState(true)

  // Load houses from localStorage or use initial data
  useEffect(() => {
    const loadHouses = async () => {
      try {
        const savedHouses = localStorage.getItem("houses")
        if (savedHouses) {
          setHouses(JSON.parse(savedHouses))
        } else {
          // Use initial data if nothing in localStorage
          setHouses(initialHousesData)
          localStorage.setItem("houses", JSON.stringify(initialHousesData))
        }
      } catch (error) {
        console.error("Failed to load houses:", error)
        setHouses(initialHousesData)
      } finally {
        setLoading(false)
      }
    }

    loadHouses()
  }, [])

  // Save houses to localStorage whenever they change
  useEffect(() => {
    if (houses.length > 0 && !loading) {
      localStorage.setItem("houses", JSON.stringify(houses))
    }
  }, [houses, loading])

  // Make sure the updateHouse function properly updates the state and localStorage
  const updateHouse = async (updatedHouse: RoomProps) => {
    return new Promise<void>((resolve, reject) => {
      try {
        setHouses((prevHouses) => {
          const newHouses = prevHouses.map((house) => (house.id === updatedHouse.id ? updatedHouse : house))
          // Immediately update localStorage to ensure persistence
          localStorage.setItem("houses", JSON.stringify(newHouses))
          return newHouses
        })
        // Add a small delay to simulate API call and ensure UI updates
        setTimeout(() => resolve(), 300)
      } catch (error) {
        console.error("Failed to update house:", error)
        reject(error)
      }
    })
  }

  const deleteHouse = async (id: number) => {
    return new Promise<void>((resolve, reject) => {
      try {
        setHouses((prevHouses) => prevHouses.filter((house) => house.id !== id))
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  const addHouse = async (newHouse: Omit<RoomProps, "id">) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const maxId = Math.max(...houses.map((house) => house.id), 0)
        const houseWithId = { ...newHouse, id: maxId + 1 }
        setHouses((prevHouses) => [...prevHouses, houseWithId as RoomProps])
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  return (
    <HousesContext.Provider value={{ houses, loading, updateHouse, deleteHouse, addHouse }}>
      {children}
    </HousesContext.Provider>
  )
}

export function useHouses() {
  const context = useContext(HousesContext)
  if (context === undefined) {
    throw new Error("useHouses must be used within a HousesProvider")
  }
  return context
}

