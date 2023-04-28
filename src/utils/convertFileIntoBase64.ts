export const convertFileIntoBase64 = async (file: File) => {
  const reader = new FileReader();

  await new Promise((resolve) => {
    reader.readAsDataURL(file);
    reader.onload = async () => {
      // @ts-ignore
      reader.result;

      await resolve(reader.result);
    };
  });

  return await new Promise<string>((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(null);
      }
    };
  });
};
