"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
  onSubmit?: (data: AddressFormData) => void;
  onChange?: (data: Partial<AddressFormData>) => void;
}

export function AdressForm({ onChange }: AddressFormProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const zip = watch("zip");

  // Auto-fill address via ViaCep
  useEffect(() => {
    const cleanZip = zip?.replace(/\D/g, "");
    if (cleanZip?.length === 8) {
      fetch(`https://viacep.com.br/ws/${cleanZip}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            onChange?.({
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf,
            });
          }
        });
    }
  }, [zip, onChange]);

  const inputClass = `
    w-full bg-base-input border border-base-button rounded-md px-3 py-3
    text-text-s text-base-text placeholder:text-base-label
    focus:outline-none focus:border-yellow-dark transition-colors
  `;

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
        <div className="w-50">
          <input
            {...register("zip")}
            placeholder="ZIP code"
            className={inputClass}
          />
          {errors.zip && (
            <span className="text-tag text-red-500 mt-1">
              {errors.zip.message}
            </span>
          )}
        </div>

        {/* Street */}
        <input
          {...register("street")}
          placeholder="Street"
          className={inputClass}
        />

        {/* Number + Complement */}
        <div className="flex gap-3">
          <div className="w-50">
            <input
              {...register("number")}
              placeholder="Number"
              className={inputClass}
            />
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
        <div className="flex gap-3">
          <div className="w-50">
            <input
              {...register("neighborhood")}
              placeholder="Neighborhood"
              className={inputClass}
            />
          </div>
          <input
            {...register("city")}
            placeholder="City"
            className={`${inputClass} flex-1`}
          />
          <div className="w-15">
            <input
              {...register("state")}
              placeholder="ST"
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
