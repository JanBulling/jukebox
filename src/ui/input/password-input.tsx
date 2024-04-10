"use client";

import React from "react";

import { Input } from "@/ui/input";
import { Icon } from "@/ui/icons";

const PasswordInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  Omit<React.ComponentPropsWithoutRef<typeof Input>, "right">
>(({ ...props }, ref) => {
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <Input
      ref={ref}
      icon={props.icon && <Icon icon='Lock' />}
      type={visible ? "text" : "password"}
      right={
        visible ? (
          <Icon
            icon='Eye'
            size={16}
            className='cursor-pointer text-gray hover:scale-105'
            onClick={() => setVisible(false)}
          />
        ) : (
          <Icon
            icon='EyeOff'
            size={16}
            className='cursor-pointer text-gray hover:scale-105'
            onClick={() => setVisible(true)}
          />
        )
      }
      {...props}
    />
  );
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
