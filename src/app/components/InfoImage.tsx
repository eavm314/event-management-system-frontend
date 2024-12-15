import Image, { StaticImageData } from "next/image";
import { Component, ReactNode } from "react";
import EditableImage from "./EditableImage";

interface Props {
  children?: ReactNode;
  urlImage?: string | StaticImageData;
  imageTitle: string;
  reverse?: boolean;
  classNameImage?: string;
  rounded?: boolean;
}

const InfoImage = ({
  children,
  urlImage,
  imageTitle,
  reverse,
  classNameImage,
  rounded,
}: Props) => {
  return (
    <div className={`${rounded && "rounded-lg shadow-lg"} bg-slate-100`}>
      <div
        className={`flex ${reverse ? "flex-row-reverse" : ""} justify-between`}
      >
        {children}
        <div className={classNameImage}>
          <Image
            className={`${rounded && "rounded-lg shadow-lg"}`}
            src={urlImage ?? "/NoImage.jpg"}
            alt={imageTitle}
            width={800}
            height={800}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoImage;
