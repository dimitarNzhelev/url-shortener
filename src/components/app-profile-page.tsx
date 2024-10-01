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

type ShortLink = {
  id: string;
  targetUrl: string;
  slug: string;
};

const MAX_LINKS = 3;

export default function ProfilePageComp() {
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
      getUrlsByUserId(session.data.user.id).then(setShortLinks);
    }
  }, [session, router]);

  const addShortLink = async () => {
    if (newOriginalUrl && newShortUrl && session.data && session.data.user.id) {
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

  const progressPercentage = (shortLinks.length / MAX_LINKS) * 100;

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
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Links used: {shortLinks.length}/{MAX_LINKS}
                </span>
                <span
                  className={
                    progressPercentage === 100
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {progressPercentage === 100
                    ? "Limit reached"
                    : `${MAX_LINKS - shortLinks.length} remaining`}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-in-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="originalUrl">Original URL</Label>
                <Input
                  id="originalUrl"
                  placeholder="https://example.com/very-long-url"
                  value={newOriginalUrl}
                  onChange={(e) => setNewOriginalUrl(e.target.value)}
                  className="border-gray-600 bg-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="shortUrl">Custom Short URL</Label>
                <Input
                  id="shortUrl"
                  placeholder="custom-name"
                  value={newShortUrl}
                  onChange={(e) => setNewShortUrl(e.target.value)}
                  className="border-gray-600 bg-gray-700 text-white"
                />
              </div>
            </div>
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
                <div
                  key={link.id}
                  className="flex items-center justify-between rounded-lg bg-gray-700 p-4"
                >
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-white">{link.slug}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-white">{link.targetUrl}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteShortLinkHandler(link.id)}
                      className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
      </motion.section>
    </main>
  );
}
