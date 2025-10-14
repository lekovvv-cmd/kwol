import { useState } from "react";
import TextField from "./TextField";

type Props = {
  value: string;
  onChange: (v: string) => void;
  error?: string | null;
  placeholder?: string;
};

export default function PasswordField({
  value,
  onChange,
  error,
  placeholder,
}: Props) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="relative">
        <TextField
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-3 text-sm"
        >
          {show ? "Скрыть" : "Показать"}
        </button>
      </div>
    </div>
  );
}
