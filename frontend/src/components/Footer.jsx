import React from "react"
import { Link } from "react-router-dom"
import { Building, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 border-t border-gray-700">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-white">
              <Building className="h-6 w-6" />
              <span className="text-xl">B2B Connect</span>
            </Link>
            <p className="text-sm">
              Connecting businesses worldwide with reliable suppliers and quality products.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <button
                  key={index}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-700 transition"
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{Icon.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {["about", "services", "industries", "contact", "blog"].map((path, i) => (
                <Link
                  key={i}
                  to={`/${path}`}
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  {path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ') + (path === 'about' ? ' Us' : '')}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <span className="text-sm text-gray-400">
                  123 Business Avenue, Suite 500, New York, NY 10001
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-400">info@b2bconnect.com</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-sm text-gray-400">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-400">© 2023 B2B Connect. All rights reserved.</p>
            <nav className="flex gap-4">
              {["terms", "privacy", "cookies"].map((path, i) => (
                <Link
                  key={i}
                  to={`/${path}`}
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  {path.replace(/^\w/, (c) => c.toUpperCase())} Policy
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
