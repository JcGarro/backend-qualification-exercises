export type Value = string | number | boolean | null | undefined |
  Date | Buffer | Map<unknown, unknown> | Set<unknown> |
  Array<Value> | { [key: string]: Value };

/**
 * Transforms JavaScript scalars and objects into JSON
 * compatible objects.
 */
export function serialize(value: Value): Value {
  /**
   * insert your code here
   */
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ||  value === null || typeof value === 'undefined' ){
    return value;
  }
  else if (value instanceof Map ){
    const sMap: { __t: 'Map', __v: [any, any][] } = {
      __t: 'Map',
      __v: Array.from(value.entries()),
    };
    return sMap;
  }  
  else if (value instanceof Set ){
    const sSet: { __t: 'Set', __v: any[] } = {
      __t: 'Set',
      __v: Array.from(value),
    };
    return sSet;
  }  
  else if (value instanceof Buffer ){
    const sBuf: { __t: 'Buffer', __v: number[] } = {
      __t: 'Buffer',
      __v: Array.from(value),
    };
    return sBuf;
  }
  else if (value instanceof Date ){
    const sDate: { __t: 'Date', __v: number } = {
      __t: 'Date',
      __v: value.getTime(),
    };
    return sDate;
  }  
  else if (Array.isArray(value)) {
    const num : Value[] = value;
    return num.map(item => serialize(item));
  } 
  else if (typeof value === "object" || !Array.isArray(value)){
    const item: any = {};
    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        item[key] = serialize(value[key]); 
      }
    }
    return item; 
  }
} 

/**
 * Transforms JSON compatible scalars and objects into JavaScript
 * scalar and objects.
 */
export function deserialize<T = any>(value: any): any {
  /**
   * insert your code here
   */
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ||  value === null || typeof value === 'undefined' ){
    return value; 
  }
  
  else if (value.__t === 'Map') {
    return new Map (value.__v);
  }
  else if (value.__t === 'Set') {
    return new Set (value.__v);
  } 
  else if (value.__t === 'Buffer') {
    return  Buffer.from(value.__v);
  } 
  else if (value.__t === 'Date') {
    return  new Date (value.__v);
  }
  else if (Array.isArray(value)) {
    const nums : Value[] = value;
    return nums.map(item => deserialize(item));
  }
  else if (typeof value === "object" || !Array.isArray(value)){
    const item: any = {};
    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        item[key] = deserialize(value[key]); 
      }
    }
    return item;
  }
}