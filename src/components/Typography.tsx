/*
NOTES:
The components are following the naming convetions `Headline1` instead of `H1` to make sure that we share the same langauge with the designers (who used this terminology in the Figma file).
*/

import type { ForwardedRef, Ref } from "react";

export type TypographyComponentProps<T extends HTMLElement> = {
  children: React.ReactNode;
  className?: T["className"];
};

/**
Headline component

@example
Here's how you can overwrite the default classes of the Headline1 component. Fun fact: Tailwind's autocompletion will work with `Headline1`.
```typescript
<Headline1 className="font-lexend">Font is changed to Lexend</Headline1>
```
*/
export const Headline1 = ({
  children,
  className = "",
}: TypographyComponentProps<HTMLHeadingElement>) => {
  return (
    <h1
      className={`font-glysa text-[32px] font-medium leading-[48px] tracking-[0] ${className}`}
    >
      {children}
    </h1>
  );
};
/* export const Headline1 = forwardRef(
  ({
    ref,
    children,
    className = "",
  }: {
    ref: Ref<HTMLHeadingElement>;
  } & TypographyComponentProps<HTMLHeadingElement>) => {
    return (
      <h1
        ref={ref}
        className={`font-glysa text-[32px] font-medium leading-[48px] tracking-[0] ${className}`}
      >
        {children}
      </h1>
    );
  }
);
Headline1.displayName = "Headline1"; */

export const Headline2 = ({
  children,
  forwardedRef,
  className = "",
}: {
  forwardedRef?: ForwardedRef<HTMLHeadingElement>;
} & TypographyComponentProps<HTMLHeadingElement>) => {
  return (
    <h2
      {...{ ref: forwardedRef }}
      className={`font-glysa text-[24px] font-medium leading-[40px] tracking-[0] ${className}`}
    >
      {children}
    </h2>
  );
};

/* export const Headline2 = forwardRef(
  ({
    ref,
    children,
    className = "",
  }: {
    ref: Ref<HTMLHeadingElement>;
  } & TypographyComponentProps<HTMLHeadingElement>) => {
    return (
      <h2
        ref={ref}
        className={`font-glysa text-[24px] font-medium leading-[40px] tracking-[0] ${className}`}
      >
        {children}
      </h2>
    );
  }
);
Headline2.displayName = "Headline2"; */

export function Headline3({
  children,
  className = "",
}: TypographyComponentProps<HTMLHeadingElement>) {
  return (
    <p
      className={`font-lexend text-[16px] font-normal leading-[24px] tracking-[0.16px] ${className}`}
    >
      {children}
    </p>
  );
}

export function Body({
  children,
  className = "",
}: TypographyComponentProps<HTMLParagraphElement>) {
  // Made a custom Tailwind class for this style,
  // because it's used in the `Button` component as well
  return (
    <span className={`type-body inline-block ${className}`}>{children}</span>
  );
}

export function Message({
  children,
  className = "",
}: TypographyComponentProps<HTMLParagraphElement>) {
  return (
    <span
      className={`font-lexend text-[12px] font-normal leading-[12px] tracking-[0.12px] ${className}`}
    >
      {children}
    </span>
  );
}
