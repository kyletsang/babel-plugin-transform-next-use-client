"use client";

import * as React from "react";
function Component() {
  const [state] = React.useState("Hello");
  return /*#__PURE__*/ React.createElement("div", null, state);
}
export default Component;