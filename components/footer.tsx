import { EduibLogo } from "./icons"
import Link from "next/link"

const footerLinks = {
  subjects: [
    { name: "Mathematics", href: "/subjects/mathematics" },
    { name: "Biology", href: "/subjects/biology" },
    { name: "Chemistry", href: "/subjects/chemistry" },
    { name: "Physics", href: "/subjects/physics" },
    { name: "Psychology", href: "/subjects/psychology" },
    { name: "Economics", href: "/subjects/economics" },
    { name: "Business Management", href: "/subjects/business" },
    { name: "Environmental Systems and Societies", href: "/subjects/ess" },
    { name: "English", href: "/subjects/english" },
    { name: "Previous Science Curriculum", href: "/subjects/previous-science" },
  ],
  help: [
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/faqs" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Our Roadmap", href: "/roadmap" },
    { name: "Share an idea", href: "/share" },
  ],
  general: [
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Membership", href: "/membership" },
    { name: "RV Gold Pricing", href: "/pricing" },
    { name: "Schools", href: "/schools" },
    { name: "Careers", href: "/careers" },
    { name: "Study Sessions", href: "/study-sessions" },
  ],
  contact: [{ name: "Contact Us", href: "/contact" }],
}

export function Footer() {
  return (
    <footer className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo and Disclaimer Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <div className="[&_path]:fill-current">
                <EduibLogo />
              </div>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed">
              All content on this website has been developed independently from and is not endorsed by the International
              Baccalaureate Organization. International Baccalaureate and IB are registered trademarks owned by the
              International Baccalaureate Organization.
            </p>
            <p className="text-sm opacity-60">Copyright - Eduib 2024</p>
          </div>

          {/* Subjects Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Subjects</h3>
            <ul className="space-y-2">
              {footerLinks.subjects.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm opacity-80 hover:text-[#16AB8E] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Help</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm opacity-80 hover:text-[#16AB8E] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* General and Contact Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">General</h3>
              <ul className="space-y-2">
                {footerLinks.general.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm opacity-80 hover:text-[#16AB8E] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Contact</h3>
              <ul className="space-y-2">
                {footerLinks.contact.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm opacity-80 hover:text-[#16AB8E] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
