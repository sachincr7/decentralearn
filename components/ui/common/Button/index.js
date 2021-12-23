import React from "react";

const BUTTON_SIZE = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xs: "btn-xs",
};

const VARIANT = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
  ghost: "btn-ghost",
  base: "btn-base",
};

const Button = ({
  children,
  className,
  size = "md",
  hoverable = true,
  variant = "",
  ...rest
}) => {
  const sizeClass = BUTTON_SIZE[size];
  const variantClass = VARIANT[variant];

  return (
    <button
      {...rest}
      className={`btn  ${sizeClass} ${className} ${variantClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
