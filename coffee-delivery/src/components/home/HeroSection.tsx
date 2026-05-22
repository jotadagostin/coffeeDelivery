"use client";

import {
  CoffeeIcon,
  PackageIcon,
  ShoppingCartIcon,
  TimerIcon,
} from "@phosphor-icons/react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="bg-base-card">
      <div className="max-w-[1160px] mx-auto px-8 py-24 flex items-center justify-between gap-14">
        {/* Left content */}
        <div className="flex flex-col gap-16 flex-1">
          <div className="flex flex-col gap-4">
            <h1 className="font-baloo text-title-xl font-extrabold text-base-title leading-[130%]">
              Find the perfect coffee for any time of day
            </h1>
            <p className="text-text-l text-base-subtitle">
              With Coffee Delivery you receive your coffee wherever you are, at
              any time
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            <div className="flex items-center gap-3">
              <span className="bg-yellow-dark p-2 rounded-full text-white">
                <ShoppingCartIcon size={16} weight="fill" />
              </span>
              <span className="text-text-m text-base-text">
                Simple and secure purchase
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-base-text p-2 rounded-full text-white">
                <PackageIcon size={16} weight="fill" />
              </span>
              <span className="text-text-m text-base-text">
                Packaging keeps coffee intact
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-yellow p-2 rounded-full text-white">
                <TimerIcon size={16} weight="fill" />
              </span>
              <span className="text-text-m text-base-text">
                Fast and tracked delivery
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-purple p-2 rounded-full text-white">
                <CoffeeIcon size={16} weight="fill" />
              </span>
              <span className="text-text-m text-base-text">
                The coffee arrives fresh to you
              </span>
            </div>
          </div>
        </div>

        {/* Right — hero image */}
        <div className="shrink-0">
          <Image
            src="/hero-coffee.png"
            alt="Coffee cup"
            width={476}
            height={360}
            priority
          />
        </div>
      </div>
    </section>
  );
}
