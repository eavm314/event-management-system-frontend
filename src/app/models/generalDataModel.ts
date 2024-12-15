export interface GeneralDataModel {
  code: string;
  name: string;
  description: string;
}

export interface DataMapModel {
  [code: string]: GeneralDataModel;
}

export const toMap = (data: GeneralDataModel[]): DataMapModel => {
  const newMap: DataMapModel = {};
  data.forEach(d => newMap[d.code] = d);
  return newMap;
}