"use client";
import React from "react";
import { PageInfo } from "../../models/pageInfoModel";
import { useRouter } from "next/navigation";

interface Props {
  option: PageInfo;
}

const OptionNavbar = ({ option }: Props) => {
  const router = useRouter();
  const { pageName, route } = option;
  return (
    <label
      className="mx-5 cursor-pointer"
      onClick={() => router.push(`${route}`)}
    >
      {pageName}
    </label>
  );
};

export default OptionNavbar;
