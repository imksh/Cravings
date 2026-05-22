import React from "react";
import {  Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagramSquare,FaTwitter } from "react-icons/fa";

const footerLinks = {
  company: [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Careers",
      href: "/careers",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],

  customer: [
    {
      label: "Restaurants",
      href: "/restaurants",
    },
    {
      label: "Offers",
      href: "/offers",
    },
    {
      label: "Cart",
      href: "/cart",
    },
    {
      label: "Categories",
      href: "/categories",
    },
  ],

  support: [
    {
      label: "Help Center",
      href: "/help",
    },
    {
      label: "Terms & Conditions",
      href: "/terms",
    },
    {
      label: "Privacy Policy",
      href: "/privacy",
    },
    {
      label: "Refund Policy",
      href: "/refund-policy",
    },
  ],
};

const FooterSection = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-white">{title}</h3>

      <div className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="w-fit text-sm text-white/70 transition hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const CustomerFooter = () => {
  return (
    <footer className="mt-auto bg-[#111111] text-white">
      {/* TOP */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        {/* BRAND */}
        <div>
          <Link to="/" className="text-3xl font-extrabold tracking-tight">
            Cravings
          </Link>

          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
            Discover restaurants, order your favorite food, and get meals
            delivered fast with a clean and modern ordering experience.
          </p>

          {/* SOCIALS */}
          <div className="mt-6 flex items-center gap-3">
            <button className="rounded-full bg-white/10 p-3 text-white/80 transition hover:bg-(--primary) hover:text-white">
              <FaInstagramSquare size={18} />
            </button>

            <button className="rounded-full bg-white/10 p-3 text-white/80 transition hover:bg-(--primary) hover:text-white">
              <FaFacebook size={18} />
            </button>

            <button className="rounded-full bg-white/10 p-3 text-white/80 transition hover:bg-(--primary) hover:text-white">
              <FaTwitter size={18} />
            </button>
          </div>
        </div>

        {/* LINKS */}
        <FooterSection title="Company" links={footerLinks.company} />

        <FooterSection title="Explore" links={footerLinks.customer} />

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-bold text-white">Contact</h3>

          <div className="mt-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-white/10 p-2 text-(--primary)">
                <MapPin size={16} />
              </div>

              <p className="text-sm leading-6 text-white/70">
                City Center,
                <br />
                Downtown Street,
                <br />
                India
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/10 p-2 text-(--primary)">
                <Phone size={16} />
              </div>

              <a
                href="tel:+919999999999"
                className="text-sm text-white/70 transition hover:text-white"
              >
                +91 99999 99999
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/10 p-2 text-(--primary)">
                <Mail size={16} />
              </div>

              <a
                href="mailto:support@cravings.com"
                className="text-sm text-white/70 transition hover:text-white"
              >
                support@cravings.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-white/60 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Cravings. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-5">
            <Link to="/privacy" className="transition hover:text-white">
              Privacy
            </Link>

            <Link to="/terms" className="transition hover:text-white">
              Terms
            </Link>

            <Link to="/refund-policy" className="transition hover:text-white">
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;
