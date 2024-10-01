"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, LogOut, Link as LinkIcon, Plus, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  createShortLink,
  deleteShortLink,
  getUrlsByUserId,
} from "~/lib/urlService";
import ProgressBar from "~/components/progress-bar";
import UrlInputForm from "~/components/add-url-fotm";
import ShortLinksList from "~/components/short-link-item";
import ShortLinkItem from "~/components/short-link-item";

type ShortLink = {
  id: string;
  targetUrl: string;
  slug: string;
};

const MAX_LINKS = 3;

export default function ProfilePage() {
  const session = useSession();
  const router = useRouter();

  const [shortLinks, setShortLinks] = useState<ShortLink[]>([]);
  const [newOriginalUrl, setNewOriginalUrl] = useState("");
  const [newShortUrl, setNewShortUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/");
    } else if (session.status === "authenticated") {
      getUrlsByUserId(session.data.user.id)
        .then(setShortLinks)
        .catch((error: unknown) => {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
        });
    }
  }, [session, router]);

  const addShortLink = async () => {
    if (newOriginalUrl && newShortUrl && session.data?.user?.id) {
      try {
        await createShortLink(
          session.data.user.id,
          newOriginalUrl,
          newShortUrl,
        );
        setShortLinks([
          ...shortLinks,
          {
            id: Date.now().toString(),
            targetUrl: newOriginalUrl,
            slug: newShortUrl,
          },
        ]);
        setNewOriginalUrl("");
        setNewShortUrl("");
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }
  };

  const deleteShortLinkHandler = async (id: string) => {
    await deleteShortLink(id);
    setShortLinks(shortLinks.filter((link) => link.id !== id));
  };

  return (
    <main className="container m-auto px-4 py-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-2xl font-bold text-transparent">
                Profile Information
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <User className="h-12 w-12 text-green-500" />
              <div>
                <p className="text-lg font-semibold text-gray-300">
                  {session.data?.user.name ?? "Name unavailable"}
                </p>
                <p className="text-gray-400">
                  {session.data?.user.email ?? "Email unavailable"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-2xl font-bold text-transparent">
              Your Short Links
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage your custom short links here. (Max {MAX_LINKS} links)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <ProgressBar
              linksLength={shortLinks.length}
              MAX_LINKS={MAX_LINKS}
            />
            {error && <p className="text-red-500">{error}</p>}
            <UrlInputForm
              newOriginalUrl={newOriginalUrl}
              setNewOriginalUrl={setNewOriginalUrl}
              newShortUrl={newShortUrl}
              setNewShortUrl={setNewShortUrl}
            />
            <Button
              onClick={addShortLink}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-black hover:from-green-500 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={shortLinks.length >= MAX_LINKS}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Short Link
            </Button>
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-4">
              {shortLinks.map((link) => (
                <ShortLinkItem
                  key={link.id}
                  link={link}
                  deleteShortLinkHandler={deleteShortLinkHandler}
                />
              ))}
            </div>
          </CardFooter>
        </Card>
      </motion.section>
    </main>
  );
}
