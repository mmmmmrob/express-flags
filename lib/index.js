'use strict'

const autoparse = require('auto-parse')

function extractMatchingFlags (coll, envRegex) {
  return Object.keys(coll)
    .filter(k => envRegex.test(k))
    .reduce((obj, key) => {
      const newKey = key.replace(envRegex, '')
      obj[newKey] = autoparse(coll[key])
      return obj
    }, {})
}

module.exports = opts => {
  const baseFlags = opts.flags
  const envFlags = opts.env ? extractMatchingFlags(process.env, opts.env) : {}
  const useFlags = Object.assign({}, baseFlags, envFlags)

  return req => {
    const cookieFlags = opts.cookies
      ? extractMatchingFlags(req.cookies || {}, opts.cookies)
      : {}
    req.flags = Object.assign({}, useFlags, cookieFlags)
  }
}
