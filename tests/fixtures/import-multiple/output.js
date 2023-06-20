"use client";

import { useEffect, useReducer, useState } from "react";
function Component() {
  const [state] = useState("Hello");
  useReducer(() => {}, {});
  useEffect(() => {}, []);
  return /*#__PURE__*/ React.createElement("div", null, state);
}
export default Component;