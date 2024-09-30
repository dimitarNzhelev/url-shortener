"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import React from "react";

interface SignInButtonProps {
  title: string;
  size: "sm" | "default" | "lg";
  children?: React.ReactNode;
}

export default function SignInButton({
  title,
  size,
  children,
}: SignInButtonProps) {
  return (
    <Button
      size={size}
      className="rounded-md bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 text-black hover:from-green-500 hover:to-blue-600"
      onClick={() => signIn()}
    >
      {title}
      {children}
    </Button>
  );
}
