export type TCreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

export type TNullable<T = string> = T | null;

export type TResource = Record<string, string | undefined>;

export type TModify<T, R> = Omit<T, keyof R> & R;

export type TOnly<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

export type TEither<T, U> = TOnly<T, U> | TOnly<U, T>;
