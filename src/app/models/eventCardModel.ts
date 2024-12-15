import { StaticImageData } from "next/image";

export interface EventCardModel {
  codEvent: string;
  name: string;
  image: string | StaticImageData;
  description?: string;
  area: string;
  startDate: Date;
  endDate?: Date;
  canEnroll: number;
}