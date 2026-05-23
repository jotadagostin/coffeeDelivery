"use client";

import { Coffee } from "@/types";
import Image from "next/image";
import { Tag } from "./Tag";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { QuantityInput } from "./QuantityInput";
import { ShoppingCartSimpleIcon } from "@phosphor-icons/react";

interface CoffeeCardProps {
  coffee: Coffee;
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  function handleAddToCart() {
    addItem(coffee, quantity);
    setQuantity(1);
  }
  return (
    <div className="bg-base-card rounded-tl-md rounded-tr-3xl rounded-bl-3xl rounded-br-md flex flex-col items-center p-5 pt-0 gap-4">
      <Image
        src={coffee.image}
        alt={coffee.image}
        width={120}
        height={120}
        className="mt-6"
      />

      <div className="flex flex-wrap justify-center gap-1">
        {coffee.categories.map((cat) => (
          <Tag key={cat} label={cat} />
        ))}
      </div>

      <div className="text-center flex flex-col gap-2">
        <h3 className="font-baloo font-bold text-title-s text-base-subtitle">
          {coffee.name}
        </h3>
        <p className="text-text-s text-base-label">{coffee.description}</p>
      </div>

      <div className="flex items-center justify-between w-full mt-auto">
        <div className="flex items-baseline gap-1">
          <span className="text-text-s text-base-text">$</span>
          <span className="font-baloo font-extrabold text-title-m text-base-text">
            {coffee.price.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <QuantityInput value={quantity} onChange={setQuantity} />
          <button
            className="bg-purple-dark hover:bg-purple text-white p-2 rounded-md transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingCartSimpleIcon size={22} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}
