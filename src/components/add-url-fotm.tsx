import React from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

interface UrlInputFormProps {
  newOriginalUrl: string;
  newShortUrl: string;
  setNewOriginalUrl: (value: string) => void;
  setNewShortUrl: (value: string) => void;
}

export default function UrlInputForm({
  newOriginalUrl,
  newShortUrl,
  setNewOriginalUrl,
  setNewShortUrl,
}: UrlInputFormProps) {
  return (
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
  );
}
