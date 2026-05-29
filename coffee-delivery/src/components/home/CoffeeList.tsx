import { Coffee } from "@/types";
import { CoffeeCard } from "../ui/CoffeeCard";

interface CoffeeListProps {
  coffees: Coffee[];
}

export function CoffeeList({ coffees }: CoffeeListProps) {
  return (
    <section className="max-w-290 mx-auto px-4 md:px-8 py-10">
      <h2 className="font-baloo font-extrabold text-title-l text-base-subtitle mb-14">
        Our coffees
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </section>
  );
}
