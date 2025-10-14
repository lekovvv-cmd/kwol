type Props = {
  id?: string;
  label?: string;
  value: string;
  placeholder?: string;
  error?: string | null;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
};

export default function TextField({
  id,
  label,
  value,
  placeholder,
  error,
  onChange,
  type = "text",
  required,
}: Props) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm text-gray-600">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full h-[48px] px-4 bg-[#F5F6FB] border ${
          error ? "border-red-400" : "border-gray-200"
        } rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2F54EB] transition`}
        required={required}
      />
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </div>
  );
}
