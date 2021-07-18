import Rock from '@/types/Rock'
import { v4 as uuidv4 } from 'uuid'
import { ROCK_TYPES } from '@/types/ROCK_TYPES'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'
import { KONAMI_CODE, ROCK_DATA } from '@/constants'
import { Store } from 'vuex'
import { RockState } from '@/types/RockState'

function randomEnum<T extends {[key: string]: T[keyof T]}> (anEnum: T): T[keyof T] {
  const keys = Object.keys(anEnum) as string[]
  const index = Math.floor(Math.random() * keys.length)
  const key = keys[index] as string
  return anEnum[key]
}

export const makeRock = (presets?: Partial<Rock>): Rock => ({
  id: uuidv4(),
  type: randomEnum(ROCK_TYPES),
  createdOn: new Date().toISOString(),
  finishedOn: null,
  ...presets
})

export const generateRockPlacement = (rocks: Array<Rock>, lowerBound: number, upperBound: number, boundaryReductionFactor: number): { [key: string]: number } => {
  const randomArray = (length: number, min: number, max: number) => Array(length).fill(0).map(() => Math.round(Math.random() * (max - min) + min))
  const mapToObject = (arrayToMap: Array<number>) : { [key: string]: number } => {
    return arrayToMap.reduce((acc: { [key: string]: number}, current: number, index) => {
      acc[rocks[index].id] = current
      return acc
    }, {})
  }

  return mapToObject(randomArray(rocks.length, lowerBound, upperBound - boundaryReductionFactor * upperBound))
}

export const assetForRockAtStage = (rock: Rock, stage: POLISH_CYCLES): string => ROCK_DATA[rock.type].assets[stage]

export const profileForRock = (rock: Rock): string => ROCK_DATA[rock.type].profile

export const godModeListener = (store: Store<RockState>) =>
  (event: KeyboardEvent): void => {
    event = event || window.event

    window.keybuffer.push(event.keyCode)
    if (window.keybuffer.length > KONAMI_CODE.length) {
      // to prevent a big ass keybuffer array
      window.keybuffer.pop()
    }

    if (JSON.stringify(window.keybuffer) === JSON.stringify(KONAMI_CODE)) {
      console.log('Godmode enabled.')
      store.commit('setGodmode', true)
    }
  }
