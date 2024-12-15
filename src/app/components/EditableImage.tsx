"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

interface Props {
  urlImg: string | StaticImageData;
  styles?: string;
  imageTitle: string;
  width?: number;
  height?: number;
}

const EditableImage = ({
  urlImg,
  styles,
  imageTitle,
  width,
  height,
}: Props) => {
  return (
    <figure className={styles}>
      {width && height ? (
        <Image
          src={urlImg}
          className={styles}
          alt={imageTitle}
          width={width}
          height={height}
        />
      ) : (
        <Image src={urlImg} className={styles} alt={imageTitle} />
      )}
    </figure>
  );
};

export default EditableImage;
