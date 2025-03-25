import { Navbar } from "@/components/navbar"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"

export default function MeetingsPage() {
  const venues = [
    {
      name: "Grand Ballroom",
      capacity: "Up to 200 guests",
      size: "300 sqm",
      description:
        "Our largest venue, perfect for conferences, galas, and large celebrations. Features state-of-the-art audiovisual equipment and can be divided into smaller sections.",
      image: "/placeholder.svg?height=400&width=600&text=Grand Ballroom",
    },
    {
      name: "Garden Pavilion",
      capacity: "Up to 80 guests",
      size: "150 sqm",
      description:
        "A bright, airy space with floor-to-ceiling windows overlooking our gardens. Ideal for daytime events and intimate weddings.",
      image: "/placeholder.svg?height=400&width=600&text=Garden Pavilion",
    },
    {
      name: "Executive Boardroom",
      capacity: "Up to 20 guests",
      size: "60 sqm",
      description:
        "A sophisticated setting for board meetings and small corporate gatherings, equipped with the latest technology and comfortable seating.",
      image: "/placeholder.svg?height=400&width=600&text=Executive Boardroom",
    },
    {
      name: "Wine Cellar",
      capacity: "Up to 30 guests",
      size: "80 sqm",
      description:
        "A unique venue in our historic wine cellar, perfect for intimate dinners, wine tastings, and special celebrations.",
      image: "/placeholder.svg?height=400&width=600&text=Wine Cellar",
    },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Meetings & Events"
        description="Elevate your business and special occasions with our exceptional venues"
        image="/images/meetings-bg.jpg"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-playfair mb-4">Exceptional Venues for Every Occasion</h2>
          <p className="text-lg text-gray-700">
            Uplift your business to new heights of quality, with impeccable services, world-class cuisine, and
            sophisticated venues. Plan your corporate events, conferences, team buildings, incentives, and weddings with
            state-of-the-art technology in the inspiring and pristine countryside setting.
          </p>
        </div>

        {/* Event Venues */}
        <div className="mb-20">
          <h2 className="text-3xl font-playfair text-center mb-12">Event Venues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {venues.map((venue, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image src={venue.image || "/placeholder.svg"} alt={venue.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-playfair mb-2">{venue.name}</h3>
                  <div className="flex gap-4 text-sm text-gray-500 mb-3">
                    <p>{venue.capacity}</p>
                    <p>{venue.size}</p>
                  </div>
                  <p className="text-gray-600 mb-4">{venue.description}</p>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Types */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair mb-6">Corporate Events</h2>
              <p className="text-gray-700 mb-6">
                From executive board meetings to large conferences, our venues provide the perfect setting for your
                corporate events. Our dedicated team ensures every detail is taken care of, allowing you to focus on
                your business objectives.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>State-of-the-art audiovisual equipment</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>High-speed WiFi throughout all venues</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Customizable catering options</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Dedicated event coordinator</span>
                </li>
              </ul>
              <Button>Request Proposal</Button>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600&text=Corporate Events"
                alt="Corporate Events"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Weddings"
                alt="Weddings"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-playfair mb-6">Weddings & Celebrations</h2>
              <p className="text-gray-700 mb-6">
                Create unforgettable memories in our picturesque setting. Whether you're planning an intimate gathering
                or a grand celebration, our venues provide the perfect backdrop for your special day.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Customizable wedding packages</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Indoor and outdoor ceremony locations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Expert wedding planners</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Gourmet dining options</span>
                </li>
              </ul>
              <Button>Download Brochure</Button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-playfair mb-4">Plan Your Event</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Our experienced event planning team is ready to help you create a memorable event tailored to your specific
            needs. Contact us today to discuss your requirements and request a personalized proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Contact Event Team</Button>
            <Button variant="outline" size="lg">
              Request Callback
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

