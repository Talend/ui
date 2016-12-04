import { parse, stringify, normalize } from 'objectpath';

const name = function(key, separator, formName, omitNumbers) {
  if(key) {
    var fieldKey = key.slice();
    var fieldSeparator = separator || '-';

    if(omitNumbers){
      fieldKey = fieldKey.filter(function(key){
        return  typeof key !== 'number';
      });
    };

    return ((formName) ? formName + fieldSeparator : '') + fieldKey.join(fieldSeparator);
  };

  return '';
};

export { name, parse, stringify, normalize };
