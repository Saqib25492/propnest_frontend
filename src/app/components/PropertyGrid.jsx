import { MapPin } from "lucide-react"

const dummyProperties = [
  {
    title: "Modern Family Home",
    address: "123 Maple Street",
    price: 4500,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    title: "Downtown Apartment",
    address: "456 City Ave",
    price: 3200,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
  },
  {
    title: "Luxury Villa",
    address: "789 Palm Drive",
    price: 9000,
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
  },
]

export default function PropertyGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">Featured Properties</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {dummyProperties.map((prop, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all border"
            >
              <img
                src={prop.image}
                alt={prop.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{prop.title}</h3>
                  <span className="text-sm font-bold text-indigo-600">
                    ${prop.price}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-1" />
                  {prop.address}
                </div>
                <button className="mt-3 w-full py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
