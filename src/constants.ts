import { ROCK_TYPES } from '@/types/ROCK_TYPES'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'

export const ROCK_DATA = {
  [ROCK_TYPES.LAPIZ_LAZULI]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/unpolished_rock_1.svg'),
      [POLISH_CYCLES.COURSE]: require('./assets/lapis_lazuli/course.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/lapis_lazuli/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/lapis_lazuli/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/lapis_lazuli/polish.svg')
    }
  },
  [ROCK_TYPES.JADE]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/unpolished_rock_1.svg'),
      [POLISH_CYCLES.COURSE]: require('./assets/jade/course.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/jade/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/jade/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/jade/polish.svg')
    }
  }
}
