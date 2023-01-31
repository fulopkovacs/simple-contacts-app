/*
NOTES:
The components are following the naming convetions `Headline1` instead of `H1` to make sure that we share the same langauge with the designers (who used this terminology in the Figma file).
*/

import { DetailedHTMLProps, HTMLAttributes } from "react";

type TypographyComponentProps<T extends HTMLElement> = {
  children: React.ReactNode;
} & DetailedHTMLProps<HTMLAttributes<T>, T>;

/**
Headline component

@example
Here's how you can overwrite the default classes of the Headline1 component. Fun fact: Tailwind's autocompletion will work with `Headline1`.
```typescript
<Headline1 className="font-lexend">Font is changed to Lexend</Headline1>
```
*/
export function Headline1({
  children,
  className = "",
}: TypographyComponentProps<HTMLHeadingElement>) {
  return (
    <h1
      className={`font-glysa text-[32px] font-medium leading-[48px] tracking-[0] ${className}`}
    >
      {children}
    </h1>
  );
}

export function Headline2({
  children,
  className = "",
}: TypographyComponentProps<HTMLHeadingElement>) {
  return (
    <h2
      className={`font-glysa text-[24px] font-medium leading-[40px] tracking-[0] ${className}`}
    >
      {children}
    </h2>
  );
}

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
  /*
  NOTE: Made a custom Tailwind class for this style,
  to reuse it in the `Button` component. Check out the
  `src/styles/globals.css` file for the `type-body` class.
  */
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
