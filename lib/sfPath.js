// This is of course a bit silly. And should be refactored.
import {parse, stringify, normalize} from 'objectpath';

let name = function(key, separator, formName, omitNumbers) {
  if(key) {
    var fieldKey = key;
    var fieldSeparator = separator || '-';

    if(omitNumbers){
      fieldKey = fieldKey.filter(function(key){
        return  typeof key !== 'number';
      });
    };

    return ((formName)
      ? formName + fieldSeparator
      : ''
    ) + fieldKey.join(fieldSeparator);
  };

  return '';
};

export { parse, stringify, normalize, name };
