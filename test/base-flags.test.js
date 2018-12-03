'use strict'

const expressFlags = require('../lib/index.js')

describe('express-flags', () => {
  const testFlags = {
    flags: {
      foo: 'bar',
      baz: true,
      qux: 7
    }
  }

  it('should return a fn when initialised', () => {
    const flagFn = expressFlags(testFlags)
    expect(flagFn).toBeDefined()
    expect(flagFn).not.toBeNull()
    expect(flagFn).toBeInstanceOf(Function)
  })

  it('should set flags in flags on req', () => {
    const flagFn = expressFlags(testFlags)
    const req = {}
    flagFn(req)
    expect(req.flags).not.toBeNull()
    expect(req.flags).toBeDefined()
  })

  it('should set string values', () => {
    const flagFn = expressFlags(testFlags)
    const req = {}
    flagFn(req)
    expect(req.flags.foo).toEqual('bar')
  })

  it('should set boolean values', () => {
    const flagFn = expressFlags(testFlags)
    const req = {}
    flagFn(req)
    expect(req.flags.baz).toEqual(true)
  })

  it('should set numeric values', () => {
    const flagFn = expressFlags(testFlags)
    const req = {}
    flagFn(req)
    expect(req.flags.qux).toEqual(7)
  })
})
