"use client";

import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SucessPage() {
  const { order, clearCart } = useCartStore();
  const router = useRouter();

  //   useEffect(() => {
  //     if (!order) {
  //       router.replace("/");
  //     }
  //   }, [order, router]);

  //   if (!order) return null;

  const paymentLabels = {
    credit: "Credit Card",
    debit: "Debit Card",
    cash: "Cash",
  };

  return (
    <main className="max-w-290 mx-auto px-8 py-20">
      <h1 className="font-baloo font-extrabold text-title-l text-yellow-dark">
        Order confirmed!
      </h1>
      <p className="text-text-l text-base-subtitle mt-1">
        Now just wait and the coffee will arrive soon
      </p>

      <div className="flex items-center justify-between gap-24 mt-10">
        {/* Order details */}
        <div
          className="flex-1 border-2 border-transparent rounded-tl-md rounded-tr-3xl rounded-bl-3xl rounded-br-md p-10 flex flex-col gap-8"
          style={{
            backgroundImage:
              "linear-gradient(white, white), linear-gradient(to right, #DBAC2C, #8047F8)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          {/* Address */}
          <div className="flex items-start gap-3"></div>
        </div>
      </div>
    </main>
  );
}
