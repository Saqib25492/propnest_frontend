export default function Testimonials() {
  const testimonials = [
    {
      name: "Ayesha Khan",
      role: "Karachi, PK",
      quote: "PropNest made it incredibly easy to find and book my flat. Everything was verified and transparent!",
    },
    {
      name: "Zain Ahmed",
      role: "Lahore, PK",
      quote: "Loved the instant booking. No agents, no delays. Just found what I liked and moved in!",
    },
    {
      name: "Fatima Raza",
      role: "Islamabad, PK",
      quote: "Excellent support team. They guided me through every step and ensured I felt safe with the deal.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Hear from renters who’ve found their perfect home on PropNest.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
              <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
              <h4 className="font-semibold text-gray-900">{t.name}</h4>
              <span className="text-sm text-gray-500">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
