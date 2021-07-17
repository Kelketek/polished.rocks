import { ROCK_TYPES } from '@/types/ROCK_TYPES'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'

export const ROCK_DATA = {
  [ROCK_TYPES.LAPIZ_LAZULI]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/unpolished_rock_1.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/lapis_lazuli/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/lapis_lazuli/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/lapis_lazuli/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/lapis_lazuli/polish.svg')
    }
  },
  [ROCK_TYPES.JADE]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/unpolished_rock_1.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/jade/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/jade/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/jade/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/jade/polish.svg')
    }
  }
}

export const CREW_DATA = {
  PHOTO_PATH: {
    FOX: require('./assets/crew_photos/fox.jpg'),
    JOE: require('./assets/crew_photos/joe.jpg'),
    JEREMY: require('./assets/crew_photos/jeremy.jpg'),
    BRAD: require('./assets/crew_photos/brad.jpg'),
    COREY: require('./assets/crew_photos/corey.jpg'),
    TAYLOR: require('./assets/crew_photos/taylor.jpg')
  }
}
console.log(CREW_DATA)
console.log(ROCK_DATA)
