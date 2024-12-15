"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

const MyCoursesLayout = ({ children }: Props) => {
  return (
    <section className="flex flex-col w-full min-h-screen bg-slate-200 items-center">
      {children}
    </section>
  );
};

export default MyCoursesLayout;
