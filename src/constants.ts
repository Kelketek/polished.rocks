import { ROCK_TYPES } from '@/types/ROCK_TYPES'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'

// Might try reconstructing this with a loop later.
export const ROCK_DATA = {
  [ROCK_TYPES.LAPIZ_LAZULI]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/lapis_lazuli/unpolished.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/lapis_lazuli/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/lapis_lazuli/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/lapis_lazuli/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/lapis_lazuli/polish.svg')
    }
  },
  [ROCK_TYPES.JADE]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/jade/unpolished.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/jade/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/jade/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/jade/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/jade/polish.svg')
    }
  },
  [ROCK_TYPES.OBSIDIAN]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/obsidian/unpolished.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/obsidian/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/obsidian/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/obsidian/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/obsidian/polish.svg')
    }
  }
}
