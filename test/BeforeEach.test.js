import { beforeEach, describe, expect, test } from '../src/index.js'

describe('beforeEach(() => {})', () => {
  let fixture;
  beforeEach(() => {
    fixture = {}
  })

  test('test', () => {
    expect(fixture).toBeDefined()
  })
})
