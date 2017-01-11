import {single} from 'validate.js';


export function validatorFactory(validationName, options = {}) {
  return function (control) {
    if (single(control.value, options)) {
      return {[validationName]: true};
    }
  };
}
