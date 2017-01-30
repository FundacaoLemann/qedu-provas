import * as _ from 'lodash';

export function camelize (str: string): string {
  return _.camelCase(str);
}

export function camelizeObject (obj: Object): any {

  for ( let key in obj ) {
    let camelizedKey = camelize(key);

    if(camelizedKey !== key) {
      obj[camelizedKey] = obj[key];
      delete obj[key];
    }

    if(typeof obj[camelizedKey] === 'object') {
      obj[camelizedKey] = camelizeObject(obj[camelizedKey]);
    }
  }

  return obj;
}


export default {
  camelize: camelize,
  camelizeObject: camelizeObject
}