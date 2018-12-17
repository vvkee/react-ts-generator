/**
 * createId
 * @author zongqi wei
 */
let counter = 1;
export default (prefix?: string | ((id: number) => string)): string => (
  (typeof prefix === 'function') ?
  prefix(++counter) :
  `${prefix || ''}${++counter}`
);
