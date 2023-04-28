import { PropType } from 'vue';

export type TContext<Type = unknown> = Required<Record<string, Type>>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type TCompType<S, _V> = PropType<S>;
