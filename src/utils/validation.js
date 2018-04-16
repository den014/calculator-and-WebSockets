/*eslint-disable */
// Чистим и отдаем результат - цифры и одна точка
export const validateNumber = value => value.replace(/[^.\d]+/g, '').replace(/^([^\.]*\.)|\./g, '$1');

// Чистим и отдаем один символ из: +-*/
export const validateOperator = value => value[0].replace(/[^+\-\*\/]/, '');
