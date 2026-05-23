interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <span className="bg-yellow-light text-yellow-dark text-tag font-bold uppercase px-2 py-1 rounded-full">
      {label}
    </span>
  );
}
