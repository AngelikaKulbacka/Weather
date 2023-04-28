export const convertBase64IntoFile = async (url: string, name = 'file') => {
  return await fetch(url)
    .then((res) => res.blob())
    .then(async (blob) => {
      const file = new File([blob], name, {
        type: blob.type,
      });

      return await file;
    });
};
