import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";

const footerLinks = {
  tastebite: [
    { name: "About us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
    { name: "Feedback", href: "/feedback" },
  ],
  legal: [
    { name: "Terms", href: "/terms" },
    { name: "Conditions", href: "/conditions" },
    { name: "Cookies", href: "/cookies" },
    { name: "Copyright", href: "/copyright" },
  ],
  social: [
    { name: "Facebook", href: "https://facebook.com", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    { name: "Youtube", href: "https://youtube.com", icon: Youtube },
  ],
};

export function Footer() {
  return (
    <footer className="border-t ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Logo />

            <p className="mt-4 text-sm text-muted-foreground">
              &quot;On the other hand, we denounce with righteous indignation
              and dislike men who are so beguiled and demoralized by the charms
              of pleasure of the moment&quot;
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tastebite</h3>
            <ul className="space-y-2">
              {footerLinks.tastebite.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Tastebite - All rights reserved
          </p>
          <div className="flex gap-4">
            {footerLinks.social.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-full border p-2 text-muted-foreground hover:border-primary hover:text-primary"
              >
                <link.icon className="h-4 w-4" />
                <span className="sr-only">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
