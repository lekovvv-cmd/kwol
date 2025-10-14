type Props = {
  onBack?: () => void;
  backLabel?: string;
  submitLabel?: string;
  submitDisabled?: boolean;
  className?: string;
};

export default function FormFooter({
  onBack,
  backLabel = "Назад",
  submitLabel = "Зарегистрироваться",
  submitDisabled = false,
  className = "",
}: Props) {
  return (
    <div className={`flex gap-3 w-full ${className}`}>
      <button
        type="button"
        onClick={onBack}
        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition cursor-pointer"
      >
        {backLabel}
      </button>

      <button
        type="submit"
        disabled={submitDisabled}
        aria-disabled={submitDisabled}
        className={`flex-1 py-3 rounded-lg font-semibold transition ${
          submitDisabled
            ? "bg-blue-200 text-white cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-[#1b3cd6]"
        }`}
      >
        {submitLabel}
      </button>
    </div>
  );
}
