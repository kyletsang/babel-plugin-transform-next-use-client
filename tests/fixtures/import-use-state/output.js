"use client";

import { useState } from "react";
function Component() {
  const [state] = useState("Hello");
  return /*#__PURE__*/ React.createElement("div", null, state);
}
export default Component;