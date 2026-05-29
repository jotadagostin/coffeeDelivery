"use client";

import { useCartStore } from "@/store/useCartStore";
import {
  CurrencyDollarIcon,
  MapPinIcon,
  TimerIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SucessPage() {
  const { order, clearCart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    if (!order) {
      router.replace("/");
    }
  }, [order, router]);

  if (!order) return null;

  const paymentLabels = {
    credit: "Credit Card",
    debit: "Debit Card",
    cash: "Cash",
  };

  return (
    <main className="max-w-290 mx-auto px-4 md:px-8 py-10 md:py-20">
      <h1 className="font-baloo font-extrabold text-title-m md:text-title-l text-yellow-dark">
        Order confirmed!
      </h1>
      <p className="text-text-m md:text-text-l text-base-subtitle mt-1">
        Now just wait and the coffee will arrive soon
      </p>

      <div className="flex  flex-col lg:flex-row items-center justify-between gap-10 md:gap-24 mt-10">
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
          <div className="flex items-start gap-3">
            <span className="bg-purple p-2 rounded-full text-white shrink-0">
              <MapPinIcon size={16} weight="fill" />
            </span>
            <div>
              <p className="text-text-m text-base-text">
                Delivery to {""}
                <strong>
                  {order.address.street}, {order.address.number}
                </strong>
              </p>
              <p className="text-text-m text-base-text">
                {order.address.neighborhood} - {order.address.city},{" "}
                {order.address.state}
              </p>
            </div>
          </div>

          {/* Delivery time */}

          <div className="flex items-center gap-3">
            <span className="bg-yellow p-2 rounded-full text-white shrink-0">
              <TimerIcon size={16} weight="fill" />
            </span>
            <div>
              <p className="text-text-m text-base-text">Estimated delivery</p>
              <p className="text-text-m text-base-text font-bold">
                20 min - 30 min
              </p>
            </div>
          </div>

          {/* Payment */}
          <div className="flex items-center gap-3">
            <span className="bg-yellow-dark p-2 rounded-full text-white shrink-0">
              <CurrencyDollarIcon size={16} weight="fill" />
            </span>
            <div>
              <p className="text-text-m text-base-text">Paymente on delivery</p>
              <p className="text-text-m text-base-text font-bold">
                {paymentLabels[order?.paymentMethod]}
              </p>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="shrink-0">
          <Image
            src="/delivery.png"
            alt="Delivery person in a scooter"
            width={492}
            height={293}
            priority
            className="w-70 md:w-123"
          />
        </div>
      </div>
    </main>
  );
}
