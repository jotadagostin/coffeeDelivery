"use client";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityInputProps) {
  return (
    <div className="flex items-center gap-2 bg-base-button rounded-md px-3 py-2">
      <button
        className="text-purple font-bold text-lg leading-none hover:text-purple-dark transition-colors cursor-pointer"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        -
      </button>
      <span className="text-text-m font-bold text-base-title w-4 text-center">
        {value}
      </span>
      <button
        className="text-purple font-bold text-lg leading-none hover:text-purple-dark transition-colors cursor-pointer"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
