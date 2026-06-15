import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  disabled?: boolean;
  type?: never;
  onClick?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-400 text-white hover:bg-brand-500 active:bg-brand-600 focus-visible:ring-brand-300",
  secondary:
    "bg-white text-brand-700 border border-brand-200 hover:bg-brand-50 active:bg-brand-100 focus-visible:ring-brand-200",
  ghost:
    "bg-transparent text-brand-700 hover:bg-brand-50 active:bg-brand-100 focus-visible:ring-brand-200",
  whatsapp:
    "bg-whatsapp text-white hover:bg-[#20bd5a] active:bg-[#1da851] focus-visible:ring-green-300",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href } = rest;
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { href: _, ...buttonProps } = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
