import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center bg-blue-900 text-white p-16">

          <h1 className="text-5xl font-bold">
            MediLink AI
          </h1>

          <p className="mt-8 text-lg leading-8">

            Connecting customers with verified medicine
            wholesalers using Artificial Intelligence.

          </p>

          <img
            src="/doctor.png"
            alt="Doctor"
            className="mt-12 w-96 mx-auto"
          />

        </div>

        {/* Right Side */}

        <div className="p-10 lg:p-16">

          <h2 className="text-4xl font-bold text-blue-900">
            {title}
          </h2>

          <p className="mt-2 text-gray-500">
            {subtitle}
          </p>

          <div className="mt-10">

            {children}

          </div>

        </div>

      </div>

    </main>
  );
}