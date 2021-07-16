import { POLISH_CYCLES } from '@/plugins/types/POLISH_CYCLES'
import Rock from '@/plugins/types/Rock'
import { Version } from '@/plugins/types/Version'

export interface RockState {
  version: Version,
  cycle: POLISH_CYCLES,
  running: boolean,
  nextStop: string,
  rockLists: {
    tumbling: Rock[],
    outdoor: Rock[],
    polished: Rock[],
  }
}
