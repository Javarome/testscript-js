import { describe, expect, test } from '../src/index.js'

describe('expect(func).toThrow(error)', () => {
  expect(() => {}).not.toThrow('err')
  expect(() => {
    throw new Error('failed')
  }).toThrow('failed')
  expect(async () => {
    throw new Error('failed')
  }).toThrow('failed')
  expect(() => {
    throw new Error('failed')
  }).toThrow(new Error('failed'))
  expect(() => {
    throw new Error('failed')
  }).not.toThrow('other')
  expect(() => {
    throw new Error('failed')
  }).not.toThrow(new Error('other'))

  test('to throw any', () => {
    expect(() => {
      throw new Error('any')
    }).toThrow()
    expect(() => {
      throw new Error()
    }).toThrow()
    expect(() => {
      throw new Error()
    }).toThrow()
  })
})
