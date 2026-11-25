import type React from "react";
import { BASE_PATH } from "../config";

type Props = {
  // Path relative to the base path, or an absolute URL.
  to: string;
  children: React.ReactNode;
};

export default function NavigateLink({ to, children }: Props) {
  const href = /^https?:\/\//.test(to) ? to : `${BASE_PATH}${to}`;
  return (
    <a
      href={href}
      className="text-lg text-white bg-pink-600 px-4 py-2 rounded-sm transition duration-300 hover:bg-pink-500 focus:ring-3 focus:ring-pink-400 focus:outline-hidden"
    >
      {children}
    </a>
  );
}
