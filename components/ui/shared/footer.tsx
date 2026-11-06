import Link from "next/link";
import {
  Mountain,
//   Facebook,
//   Instagram,
//   Twitter,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#101d1b] text-white">

      {/* TOP FOOTER */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* BRAND */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#b5e853] text-[#101d1b]">
              <Mountain size={27} />
            </div>

            <div>
              <h2 className="text-2xl font-black">
                Gear<span className="text-[#b5e853]">-up</span>
              </h2>
              <p className="text-[9px] uppercase tracking-[3px] text-gray-400">
                Rent. Explore. Repeat.
              </p>
            </div>
          </Link>

          <p className="mt-6 max-w-xs text-sm leading-7 text-gray-400">
            Your adventure starts with the right equipment.
            Discover, rent, and explore without limits with Gear-up.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-lg bg-white/10 p-3 transition hover:bg-[#b5e853] hover:text-[#101d1b]"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="rounded-lg bg-white/10 p-3 transition hover:bg-[#b5e853] hover:text-[#101d1b]"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="rounded-lg bg-white/10 p-3 transition hover:bg-[#b5e853] hover:text-[#101d1b]"
            >
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="mb-6 text-lg font-bold">
            Quick Links
          </h3>

          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/" className="transition hover:text-[#b5e853]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/Gears" className="transition hover:text-[#b5e853]">
                Explore Gears
              </Link>
            </li>
            <li>
              <Link href="/Reviews" className="transition hover:text-[#b5e853]">
                Customer Reviews
              </Link>
            </li>
            <li>
              <Link href="/Myrentals" className="transition hover:text-[#b5e853]">
                My Rentals
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition hover:text-[#b5e853]">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* ACCOUNT */}
        <div>
          <h3 className="mb-6 text-lg font-bold">
            My Account
          </h3>

          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/login" className="transition hover:text-[#b5e853]">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="transition hover:text-[#b5e853]">
                Create Account
              </Link>
            </li>
            <li>
              <Link href="/profile" className="transition hover:text-[#b5e853]">
                My Profile
              </Link>
            </li>
            <li>
              <Link href="/settings" className="transition hover:text-[#b5e853]">
                Settings
              </Link>
            </li>
            <li>
              <Link href="/billing" className="transition hover:text-[#b5e853]">
                Billing
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="mb-6 text-lg font-bold">
            Contact Us
          </h3>

          <div className="space-y-5 text-sm text-gray-400">

            <div className="flex items-center gap-3">
              <Mail className="shrink-0 text-[#b5e853]" size={19} />
              <a
                href="mailto:support@gearup.com"
                className="transition hover:text-[#b5e853]"
              >
                support@gearup.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="shrink-0 text-[#b5e853]" size={19} />
              <span>Contact Support</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="shrink-0 text-[#b5e853]" size={19} />
              <span>Available Online Worldwide</span>
            </div>

          </div>

          
        </div>

      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:flex-row">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Gear-up. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <Link
              href="/privacy"
              className="transition hover:text-[#b5e853]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-[#b5e853]"
            >
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;