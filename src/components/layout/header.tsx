"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import SignInButton from "../sign-in-button";
export default function Header() {
  return (
    <header className="container relative z-10 mx-auto flex items-center justify-between px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-2xl font-bold text-transparent">
          ShortLink
        </h1>
      </motion.div>
      <nav className="flex items-center space-x-4">
        <motion.a
          href="#features"
          className="text-sm transition-colors hover:text-green-500"
          whileHover={{ scale: 1.05 }}
        >
          Features
        </motion.a>
        <motion.a
          href="#how-it-works"
          className="text-sm transition-colors hover:text-green-500"
          whileHover={{ scale: 1.05 }}
        >
          How It Works
        </motion.a>
        <SignInButton title="Login" size="sm" />
      </nav>
    </header>
  );
}
