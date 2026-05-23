import { CoffeeList } from "@/components/home/CoffeeList";
import { HeroSection } from "@/components/home/HeroSection";
import { Coffee } from "@/types";
import coffees from "@/data/coffees.json";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CoffeeList coffees={coffees as Coffee[]} />
    </main>
  );
}
