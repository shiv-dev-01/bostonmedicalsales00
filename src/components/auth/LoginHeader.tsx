import React from "react";
import { useAuthStore } from "../../store/authStore";
import logo from "../../assets/bostonmedical.png";

export function LoginHeader() {
  const { user } = useAuthStore();
  const permission = user?.is_permission;

  return (
    <div className="flex justify-center items-center gap-8">
      <img
        src={logo}
        alt="Boston Medical Group"
        className="block h-auto w-full max-w-[240px] object-contain"
      />
    </div>
  );
}
