import { Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="relative border-t border-[var(--color-border-glass)] bg-[var(--color-bg-deep)]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-emerald)] flex items-center justify-center">
                <Shield size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-[#0f172a]">Car<span className="gradient-text">Saga</span></span>
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              AI-powered used car verification.
              Know the truth before you own it.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: 'Product',
              links: [
                { label: 'Features', href: '#features' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'API Docs', href: '#' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Careers', href: '#' },
              ],
            },
            {
              title: 'Legal',
              links: [
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Contact', href: '#' },
              ],
            },
          ].map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-extrabold text-[#0f172a] mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[#0f172a] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-border-glass)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} CarSaga. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Built with 🧠 AI for the used car revolution.
          </p>
        </div>
      </div>
    </footer>
  )
}
