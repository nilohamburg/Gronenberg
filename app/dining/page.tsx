import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function DiningPage() {
  const restaurants = [
    {
      id: 1,
      name: "Mühle Restaurant",
      description:
        "Our signature restaurant offers a refined dining experience with a focus on local, seasonal ingredients. The menu showcases traditional German cuisine with a modern twist, prepared by our award-winning chef.",
      hours: "Breakfast: 7:00 - 10:30 | Dinner: 18:00 - 22:00",
      image: "/placeholder.svg?height=600&width=800&text=Mühle Restaurant",
    },
    {
      id: 2,
      name: "The Lounge",
      description:
        "A sophisticated space to enjoy light meals, afternoon tea, and cocktails. The Lounge offers a relaxed atmosphere with comfortable seating and panoramic views of the surrounding countryside.",
      hours: "Daily: 10:00 - 00:00",
      image: "/placeholder.svg?height=600&width=800&text=The Lounge",
    },
    {
      id: 3,
      name: "Garden Terrace",
      description:
        "Dine al fresco on our beautiful terrace surrounded by lush gardens. Enjoy a casual lunch or dinner while taking in the fresh air and scenic views. Weather permitting.",
      hours: "Lunch: 12:00 - 15:00 | Dinner: 18:00 - 21:30 (Summer Season)",
      image: "/placeholder.svg?height=600&width=800&text=Garden Terrace",
    },
    {
      id: 4,
      name: "Wine Cellar",
      description:
        "Our historic wine cellar houses an extensive collection of fine wines from around the world. Join us for wine tastings and special pairing dinners hosted by our sommelier.",
      hours: "Wine Tastings: By reservation only",
      image: "/placeholder.svg?height=600&width=800&text=Wine Cellar",
    },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Restaurants & Bars"
        description="Experience culinary excellence with our diverse dining options"
        image="/images/restaurant-bg.jpg"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-playfair mb-4">Culinary Excellence</h2>
          <p className="text-lg text-gray-700">
            Discover a tempting mix of traditional and cosmopolitan tastes with our renowned culinary touch. Experience
            a journey through flavors in our award-winning restaurants with a mix of gourmet cuisine, local delicacies,
            and international dishes. Relish fine wines and cocktails in our sophisticated settings.
          </p>
        </div>

        <div className="space-y-24">
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative h-80 w-full">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl font-playfair mb-4">{restaurant.name}</h3>
                <p className="text-gray-700 mb-4">{restaurant.description}</p>
                <p className="text-sm text-gray-500 mb-6">{restaurant.hours}</p>
                <div className="flex gap-4">
                  <Button>View Menu</Button>
                  <Button variant="outline">Reserve a Table</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}

