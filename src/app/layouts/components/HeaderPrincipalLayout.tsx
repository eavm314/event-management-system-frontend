"use client";
import React from "react";
import EditableImage from "../../components/EditableImage";
import Logo from "@/public/Logo.png";
import NavBarOptions from "./NavBarOptions";
import Link from "next/link";

const HeaderPrincipalLayout = () => {
  return (
    <header className="w-full flex justify-between p-3">
      <Link href={"/"}>
        <EditableImage
          urlImg={Logo}
          styles={"w-[208px] h-[68px]"}
          imageTitle={"Logo Upb"}
        />
      </Link>
      <NavBarOptions />
    </header>
  );
};

export default HeaderPrincipalLayout;
