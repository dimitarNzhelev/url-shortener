"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import React from "react";

interface ProfileButtonProps {
  title: string;
  size: "sm" | "default" | "lg";
  children?: React.ReactNode;
}

export default function ProfileButton({
  title,
  size,
  children,
}: ProfileButtonProps) {
  return (
    <Link href="/profile" passHref>
      <Button
        size={size}
        className="rounded-md bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 text-black hover:from-green-500 hover:to-blue-600"
      >
        {title}
        {children}
      </Button>
    </Link>
  );
}
