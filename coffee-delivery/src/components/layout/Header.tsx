"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { MapPinIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function Header() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="max-w-290 mx-auto px-8 py-8 flex items-center justify-between">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Coffee Delivery purple logo"
          width={85}
          height={40}
          priority
        />
      </Link>
      {/* Actions */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-purple-light text-purple-dark px-3 py-2 rounded-md">
          <MapPinIcon size={22} weight="fill" className="text-purple" />
          <span className="text-text-s font-roboto">Genova, IT</span>
        </div>

        {/* Cart */}
        <Link
          href="/checkout"
          className="relative bg-yellow-light text-yellow-dark p-2 rounded-md"
        >
          <ShoppingCartIcon size={22} weight="fill" />
          {mounted && totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-dark text-white text-tag font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
