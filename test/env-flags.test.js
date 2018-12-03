'use strict'

const expressFlags = require('../lib/index.js')

const baseFlags = {
  env: /^FLAG_/,
  flags: {
    foo: 'bar',
    baz: true,
    qux: 7,
    not_overriden: true
  }
}

const [req, res] = [{}, {}]

describe('express-flags', () => {
  beforeAll(() => {
    process.env.FLAG_foo = 'qip'
    process.env.FLAG_qip = 'true'
    process.env.FLAG_qux = '9'
    process.env.NOT_A_FLAG_quux = 'enabled'
    const flagFn = expressFlags(baseFlags)
    flagFn(req, res, () => {})
  })

  afterAll(() => {
    delete process.env.FLAG_foo
    delete process.env.FLAG_qip
    delete process.env.FLAG_qux
    delete process.env.NOT_A_FLAG_quux
  })

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
})
