"use client";

import { AddressFormData, AdressForm } from "@/components/checkout/AddressForm";
import { CartSummary } from "@/components/checkout/CartSummary";
import { PaymentSelector } from "@/components/checkout/PaymentSelector";
import { useState } from "react";

type PaymentMethod = "credit" | "debit" | "cash";

export default function CheckoutPage() {
  const [address, setAddress] = useState<Partial<AddressFormData>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  return (
    <main className="max-w-290 mx-auto px-8 py-10">
      <h1 className="font-baloo font-extrabold text-title-l text-base-subtitle mb-8">
        Complete your order
      </h1>

      <div className="flex gap-8 items-start">
        {/* left col - forms */}
        <div className="flex flex-col gap-3 flex-1">
          <AdressForm onChange={setAddress} />
          <PaymentSelector onChange={setPaymentMethod} />
        </div>

        {/* Right col - Cart summary */}
        <div className="w-md shrink-0">
          <CartSummary address={address} paymentMethod={paymentMethod} />
        </div>
      </div>
    </main>
  );
}
