export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-16">
      <div className="container mx-auto px-6 grid gap-8 md:grid-cols-4 sm:grid-cols-2">
        {/* Brand Info */}
        <div>
          <h3 className="text-xl font-bold mb-2">PropNest</h3>
          <p className="text-sm text-gray-400">
            Your trusted destination for modern, verified property rentals across Pakistan.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><a href="#">Home</a></li>
            <li><a href="#">Properties</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Email: support@propnest.pk</li>
            <li>Phone: +92 300 1234567</li>
            <li>Location: Karachi, Pakistan</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-2">Stay Updated</h4>
          <p className="text-sm text-gray-400 mb-3">Get updates on new listings and offers.</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-md bg-white text-black text-sm mb-2"
          />
          <button className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-700">
            Subscribe
          </button>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} PropNest. All rights reserved.
      </div>
    </footer>
  )
}
