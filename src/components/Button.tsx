import Image from "next/image";
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
} from "react";

export type ButtonProps = {
  children?: React.ReactNode;
  primary?: boolean;
  iconSrc?: string;
  forwardedRef?: ForwardedRef<HTMLButtonElement>;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type AddContactButtonProps = Omit<ButtonProps, "primary" | "iconSrc">;

export const Button = ({
  children,
  className,
  iconSrc,
  primary = false,
  forwardedRef,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...{ ref: forwardedRef }}
      className={`type-body flex h-[40px] w-max items-center justify-center gap-2 rounded-[8px] px-[16px] py-[8px] transition-colors
      ${!primary ? "bg-g-100 hover:bg-g-90 active:bg-g-80" : ""}
      ${primary ? " bg-g-60 hover:bg-g-50 active:bg-g-40" : ""}
      ${iconSrc ? "pl-[12px]" : ""}
      ${!children ? "aspect-square pl-0 pr-0 pt-0 pb-0" : ""}
      ${className || ""}
        `}
      {...props}
    >
      {iconSrc && (
        <span className="relative inline-block h-6 w-6">
          <Image src={iconSrc} alt="" fill />
        </span>
      )}
      {children}
    </button>
  );
};

export const AddContactButton = ({
  children,
  className,
  forwardedRef,
  ...props
}: AddContactButtonProps) => {
  return (
    <button
      {...{ ref: forwardedRef }}
      className={`type-body relative rounded-full bg-gradient-to-b from-add-contact-border-1 to-add-contact-border-2 ${
        className || ""
      }`}
      {...props}
    >
      <span className="absolute top-0 left-0 z-10 h-full w-full rounded-full bg-white opacity-0 transition-opacity hover:opacity-[4%]"></span>
      <div className="relative m-[1px] flex h-[40px] w-max items-center justify-center gap-2 rounded-full bg-gradient-to-b from-add-contact-base-1 to-add-contact-base-2  pl-[12px] pr-[16px]">
        <span className="relative inline-block h-6 w-6">
          <Image src="/icons/Add.svg" alt="icon" fill />
        </span>
        {children}
      </div>
    </button>
  );
};
