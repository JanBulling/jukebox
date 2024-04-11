import { Code as CodeBright } from "bright";
import React from "react";

const Code = React.forwardRef<
  React.ElementRef<typeof CodeBright>,
  React.ComponentPropsWithoutRef<typeof CodeBright>
>(({ lang, theme, ...props }, ref) => (
  <CodeBright
    lang={lang ?? "ts"}
    theme={theme ?? "material-default"}
    {...props}
  />
));
Code.displayName = "Code";

export { Code };
