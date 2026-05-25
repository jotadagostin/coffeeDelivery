"use client";

import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DELIVERY_FREE = 3.5;

export function CartSummary() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const router = useRouter();

  function handleConfirmOrder() {
    router.push("/sucess");
  }
  return (
    <div className="bg-base-card rounded-tl-md rounded-tr-3xl rounded-bl-3xl rounded-br-md p-10 flex flex-col gap-6">
      <h2 className="font-baloo font-bold text-title-s text-base-subtitle">
        Selected Coffees
      </h2>

      {/* Items */}
      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div key={item.coffee.id}>
            <div>
              <Image
                src={item.coffee.image}
                alt={item.coffee.name}
                width={64}
                height={64}
              />

              <div className="flex flex-col gap-2 flex-1">
                <div className="flex justify-between">
                  <span className="text-text-m text-base-subtitle">
                    {item.coffee.name}
                  </span>
                  <span className="font-bold text-base-text">
                    ${(item.coffee.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
