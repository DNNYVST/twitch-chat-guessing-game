import { ReactNode } from "react";

const variants: any = {
  'default': "bg-[#1f1f23]",
  'blurple': "bg-[#6441A4]",
};

const Card = ({
  title,
  variant = 'default',
  children,
}: {
  title: string;
  variant?: string;
  children: ReactNode;
}) => (
  <div className={`rounded-md ${variants[variant]} shadow-lg p-4`}>
    <p className="block mb-2 text-sm font-medium dark:text-[#efeff1]">
      {title}
    </p>
    {children}
  </div>
);

export default Card;
