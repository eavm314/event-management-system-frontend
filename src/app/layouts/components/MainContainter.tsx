"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const MainContainter = ({ children }: Props) => {
  return (
    <>
      <main className="min-w-full min-h-screen flex flex-col bg-cover bg-center">
        {children}
      </main>
    </>
  );
};

export default MainContainter;
