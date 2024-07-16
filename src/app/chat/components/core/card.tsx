import { ReactNode } from "react";

const Card = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="rounded-md bg-[#1f1f23] shadow-lg p-4 border border-black">
    <p className="block mb-2 text-sm font-medium dark:text-[#efeff1]">
      {title}
    </p>
    {children}
  </div>
);

export default Card;
