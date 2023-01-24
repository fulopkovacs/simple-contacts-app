import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  children?: React.ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`type-body rounded-[8px] bg-g-60 px-[8px] py-[16px] hover:bg-g-50 active:bg-g-40  ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
