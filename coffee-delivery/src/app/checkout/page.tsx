"use client";

import { AdressForm } from "@/components/checkout/AddressForm";
import { CartSummary } from "@/components/checkout/CartSummary";
import { PaymentSelector } from "@/components/checkout/PaymentSelector";
import { useCartStore } from "@/store/useCartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const addressSchema = z.object({
  zip: z.string().min(4, "Invalid ZIP code"),
  street: z.string().min(1, "Street is required"),
  number: z.string().min(1, "Number is required"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required"),
});

type AddressFormData = z.infer<typeof addressSchema>;
type PaymentMethod = "credit" | "debit" | "cash";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );
  const { items, setOrder, clearCart } = useCartStore();
  const router = useRouter();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  function handleConfirmOrder(data: AddressFormData) {
    if (items.length === 0) return;
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    setOrder({
      items,
      address: data,
      paymentMethod,
    });

    clearCart();
    router.push("/success");
  }

  return (
    <main className="max-w-290 mx-auto px-8 py-10">
      <h1 className="font-baloo font-extrabold text-title-l text-base-subtitle mb-8">
        Complete your order
      </h1>

      <form
        className="flex gap-8 items-start"
        onSubmit={form.handleSubmit(handleConfirmOrder)}
      >
        {/* left col - forms */}
        <div className="flex flex-col gap-3 flex-1">
          <AdressForm form={form} />
          <PaymentSelector
            onChange={setPaymentMethod}
            selected={paymentMethod}
          />
        </div>

        {/* Right col - Cart summary */}
        <div className="w-md shrink-0">
          <CartSummary />
        </div>
      </form>
    </main>
  );
}
