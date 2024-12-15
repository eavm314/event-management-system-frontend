export const calculateState = (startDate: Date, endDate?: Date): string => {
  const now = Date.now();

  if (now < new Date(startDate).getTime()){
    return "No iniciado";
  }
  if (!endDate || now < new Date(endDate).getTime()){
    return "En curso";
  }

  return "Finalizado";
}