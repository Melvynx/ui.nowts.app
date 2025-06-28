// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

import { BgShapes } from "./_landing/bg-shapes";
import { Features } from "./_landing/features";
import { Footer } from "./_landing/footer";
import { Hero } from "./_landing/hero";
import { VerticalLines } from "./_landing/vertical-lines";

export default function Home() {
  return (
    <main className="py-16 lg:py-32 relative overflow-hidden">
      <BgShapes />
      <VerticalLines width={1275} />
      <section className="p-5">
      <Hero />
      <Features />
      </section>
      <Footer />
    </main>
  );
}
