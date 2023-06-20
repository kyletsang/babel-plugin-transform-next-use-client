"use client";

import { createContext, useContext } from "react";
const MyContext = /*#__PURE__*/ createContext(null);
function Component() {
  useContext(MyContext);
  return null;
}
export default Component;