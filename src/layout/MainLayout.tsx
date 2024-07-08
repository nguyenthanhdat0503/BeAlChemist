import React from "react";
import Header from "../components/Header/Header";

interface Props {
  children: React.ReactNode;
}
export default function MainLayout({ children }: Props) {
  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="h-screen-minus-50">{children}</div>
    </div>
  );
}
