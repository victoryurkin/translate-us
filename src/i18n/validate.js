const en = require('./en/translations.json');
const es = require('./es/translations.json');
const pl = require('./pl/translations.json');
const ru = require('./ru/translations.json');
const ua = require('./ua/translations.json');

const validate = (object, base, indent, keys) => {
  const baseObject = base || en;
  Object.keys(baseObject).forEach(key => {
    if (!object[key]) {
      keys && console.log(keys);
      console.log(Array(indent || 0).join(' '), key);
    } else {
      if (typeof baseObject[key] === 'object') {
        validate(
          object[key],
          baseObject[key],
          (indent || 0) + 4,
          `${keys || ''}${keys ? '.' : ''}${key}`,
        );
      }
    }
  });
};

validate(ua);
