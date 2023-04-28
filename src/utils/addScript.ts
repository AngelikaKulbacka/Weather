type TAttrs = {
  [key: string]: boolean | string;
};

/**
 * It creates a script element, sets the src attribute, and appends it to the body.
 * @param {string} src - string - the source of the script
 * @param {TAttrs} attrs - object - attrs of script
 * @returns The script element that was created.
 */

export const addScript = (src: string, attrs?: TAttrs) => {
  const s = document.createElement('script');
  s.setAttribute('src', src);
  if (!attrs?.type) {
    s.setAttribute('type', 'text/javascript');
  }
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) =>
      s.setAttribute(key, `${value}`)
    );
  }

  document.body.appendChild(s);

  return s;
};
