import Image from "next/image";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  children?: React.ReactNode;
  primary?: boolean;
  iconSrc?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  children,
  className,
  iconSrc,
  primary = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`type-body flex h-10 w-max items-center justify-center gap-2 rounded-lg px-4 py-3 transition-colors
      ${
        primary
          ? "bg-g-60 hover:bg-g-50 active:bg-g-40"
          : "bg-g-100 hover:bg-g-90 active:bg-g-80"
      }
      ${iconSrc && children ? "pl-3" : ""}
      ${!children ? "aspect-square pl-0 pr-0 pt-0 pb-0" : ""}
      ${className || ""}
        `}
      {...props}
    >
      {iconSrc && (
        <span className="relative inline-block h-6 w-6">
          <Image src={iconSrc} alt="" fill priority />
        </span>
      )}
      {children}
    </button>
  );
}

export function EditContactButton({
  children,
  className,
  ...props
}: Omit<ButtonProps, "primary" | "iconSrc">) {
  return (
    <button
      className={`type-body add-contact-gradient-border relative rounded-full ${
        className || ""
      }`}
      {...props}
    >
      {/*
      NOTE: The `add-contact-gradient-base` and `add-contact-gradient-border` custom Tailwind classes
      take care of the special gradient background of the "Add new"-button.
      Check out the `src/styels/globals.css` for these classes.
      */}
      <span className="absolute top-0 left-0 z-10 h-full w-full rounded-full bg-white opacity-0 transition-opacity hover:opacity-[4%]"></span>
      <div className="add-contact-gradient-base relative m-[1px] flex h-10 w-max items-center justify-center gap-2 rounded-full  pl-3 pr-4">
        <span className="relative inline-block h-6 w-6">
          <Image src="/icons/Add.svg" alt="icon" fill priority />
        </span>
        {children}
      </div>
    </button>
  );
}
