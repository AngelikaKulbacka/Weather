import { h, VNode, VNodeProps } from 'vue';

const defaultOptions = {
  tag: 'span',
  attrs: {},
};

interface IConvertOptions {
  tag: string;
  attrs?: VNodeProps & Record<string, any>;
}

/**
 * It takes a string or number and returns a VNode
 * @param {string | number} value - string | number
 * @param {IConvertOptions} defaultOptions - { tag: 'span', attrs: { class: 'text' } }
 */
export const convertStringIntoVNode = (
  value: string | number,
  { tag, attrs }: IConvertOptions = defaultOptions
): VNode => h(tag, attrs, value);
