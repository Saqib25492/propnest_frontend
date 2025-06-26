import { BadgeCheck, MapPin, Zap, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: <BadgeCheck className="w-6 h-6 text-indigo-600" />,
    title: "Verified Listings",
    desc: "Every property is agent-verified for trust & quality.",
  },
  {
    icon: <Tag className="w-6 h-6 text-indigo-600" />,
    title: "Best Prices",
    desc: "Find competitive market rates across all listings.",
  },
  {
    icon: <MapPin className="w-6 h-6 text-indigo-600" />,
    title: "Prime Locations",
    desc: "Discover properties in top neighborhoods and cities.",
  },
  {
    icon: <Zap className="w-6 h-6 text-indigo-600" />,
    title: "Fast Search",
    desc: "Search and filter properties instantly with smart tools.",
  },
]

export default function FeatureCards() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {features.map((f, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-start gap-4">
                {f.icon}
                <h4 className="text-lg font-semibold">{f.title}</h4>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
