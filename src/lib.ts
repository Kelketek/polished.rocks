import Rock from '@/plugins/types/Rock'
import { v4 as uuidv4 } from 'uuid'
import { ROCK_TYPES } from '@/plugins/types/ROCK_TYPES'

// https://stackoverflow.com/questions/44230998/how-to-get-a-random-enum-in-typescript
function randomEnum<T> (anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  const randomEnumValue = enumValues[randomIndex]
  return randomEnumValue
}

export const makeRock = (): Rock => ({
  id: uuidv4(),
  type: randomEnum(ROCK_TYPES),
  createdOn: new Date().toISOString(),
  finishedOn: null
})
