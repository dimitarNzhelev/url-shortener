import React from "react";
import { Link as LinkIcon, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";

interface ShortLink {
  id: string;
  slug: string;
  targetUrl: string;
}

interface ShortLinkItemProps {
  link: ShortLink;
  deleteShortLinkHandler: (id: string) => void;
}

export default function ShortLinkItem({
  link,
  deleteShortLinkHandler,
}: ShortLinkItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-700 p-4">
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
  );
}
