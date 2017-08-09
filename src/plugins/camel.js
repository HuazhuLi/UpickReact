/**
 * Created by faraway on 17-8-9.
 */
export default (obj) => {
  function type () {
    return Object.prototype.toString.call(this).slice(8, -1)
  }
  function isArray (elem) {
    return type.call(elem) === 'Array'
  }
  function isObject (elem) {
    return type.call(elem) === 'Object'
  }
  function copy (obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    let name
    let target = isArray(obj) ? [] : {}
    let value
    for (name in obj) {
      value = obj[name]
      if (value === obj) {
        continue
      }
      if ((isArray(value) || isObject(value))) {
        target[toCamel(name)] = copy(value)
      } else {
        target[toCamel(name)] = value
      }
    }
    return target
  }
  function toCamel (str) {
    return str.replace(/_([a-z])/g, (m, w) => {
      return w.toUpperCase()
    })
  }
  return (copy(obj))
}
