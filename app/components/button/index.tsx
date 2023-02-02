"use client";
import { Button as MantineButton, ButtonStylesParams, Styles } from "@mantine/core";

function Button({
  children,
  variant,
  styles,
}: {
  children: React.ReactNode;
  styles?:
    | Styles<
        "root" | "icon" | "leftIcon" | "rightIcon" | "centerLoader" | "inner" | "label",
        ButtonStylesParams
      >
    | undefined;
  variant?:
    | "filled"
    | "outline"
    | "light"
    | "gradient"
    | "white"
    | "default"
    | "subtle"
    | undefined;
}) {
  return (
    <MantineButton styles={styles} variant={variant}>
      {children}
    </MantineButton>
  );
}

export default Button;
