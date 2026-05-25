"use client";

import { BankIcon, CreditCardIcon, MoneyIcon } from "@phosphor-icons/react";
import { useState } from "react";

type PaymentMethod = "credit" | "debit" | "cash";

interface PaymentSelectorProps {
  onChange?: (method: PaymentMethod) => void;
}

export function PaymentSelector({ onChange }: PaymentSelectorProps) {
  const [selected, setSelected] = useState<PaymentMethod | null>(null);

  function handleSelect(method: PaymentMethod) {
    setSelected(method);
    onChange?.(method);
  }

  const buttonClass = (method: PaymentMethod) => `
    flex items-center gap-3 flex-1 px-4 py-4 rounded-md border transition-colors text-text-xs uppercase cursor-pointer
    ${
      selected === method
        ? "bg-purple-light border-purple text-purple-dark"
        : "bg-base-button border-base-button text-base-text hover:bg-base-hover"
    }
  `;

  return (
    <div className="bg-base-card rounded-md p-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex gap-2">
        <CreditCardIcon size={22} className="text-purple mt-0.5 shrink-0" />
        <div>
          <p className="text-text-m text-base-subtitle">Payment</p>
          <p className="text-text-s text-base-text">
            The payment is made on delivery. Choose how you want to pay
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="flex gap-3 ">
        <button
          type="button"
          onClick={() => handleSelect("credit")}
          className={buttonClass("credit")}
        >
          <CreditCardIcon size={16} className="text-purple shrink-0" /> Credit
          Card
        </button>

        <button
          type="button"
          onClick={() => handleSelect("debit")}
          className={buttonClass("debit")}
        >
          <BankIcon size={16} className="text-purple shrink-0" />
          Debit card
        </button>

        <button
          type="button"
          onClick={() => handleSelect("cash")}
          className={buttonClass("cash")}
        >
          <MoneyIcon size={16} className="text-purple shrink-0" />
          Cash
        </button>
      </div>
    </div>
  );
}
