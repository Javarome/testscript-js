import { describe, expect } from '../src/index.js'

describe('expect(func).toThrow(error)', () => {
  expect(() => {}).not.toThrow('err')
  expect(() => {
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
})
