import { ROCK_TYPES } from '@/types/ROCK_TYPES'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'

// Might try reconstructing this with a loop later.
export const ROCK_DATA = {
  POLISH_CYCLE_NEXT: {
    [POLISH_CYCLES.UNPOLISHED]: POLISH_CYCLES.COARSE,
    [POLISH_CYCLES.COARSE]: POLISH_CYCLES.FINE,
    [POLISH_CYCLES.FINE]: POLISH_CYCLES.PREPOLISH,
    [POLISH_CYCLES.PREPOLISH]: POLISH_CYCLES.POLISH,
    [POLISH_CYCLES.POLISH]: POLISH_CYCLES.UNPOLISHED
  },
  POLISH_CYCLE_TIMES: {
    [POLISH_CYCLES.UNPOLISHED]: 7,
    [POLISH_CYCLES.COARSE]: 7,
    [POLISH_CYCLES.FINE]: 3,
    [POLISH_CYCLES.PREPOLISH]: 3,
    [POLISH_CYCLES.POLISH]: 0
  },
  [ROCK_TYPES.LAPIZ_LAZULI]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/unpolished1.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/lapis_lazuli/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/lapis_lazuli/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/lapis_lazuli/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/lapis_lazuli/polish.svg')
    }
  },
  [ROCK_TYPES.JADE]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/unpolished1.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/jade/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/jade/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/jade/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/jade/polish.svg')
    }
  },
  [ROCK_TYPES.OBSIDIAN]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/unpolished2.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/obsidian/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/obsidian/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/obsidian/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/obsidian/polish.svg')
    }
  }
}
