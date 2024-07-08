import React from "react";
import HeaderLeft from "./HeaderLeft/HeaderLeft";
import HeaderRight from "./HeaderRight/HeaderRight";

export default function Header() {
  return (
    <div className="grid grid-cols-12 h-[50px]">
      <HeaderLeft />
      <HeaderRight />
    </div>
  );
}
