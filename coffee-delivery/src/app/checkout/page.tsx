import { AdressForm } from "@/components/checkout/AddressForm";
import { CartSummary } from "@/components/checkout/CartSummary";
import { PaymentSelector } from "@/components/checkout/PaymentSelector";

export default function CheckoutPage() {
  return (
    <main className="max-w-290 mx-auto px-8 py-10">
      <h1 className="font-baloo font-extrabold text-title-l text-base-subtitle mb-8">
        Complete your order
      </h1>

      <div className="flex gap-8 items-start">
        {/* left col - forms */}
        <div className="flex flex-col gap-3 flex-1">
          <AdressForm />
          <PaymentSelector />
        </div>

        {/* Right col - Cart summary */}
        <div className="w-md shrink-0">
          <CartSummary />
        </div>
      </div>
    </main>
  );
}
