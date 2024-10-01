"use client";

import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleGithubLogin = async () => {
    try {
      await signIn("github", { callbackUrl: "/profile" });
    } catch (error) {
      console.error("GitHub login failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/profile" });
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="z-10 w-full max-w-md"
    >
      <Card className="border-gray-700 bg-gray-800">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-center text-2xl font-bold text-transparent">
            Login to ShortLink
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Choose your preferred login method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGithubLogin}
            variant="outline"
            className="w-full border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
          >
            <Github className="mr-2 h-5 w-5" /> Continue with GitHub
          </Button>
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
          >
            <Mail className="mr-2 h-5 w-5" /> Continue with Google
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
