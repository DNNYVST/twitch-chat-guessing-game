import { ReactNode } from "react";

const Card = ({
  title,
  children,
  button = null,
}: {
  title: string;
  children: ReactNode;
  button?: ReactNode;
}) => (
  <div className="rounded-md bg-[#1f1f23] shadow-lg p-4 border border-black h-full">
    <p className="block mb-2 text-sm font-medium dark:text-[#efeff1]">
      {title} <span className="float-right">{button}</span>
    </p>
    {children}
  </div>
);

export default Card;
