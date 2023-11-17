import { beforeEach, describe, test } from '../TestSuite.js';
import { expect } from '../Expression.js';

describe('beforeEach(() => {})', () => {
  let fixture;
  beforeEach(() => {
    fixture = {}
  })

  test('test', () => {
    expect(fixture).toBeDefined()
  })
})
