import React from "react";
import HeaderPrincipalLayout from "./components/HeaderPrincipalLayout";
import MainContainter from "./components/MainContainter";

interface Props {
  children: React.ReactNode;
}

const PrincipalLayout = ({ children }: Props) => {
  return (
    <section className="flex flex-col">
      <HeaderPrincipalLayout />
      <MainContainter>{children}</MainContainter>
    </section>
  );
};

export default PrincipalLayout;
