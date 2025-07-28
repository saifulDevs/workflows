"use client";

import NavWrapper from "./components/nav-wrapper";
import Footer from "./components/sections/footer";
import Hero from "./components/sections/hero";
import Integrations from "./components/sections/integrations";

export default function Landing() {
  const handleOpenTypeformLink = () => {};

  return (
    <main className="relative min-h-screen bg-[#0C0C0C] font-geist-sans">
      <NavWrapper onOpenTypeformLink={handleOpenTypeformLink} />

      <Hero />

      {/* <Features /> */}
      <Integrations />
      {/* <Blogs /> */}

      {/* Footer */}
      <Footer />
    </main>
  );
}
