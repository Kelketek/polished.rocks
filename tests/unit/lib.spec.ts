import { generateRockPlacement, makeRock } from '@/lib'
import Rock from '@/types/Rock'

let rocks: Array<Rock> = []

describe('generateRockPlacement', () => {
  beforeEach(() => {
    rocks = []
  })
  it('Handles empty array', () => {
    const result = generateRockPlacement(rocks, 0, 0, 0)
    expect(result).toEqual({})
  })
  it('Contains id placement for single rock', () => {
    rocks = [makeRock()]
    const result = generateRockPlacement(rocks, 0, 0, 0)
    expect(Object.keys(result)).toEqual(rocks.map(r => r.id))
  })
  it('Contains id placement for multiple rocks', () => {
    rocks = [makeRock(), makeRock(), makeRock()]
    const result = generateRockPlacement(rocks, 0, 0, 0)
    expect(Object.keys(result)).toEqual(rocks.map(r => r.id))
  })
  it('Generates 0 as the value when the bounds are 0-0', () => {
    rocks = [makeRock()]
    const result = generateRockPlacement(rocks, 0, 0, 0)
    expect(result[rocks[0].id]).toEqual(0)
  })
  it('Generates values within the bounds', () => {
    rocks = [makeRock()]
    const result = generateRockPlacement(rocks, -10, 10, 0)
    expect(result[rocks[0].id]).toBeLessThanOrEqual(10)
    expect(result[rocks[0].id]).toBeGreaterThanOrEqual(-10)
  })
})
