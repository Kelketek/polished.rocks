import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'
import Rock from '@/types/Rock'
import { Version } from '@/types/Version'

export interface RockState {
  version: Version,
  cycle: POLISH_CYCLES,
  running: boolean,
  nextStop: string,
  washed: boolean,
  godmode: boolean,
  rockLists: {
    tumbling: Rock[],
    outside: Rock[],
    polished: Rock[],
  }
}
