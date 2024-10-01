"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link as LinkIcon, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import SignInButton from "~/components/sign-in-button";
import ProfileButton from "~/components/profile-button";

export default function LandingPage() {
  const session = useSession();
  const controls = useAnimation();

  useEffect(() => {
    controls
      .start({
        opacity: [0, 1],
        y: [20, 0],
        transition: { duration: 0.8, ease: "easeOut" },
      })
      .catch((error) => {
        console.error("Animation failed:", error);
      });
  }, [controls]);

  return (
    <main>
      <section className="container relative z-10 mx-auto px-4 py-20 text-center">
        <motion.h2
          className="mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          Custom Short Links
          <br />
          for Your Brand
        </motion.h2>
        <motion.p
          className="mb-8 text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          Create memorable, branded short links that reflect your identity.
          Simplify your online presence with ShortLink.
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          {session.status === "authenticated" ? (
            <ProfileButton title="Your Profile" size="lg" />
          ) : (
            <SignInButton title="Get Started" size="lg">
              <ChevronRight className="ml-2 h-4 w-4" />
            </SignInButton>
          )}
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </motion.div>
      </section>

      <section id="features" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h3 className="mb-12 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-center text-3xl font-bold text-transparent">
            Custom Short Links
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Branded URLs",
                icon: LinkIcon,
                description:
                  "Create short links that include your brand name or relevant keywords.",
              },
              {
                title: "Memorable Links",
                icon: LinkIcon,
                description:
                  "Make your links easy to remember and share with custom slugs.",
              },
              {
                title: "Limited Offer",
                icon: LinkIcon,
                description:
                  "Create up to 3 custom short links for free. Perfect for your most important links.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-lg bg-gray-800 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ delay: index * 0.1 }}
              >
                <feature.icon className="mb-4 h-12 w-12 text-green-500" />
                <h4 className="mb-2 text-xl font-semibold">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h3 className="mb-12 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-center text-3xl font-bold text-transparent">
            How It Works
          </h3>
          <div className="flex flex-col items-center justify-center space-y-8">
            {[
              {
                step: 1,
                title: "Sign Up",
                description: "Create your free account in seconds.",
              },
              {
                step: 2,
                title: "Create Your Link",
                description:
                  "Enter your long URL and choose a custom short link.",
              },
              {
                step: 3,
                title: "Share and Track",
                description:
                  "Use your new short link and track its performance.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex max-w-sm flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ delay: index * 0.2 }}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h4 className="mb-2 text-xl font-semibold">{item.title}</h4>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h3
            className="mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
          >
            Ready to Create Your Custom Short Links?
          </motion.h3>
          <motion.p
            className="mb-8 text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
          >
            Sign up now and start creating up to 3 free custom short links for
            your brand.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={controls}>
            {session.status === "authenticated" ? (
              <ProfileButton title="Your URL's" size="lg" />
            ) : (
              <SignInButton size="lg" title="Sign Up Now - It's Free!" />
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
