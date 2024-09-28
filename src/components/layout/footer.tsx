export default function Footer() {
  return (
    <footer className="relative z-10 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        <p className="mb-4 text-sm text-gray-400 md:mb-0">
          © 2024 Dimitar Zhelev. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-sm text-gray-400 transition-colors hover:text-green-500"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 transition-colors hover:text-green-500"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 transition-colors hover:text-green-500"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
