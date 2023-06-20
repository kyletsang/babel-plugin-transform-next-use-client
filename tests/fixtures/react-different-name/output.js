"use client";

import * as CustomReact from "react";
function Component() {
  const [state] = CustomReact.useState("Hello");
  return /*#__PURE__*/ React.createElement("div", null, state);
}
export default Component;