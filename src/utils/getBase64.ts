/**
 * It takes a Blob and a callback function, and returns a FileReader.
 * @param {Blob} img - Blob - The image file to convert to base64
 * @param callback - (base64Url: string) => void
 * @returns The FileReader object.
 */
export function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);

  return reader;
}
