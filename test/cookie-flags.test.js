'use strict'

const expressFlags = require('../lib/index.js')

const cookies = {
  session: 'gfuhlghuiygbklbhvgvbjhlbuigyuyvhbhjbvuvjhbhjbkj',
  FL_foo: 'qip',
  FL_qip: 'true',
  FL_qux: '9',
  NOT_A_FL_quux: 'enabled'
}

const baseFlags = {
  cookies: /^FL_/,
  flags: {
    foo: 'bar',
    baz: true,
    qux: 7,
    not_overriden: true
  }
}

const flagFn = expressFlags(baseFlags)
const req = { cookies }
flagFn(req)

describe('express-flags', () => {
  it('should set override from env values', () => {
    expect(req.flags.foo).toEqual('qip')
  })

  it('should set boolean values', () => {
    expect(req.flags.qip).toEqual(true)
  })

  it('should set numeric values', () => {
    expect(req.flags.qux).toEqual(9)
  })

  it('should retain base flag values', () => {
    expect(req.flags.not_overriden).toEqual(true)
  })

  it('should not use non-matching keys', () => {
    expect(req.flags.quux).toBeUndefined()
  })

  it('should process request with no cookies', () => {
    const newReq = {}
    flagFn(newReq)
    expect(newReq.flags.foo).toEqual('bar')
  })

  it('should process request with empty cookies', () => {
    const newReq = { cookies: {} }
    flagFn(newReq)
    expect(newReq.flags.foo).toEqual('bar')
  })

  it('should process each request seperately', () => {
    const newReq = { cookies: { FL_foo: 'quux' } }
    flagFn(newReq)
    expect(newReq.flags.foo).toEqual('quux')
  })
})
