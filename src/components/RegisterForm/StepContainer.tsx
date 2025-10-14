import React from "react";

export default function StepContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <form className="w-full flex flex-col gap-3">{children}</form>;
}
