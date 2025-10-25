"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "@/components/atoms/Image";
import {
  TagLineLogo,
  MilitryStarLogo,
  HamburgerMenu,
} from "@/assets/svg/index";
import Button from "@/components/atoms/Button";

export default function Navbar() {
  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Promotions", href: "/promotions" },
    { name: "Calculator", href: "/calculator" },
    { name: "About ECP", href: "/about-ecp" },
    { name: "Contact US", href: "/contact-us" },
    { name: "Log In", href: "/login" },
  ];

  const [selectedBTN, setSelectedBTN] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="navbar shadow-md flex px-4 md:px-16 items-center justify-between relative ">
      <div className="flex items-center gap-4 md:gap-6 py-3.5 w-full">
      <Link href="/">
        <Image src={MilitryStarLogo} alt="Logo" className="cursor-pointer" />
      </Link>
      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href}>
              <span
                className={`text-(--text) hover:text-blue-600 transition ${
                  selectedBTN === link.name ? "font-extrabold" : ""
                }`}
                onClick={() => setSelectedBTN(link.name)}
                style={{ cursor: "pointer" }}
              >
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Image
      src={TagLineLogo}
      alt="Tag-line-Logo"
      className="hidden md:block"
    />
    {/* Hamburger Icon for Mobile */}
    <Button
      className="md:hidden p-2 !outline-none bg-transparent"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Open menu"
    >
      <Image src={HamburgerMenu} alt="Menu" />
    </Button>
    {/* Mobile Menu */}
    {menuOpen && (
      <div className="absolute top-full left-0 w-full bg-white shadow-md z-50 md:hidden">
        <ul className="flex flex-col gap-4 p-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>
                <span
                  className={`block text-gray-700 hover:text-blue-600 transition ${
                    selectedBTN === link.name ? "font-extrabold" : ""
                  }`}
                  onClick={() => {
                    setSelectedBTN(link.name);
                    setMenuOpen(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </nav>
);

}
