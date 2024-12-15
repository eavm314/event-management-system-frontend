export const getImageUrl = (base64: string) => {
  const chars = atob(base64);
  const byteNumbers = new Array(chars.length);
  for (let i = 0; i < chars.length; i++) {
    byteNumbers[i] = chars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/jpeg' });

  return URL.createObjectURL(blob);
}