import React from "react";

type Props = {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
  error?: string | null;
};

export default function CheckboxField({
  checked,
  onChange,
  label,
  error,
}: Props) {
  return (
    <div>
      <div className="flex items-start gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 accent-blue-500"
        />
        <div>{label}</div>
      </div>
      {error && (
        <div className="text-red-600 text-xs mt-2 ml-[25px]">{error}</div>
      )}
    </div>
  );
}
