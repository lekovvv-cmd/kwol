import React, { useEffect, useState } from "react";
import type { User } from "../../types";
import { saveUsers } from "../../lib/storage";
import FormFooter from "./FormFooter";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  users: User[];
  onAddUser: (u: User) => void;
  onGoToUsers: () => void;
  successMsg?: string | null;
  setSuccessMsg?: (s: string | null) => void;
};

const RegisterForm: React.FC<Props> = ({
  users,
  onAddUser,
  onGoToUsers,
  successMsg,
  setSuccessMsg,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [consentError, setConsentError] = useState<string | null>(null);

  const [attemptedStep1, setAttemptedStep1] = useState(false);
  const [attemptedStep2, setAttemptedStep2] = useState(false);

  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg?.(null), 3000);
    return () => clearTimeout(t);
  }, [successMsg, setSuccessMsg]);

  function togglePolicy(e?: React.MouseEvent) {
    e?.preventDefault();
    setAgree((s) => !s);
    setConsentError(null);
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    setAttemptedStep1(true);
    setEmailError(null);
    setConsentError(null);

    const v = email.trim();
    if (!v) {
      setEmailError("E-mail обязателен");
    } else if (!emailRegex.test(v)) {
      setEmailError("Неверный формат e-mail");
    }

    if (!agree) {
      setConsentError(
        "Нужно подтвердить согласие с политикой конфиденциальности"
      );
    }

    if (v && emailRegex.test(v)) {
      const exists = users.some(
        (u) => u.email.toLowerCase() === v.toLowerCase()
      );
      if (exists) setEmailError("Пользователь с таким e-mail уже существует");
    }

    if (!v || !emailRegex.test(v) || !agree) return;
    const exists = users.some((u) => u.email.toLowerCase() === v.toLowerCase());
    if (exists) return;

    setStep(2);
    setAttemptedStep2(false);
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setAttemptedStep2(true);

    setNameError(null);
    setPasswordError(null);
    setConsentError(null);
    setEmailError(null);

    const vName = name.trim();
    const vPassword = password;
    const vEmail = email.trim();

    if (!vName) setNameError("Имя обязательно");
    if (!vPassword) setPasswordError("Пароль обязателен");
    else if (vPassword.length < 6)
      setPasswordError("Пароль должен быть не короче 6 символов");

    if (!agree)
      setConsentError(
        "Нужно подтвердить согласие с политикой конфиденциальности"
      );

    if (!vName || !vPassword || vPassword.length < 6 || !agree) return;

    if (!vEmail || !emailRegex.test(vEmail)) {
      setEmailError("Неверный e-mail");
      setStep(1);
      return;
    }

    const exists = users.some(
      (u) => u.email.toLowerCase() === vEmail.toLowerCase()
    );
    if (exists) {
      setEmailError("Пользователь с таким e-mail уже существует");
      setStep(1);
      return;
    }

    const newUser: User = {
      id: `${Date.now()}_${Math.floor(Math.random() * 1e6)}`,
      email: vEmail,
      name: vName,
      createdAt: new Date().toISOString(),
    };

    const updated = [newUser, ...users];
    saveUsers(updated);
    onAddUser(newUser);

    // reset form
    setEmail("");
    setName("");
    setPassword("");
    setStep(1);
    setAgree(false);
    setAttemptedStep1(false);
    setAttemptedStep2(false);

    setSuccessMsg?.("Пользователь успешно зарегистрирован");

    onGoToUsers();
  }

  return (
    <div
      className="
        bg-white
        w-full
        fixed left-0 z-30
        px-6 pt-[24px] pb-0
        rounded-t-[32px]
        shadow-lg
        flex flex-col items-center gap-4
        sm:static sm:mx-auto sm:max-w-[536px] sm:px-[68px] sm:pt-[56px] sm:pb-[40px] sm:rounded-[48px] sm:gap-[24px]
      "
      style={{
        bottom: "0",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
      }}
    >
      <h2 className="text-[28px] sm:text-4xl font-semibold text-black">
        Регистрация
      </h2>

      {successMsg && (
        <div className="w-full bg-green-50 border border-green-100 text-green-800 px-3 py-2 rounded-md text-sm">
          {successMsg}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleContinue} className="w-full flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-600">
              Корпоративный e-mail
            </label>
            <input
              type="email"
              required
              placeholder="Введите почту"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (attemptedStep1) setEmailError(null);
              }}
              className={`mt-1 w-full h-14 px-4 bg-[#F5F6FB] border ${
                attemptedStep1 && emailError
                  ? "border-red-400"
                  : "border-gray-200"
              } rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2F54EB] transition`}
            />
            {attemptedStep1 && emailError && (
              <div className="text-red-600 text-xs mt-2">{emailError}</div>
            )}
          </div>

          <div className="w-full">
            <div className="flex items-start gap-3 text-sm text-gray-700 w-full">
              <input
                id="policy-step1"
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  if (attemptedStep1) setConsentError(null);
                }}
                className="mt-1 accent-blue-500"
              />
              <div>
                <span className="mb-0">
                  Я подтверждаю согласие с{" "}
                  <button
                    type="button"
                    onClick={togglePolicy}
                    className="inline text-blue-500 hover:underline focus:outline-none"
                  >
                    политикой конфиденциальности
                  </button>
                </span>
              </div>
            </div>

            {attemptedStep1 && consentError && (
              <div className="text-red-600 text-xs mt-2 ml-[25px]">
                {consentError}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white h-[60px] flex items-center justify-center rounded-lg sm:rounded-md font-bold hover:bg-[#1b3cd6] transition cursor-pointer"
          >
            продолжить
          </button>

          <button
            type="button"
            onClick={() => {}}
            className="w-full bg-[#F2F3F9] text-gray-900 font-bold h-[60px] flex items-center justify-center rounded-lg sm:rounded-md hover:bg-[#E8E9F4] transition cursor-pointer"
          >
            войти
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleRegister} className="w-full flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-600">Имя</label>
            <input
              type="text"
              placeholder="Введите имя"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (attemptedStep2) setNameError(null);
              }}
              className={`mt-1 w-full h-[48px] px-4 bg-[#F5F6FB] border ${
                attemptedStep2 && nameError
                  ? "border-red-400"
                  : "border-gray-200"
              } rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2F54EB] transition`}
            />
            {attemptedStep2 && nameError && (
              <div className="text-red-600 text-xs mt-1">{nameError}</div>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (attemptedStep2) setPasswordError(null);
              }}
              className={`mt-1 w-full h-[48px] px-4 bg-[#F5F6FB] border ${
                attemptedStep2 && passwordError
                  ? "border-red-400"
                  : "border-gray-200"
              } rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2F54EB] transition`}
            />
            {attemptedStep2 && passwordError && (
              <div className="text-red-600 text-xs mt-1">{passwordError}</div>
            )}
          </div>

          <FormFooter
            onBack={() => {
              setStep(1);
              setName("");
              setPassword("");
              setNameError(null);
              setPasswordError(null);
              setConsentError(null);
              setAttemptedStep2(false);
            }}
            backLabel="Назад"
            submitLabel="Зарегистрироваться"
            submitDisabled={false}
          />

          <div className="flex items-start gap-3 text-sm text-gray-700 w-full">
            <input
              id="policy-step2"
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                setAgree(e.target.checked);
                if (attemptedStep2) setConsentError(null);
              }}
              className="mt-1 accent-blue-500"
            />
            <div>
              <span>
                Я подтверждаю согласие с{" "}
                <button
                  type="button"
                  onClick={togglePolicy}
                  className="inline text-blue-500 hover:underline focus:outline-none"
                >
                  политикой конфиденциальности
                </button>
              </span>
              {attemptedStep2 && consentError && (
                <div className="text-red-600 text-xs mt-1">{consentError}</div>
              )}
            </div>
          </div>
        </form>
      )}

      <p className="text-xs text-gray-500 text-center leading-snug mt-0 mb-0">
        Возникли вопросы или что-то сломалось? <br />
        <a href="#" className="text-[#2F54EB] hover:underline">
          Вступай в чат и задай вопрос
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
