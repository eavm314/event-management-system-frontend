"use client";

import React from "react";
import InfoImage from "../../../components/InfoImage";
import { StaticImageData } from "next/image";

interface Props {
  image: string | StaticImageData;
  title: string;
  description: string;
  area: string;
  initDate: string;
  status: string;
  management: string;
}

const MyCourse = ({
  image,
  title,
  description,
  area,
  initDate,
  status,
  management,
}: Props) => {
  const data: string[] = [
    description,
    "Área: " + area,
    "Fecha: " + initDate,
    status,
  ];

  return (
    <div className="w-[600px] flex flex-row justify-center items-center m-5 p-1">
      <div className="mr-5 text-lg font-semibold">{management}</div>
      <div className="rounded-lg">
        <InfoImage
          rounded={true}
          urlImage={image}
          imageTitle={title}
          reverse={true}
          classNameImage="w-[300px] h-[300px]"
        >
          <div className="w-full flex flex-col ml-5 mt-5">
            <h3 className="text-xl font-medium">{title}</h3>
            <>
              {data.map((item, index) => (
                <p key={index + 1} className="text-base mt-5 font-medium">
                  {item}
                </p>
              ))}
            </>
          </div>
        </InfoImage>
      </div>
    </div>
  );
};

export default MyCourse;
