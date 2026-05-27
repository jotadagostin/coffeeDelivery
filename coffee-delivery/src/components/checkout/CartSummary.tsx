"use client";

import { useCartStore } from "@/store/useCartStore";
import { TrashIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AddressFormData } from "./AddressForm";

type PaymentMethod = "credit" | "debit" | "cash";

interface CartSummaryProps {
  address: Partial<AddressFormData>;
  paymentMethod: PaymentMethod;
}

const DELIVERY_FREE = 3.5;

export function CartSummary({ address, paymentMethod }: CartSummaryProps) {
  const { items, removeItem, updateQuantity, totalPrice, setOrder, clearCart } =
    useCartStore();
  const router = useRouter();

  function handleConfirmOrder() {
    if (items.length === 0) return;

    setOrder({
      items,
      address: {
        zip: address.zip || "",
        street: address.street || "",
        number: address.number || "",
        complement: address.complement,
        neighborhood: address.neighborhood || "",
        city: address.city || "",
        state: address.state || "",
      },
      paymentMethod,
    });

    clearCart();
    router.push("/success");
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

                <div className="flex gap-2">
                  {/* Quantity */}
                  <div className="flex items-center gap-2 bg-base-button rounded-md px-3 py-1">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.coffee.id,
                          Math.max(1, item.quantity - 1),
                        )
                      }
                      className="text-purple hover:text-purple-dark transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-text-s font-bold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.coffee.id, item.quantity + 1)
                      }
                      className="text-purple hover:text-purple-dark transition-colors cursor-pointer"
                    >
                      {" "}
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.coffee.id)}
                    className="flex items-center gap-1 bg-base-button hover:bg-base-hover  px-3 py-1 rounded-md transition-colors text-tag uppercase text-base-text cursor-pointer"
                  >
                    <TrashIcon size={16} className="text-purple" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="border-b border-base-button mt-6"></div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-text-s text-base-text">
          <span>Total items</span>
          <span>${totalPrice().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-text-s text-base-text">
          <span>Delivery</span>
          <span>${DELIVERY_FREE.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-title-s text-base-subtitle">
          <span>Total</span>
          <span>${(totalPrice() + DELIVERY_FREE).toFixed(2)}</span>
        </div>
      </div>

      {/* Confirm button */}
      <button
        onClick={handleConfirmOrder}
        className="w-full bg-yellow hover:bg-yellow-dark text-white font-bold text-button-g uppercase py-3 rounded-md transition-colors cursor-pointer"
      >
        Confirm order
      </button>
    </div>
  );
}
