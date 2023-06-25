"use client";

import { useCustomHook } from "my-custom-hook";
function Component() {
  useCustomHook("Hello");
  return null;
}
export default Component;