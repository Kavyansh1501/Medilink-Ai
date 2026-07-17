import PortalCard from "./PortalCard";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white min-h-[85vh] flex items-center">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h1 className="text-6xl font-bold text-blue-900">

            AI Powered Medicine Discovery Platform

          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">

            Upload prescriptions, discover medicines instantly,
            connect with verified wholesalers and compare prices
            using AI.

          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-20">

          <PortalCard
            title="Customer Portal"
            description="Upload prescriptions, search medicines and place orders."
            href="/customer/login"
          />

          <PortalCard
            title="Wholesaler Portal"
            description="Manage inventory, receive requests and fulfill medicine orders."
            href="/wholesaler/login"
          />

        </div>

      </div>

    </section>
  );
}