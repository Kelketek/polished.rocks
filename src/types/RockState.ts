import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'
import Rock from '@/types/Rock'
import { Version } from '@/types/Version'

export interface RockState {
  version: Version,
  cycle: POLISH_CYCLES,
  running: boolean,
  nextStop: string,
  rockLists: {
    tumbling: Rock[],
    outside: Rock[],
    polished: Rock[],
  }
}
