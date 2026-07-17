import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PortalCardProps {
  title: string;
  description: string;
  href: string;
}

export default function PortalCard({
  title,
  description,
  href,
}: PortalCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition duration-300">

      <h2 className="text-2xl font-bold text-blue-900">
        {title}
      </h2>

      <p className="text-gray-600 mt-4">
        {description}
      </p>

      <Link href={href}>
        <button className="mt-8 w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-700 flex justify-center items-center gap-2">

          Continue

          <ArrowRight size={18} />

        </button>
      </Link>

    </div>
  );
}