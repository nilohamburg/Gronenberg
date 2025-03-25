"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export interface UserProps {
  id: string
  name: string
  email: string
  role: "admin" | "staff" | "guest"
  status: "active" | "inactive"
  lastLogin: Date | null
  createdAt: Date
}

interface UsersContextType {
  users: UserProps[]
  loading: boolean
  updateUser: (user: UserProps) => Promise<void>
  deleteUser: (id: string) => Promise<void>
  addUser: (user: Omit<UserProps, "id" | "createdAt">) => Promise<void>
}

const UsersContext = createContext<UsersContextType | undefined>(undefined)

// Generate sample user data
const generateSampleUsers = (): UserProps[] => {
  const roles: ("admin" | "staff" | "guest")[] = ["admin", "staff", "guest"]
  const statuses: ("active" | "inactive")[] = ["active", "inactive"]

  // Generate 20 random users
  return Array.from({ length: 20 }, (_, i) => {
    const id = `U${100000 + i}`
    const today = new Date()

    // Random created date between 365 days ago and today
    const createdAtOffset = Math.floor(Math.random() * 365)
    const createdAt = new Date(today)
    createdAt.setDate(today.getDate() - createdAtOffset)

    // Random last login date (80% chance of having logged in)
    const hasLoggedIn = Math.random() < 0.8
    let lastLogin = null
    if (hasLoggedIn) {
      const lastLoginOffset = Math.floor(Math.random() * createdAtOffset)
      lastLogin = new Date(today)
      lastLogin.setDate(today.getDate() - lastLoginOffset)
    }

    // Assign role (more guests than staff or admins)
    let role: "admin" | "staff" | "guest" = "guest"
    if (i === 0) {
      role = "admin" // Ensure at least one admin
    } else if (i < 3) {
      role = "staff" // A few staff members
    } else {
      role = roles[Math.floor(Math.random() * roles.length)]
    }

    // Assign status (mostly active)
    const status = Math.random() < 0.9 ? "active" : "inactive"

    return {
      id,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role,
      status,
      lastLogin,
      createdAt,
    }
  })
}

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UserProps[]>([])
  const [loading, setLoading] = useState(true)

  // Load users from localStorage or generate sample data
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const savedUsers = localStorage.getItem("adminUsers")
        if (savedUsers) {
          // Parse the JSON and convert date strings back to Date objects
          const parsedUsers = JSON.parse(savedUsers, (key, value) => {
            if (key === "lastLogin" && value) {
              return new Date(value)
            }
            if (key === "createdAt") {
              return new Date(value)
            }
            return value
          })
          setUsers(parsedUsers)
        } else {
          // Generate sample data if nothing in localStorage
          const sampleUsers = generateSampleUsers()
          setUsers(sampleUsers)
          saveUsersToLocalStorage(sampleUsers)
        }
      } catch (error) {
        console.error("Failed to load users:", error)
        const sampleUsers = generateSampleUsers()
        setUsers(sampleUsers)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Helper function to save users to localStorage
  const saveUsersToLocalStorage = useCallback((usersToSave: UserProps[]) => {
    try {
      localStorage.setItem("adminUsers", JSON.stringify(usersToSave))
    } catch (error) {
      console.error("Failed to save users to localStorage:", error)
    }
  }, [])

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0 && !loading) {
      saveUsersToLocalStorage(users)
    }
  }, [users, loading, saveUsersToLocalStorage])

  // Update a user
  const updateUser = async (updatedUser: UserProps) => {
    return new Promise<void>((resolve, reject) => {
      try {
        setUsers((prevUsers) => {
          const newUsers = prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
          return newUsers
        })
        resolve()
      } catch (error) {
        console.error("Failed to update user:", error)
        reject(error)
      }
    })
  }

  // Delete a user
  const deleteUser = async (id: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  // Add a new user
  const addUser = async (newUser: Omit<UserProps, "id" | "createdAt">) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const userWithId: UserProps = {
          ...newUser,
          id: `U${Math.floor(100000 + Math.random() * 900000)}`,
          createdAt: new Date(),
        }
        setUsers((prevUsers) => [...prevUsers, userWithId])
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  return (
    <UsersContext.Provider value={{ users, loading, updateUser, deleteUser, addUser }}>
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext)
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider")
  }
  return context
}

