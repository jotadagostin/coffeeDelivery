"use client";

import { MapPinIcon } from "@phosphor-icons/react";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

const addressSchema = z.object({
  zip: z.string().min(8, "Invalid ZIP code"),
  street: z.string().min(1, "Street is required"),
  number: z.string().min(1, "Number is required"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required"),
});
export type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  form: UseFormReturn<AddressFormData>;
}

export function AdressForm({ form }: AddressFormProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const zip = watch("zip");

  // Auto-fill address via ViaCep
  // async function handleZipBlur() {
  //   const cleanZip = zip?.replace(/\D/g, "");
  //   if (cleanZip?.length === 0) {
  //     const res = await fetch(`https://viacep.com.br/ws/${cleanZip}/json/`);
  //     const data = await res.json();
  //     if (!data.erro) {
  //       setValue("street", data.logradouro);
  //       setValue("neighborhood", data.bairro);
  //       setValue("city", data.localidade);
  //       setValue("state", data.uf);
  //     }
  //   }
  // }

  async function handleZipBlur() {
    const cleanZip = zip?.trim();
    if (!cleanZip || cleanZip.length < 4) return;

    try {
      // Tenta Itália primeiro, depois Brasil
      const countries = ["it", "br", "us", "pt", "de", "fr", "es"];

      for (const country of countries) {
        const res = await fetch(
          `https://api.zippopotam.us/${country}/${cleanZip}`,
        );
        if (res.ok) {
          const data = await res.json();
          const place = data.places?.[0];
          if (place) {
            setValue("city", place["place name"]);
            setValue("state", place["state abbreviation"] || place["state"]);
            break;
          }
        }
      }
    } catch {
      // silently fail — user fills manually
    }
  }

  const inputClass = `
    w-full bg-base-input border border-base-button rounded-md px-3 py-3
    text-text-s text-base-text placeholder:text-base-label
    focus:outline-none focus:border-yellow-dark transition-colors
  `;

  const errorClass = "text-tag text-red-500 mt-1 block";

  return (
    <div className="bg-base-card rounded-md p-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex gap-2">
        <MapPinIcon size={22} className="text-yellow-dark mt-0.5 shrink-0" />{" "}
        <div>
          <p className="text-text-m text-base-subtitle">Delivery address</p>
          <p className="text-text-s text-base-text">
            Enter the address where you want to receive your order
          </p>
        </div>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-4">
        {/* ZIP */}
        <div className="">
          <input
            {...register("zip")}
            onBlur={handleZipBlur}
            placeholder="ZIP code"
            className={inputClass}
          />
          {errors.zip && (
            <span className={errorClass}>{errors.zip.message}</span>
          )}
        </div>

        {/* Street */}
        <div>
          <input
            {...register("street")}
            placeholder="Street"
            className={inputClass}
          />
          {errors.street && (
            <span className={errorClass}>{errors.street.message}</span>
          )}
        </div>

        {/* Number + Complement */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-50">
            <input
              {...register("number")}
              placeholder="Number"
              className={inputClass}
            />
            {errors.number && (
              <span className={errorClass}>{errors.number.message}</span>
            )}
          </div>
          <div className="flex-1 relative">
            <input
              {...register("complement")}
              placeholder="Complement"
              className={inputClass}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-tag text-base-label italic">
              Optional
            </span>
          </div>
        </div>

        {/* Neighborhood + City + State */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="">
            <input
              {...register("neighborhood")}
              placeholder="Neighborhood"
              className={inputClass}
            />
            {errors.neighborhood && (
              <span className={errorClass}>{errors.neighborhood.message}</span>
            )}
          </div>
          <div className="flex-1">
            <input
              {...register("city")}
              placeholder="City"
              className={`${inputClass} flex-1`}
            />
            {errors.city && (
              <span className={errorClass}>{errors.city.message}</span>
            )}
          </div>
          <div className="w-full sm:w-15">
            <input
              {...register("state")}
              placeholder="ST"
              className={inputClass}
            />
            {errors.state && (
              <span className={errorClass}>{errors.state.message}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
