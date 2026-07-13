import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">

        <h1 className="text-3xl font-bold text-blue-900">
          MediLink AI
        </h1>

        <div className="hidden md:flex gap-8 font-medium">

          <a href="#features">Features</a>

          <a href="#about">About</a>

          <a href="#contact">Contact</a>

        </div>

      </div>
    </nav>
  );
}