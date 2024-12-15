"use client";
import React from "react";

interface Props {
  textLeft?: string;
  textLink: string;
  textRight?: string;
  action: () => void;
}

const LinkRedirector = ({ textLeft, textLink, textRight, action }: Props) => {
  return (
    <p className="m-2 p-1 text-base">
      {textLeft && `${textLeft}`}
      {` `}
      <span
        onClick={action}
        className="ml-2 font-medium text-blue-900 cursor-pointer"
      >
        {textLink}
      </span>
      {` `}
      {textRight && `${textRight}`}
    </p>
  );
};

export default LinkRedirector;
