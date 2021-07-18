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
    },
    bio: 'Is it cheesy to say that you lapis-light up my life. You rock my would! I just wished the barrier reef was as Blue as you.',
    profile: 'Blue, had been used by civilizations for over 6,500 years, often used as makeup and sculpture, positively influences friendship and honesty'
  },
  [ROCK_TYPES.JADE]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/unpolished1.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/jade/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/jade/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/jade/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/jade/polish.svg')
    },
    bio: 'She is a happy-go-lucky, 12 year old girl, and the niece of Jackie Chan.Even know she might be a little bit green!',
    profile: 'Green, used in jewelry and weapons, as valuable in Diamonds in China, large market for fake jade, believed by some to prevent illness'
  },
  [ROCK_TYPES.OBSIDIAN]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/unpolished2.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/obsidian/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/obsidian/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/obsidian/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/obsidian/polish.svg')
    },
    bio: 'What did the boy volcano say to the girl volcano? Really lave you! Your glasses are blacker than my blackboard to see.',
    profile: 'Black, Formed in cooled volcano flows, has a glassy luster, harder than window glass, was used to make sharp artifacts such as arrowheads'
  },
  [ROCK_TYPES.MARBLE]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/marble/unpolished.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/marble/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/marble/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/marble/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/marble/polish.svg')
    },
    bio: 'One of the Catholic Church Pope’s hated the male status with the long dongs? But the church loves the little kids one.',
    profile: 'Actually metamorphosed limestone so not as it appears, Used in classic Greek sculptures, Never stops changing'
  },
  [ROCK_TYPES.RUBY]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/ruby/unpolished.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/ruby/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/ruby/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/ruby/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/ruby/polish.svg')
    },
    bio: 'I’ll have another Bloody Mary please. Blood coming out of her ears, eyes, and mouth blood coming out of her wherever!',
    profile: 'Red, worn to protect warriors in battle like the slippers in wizard of oz, nearly as hard as diamonds'
  },
  [ROCK_TYPES.ONYX]: {
    assets: {
      [POLISH_CYCLES.UNPOLISHED]: require('./assets/onyx/unpolished.svg'),
      [POLISH_CYCLES.COARSE]: require('./assets/onyx/coarse.svg'),
      [POLISH_CYCLES.FINE]: require('./assets/onyx/fine.svg'),
      [POLISH_CYCLES.PREPOLISH]: require('./assets/onyx/prepolish.svg'),
      [POLISH_CYCLES.POLISH]: require('./assets/onyx/polished.svg')
    },
    bio: 'The band concert tonight is allowing flesh-colored earplugs only. These kids have feelings too.',
    profile: 'Is thought to increase regeneration, happiness, intuition, instincts and also believed to decrease sexual desire and helps to change bad habits.'
  }
}

// These constants map to keys that can be pressed on the keyboard.
// Up, up, down, down, left, right, left, right, b, a, enter
export const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13]

export const CREW_DATA = {
  FOX: {
    PHOTO_PATH: require('./assets/crew_photos/fox.jpg'),
    BLURB: 'Fox Piacenti is a software solutions architect and generalist. He runs Artconomy.com, a website that makes it easy for you to get art commissioned of your original characters. His bachelor party was to make the app you’re looking at in less than three days! Fox enjoys ambitious projects, art, software, and thoughtful conversations about power structures and organizational design.',
    TITLE: 'Founder & CEO',
    LINK: 'https://www.artconomy.com',
    FIRST_NAME: 'Fox',
    LAST_NAME: 'Piacenti'
  },
  JOE: {
    PHOTO_PATH: require('./assets/crew_photos/joe.jpg'),
    BLURB: 'Joseph is a career musical artist, producer, and teacher. His music is available across streaming platforms under the moniker “Joseph Daniel”. Joseph’s hobbies include video games, weight lifting, and sarcasm.',
    TITLE: 'Animator & Sound Engineer',
    LINK: 'https://www.instagram.com/thejosephdaniel',
    FIRST_NAME: 'Joseph Daniel',
    LAST_NAME: 'Piacenti'
  },
  JEREMY: {
    PHOTO_PATH: require('./assets/crew_photos/jeremy.jpg'),
    BLURB: 'A barker of incredibly unhealthy food that is so addictive that parents can’t help feeding it to their children and parents themselves can’t help but eat it too. It’s sugar is more addictive than cocaine, It’s the most legal drug.',
    TITLE: 'Visual Artist',
    LINK: 'https://polished.rocks',
    FIRST_NAME: 'Jeremy',
    LAST_NAME: 'Evans'
  },
  BRAD: {
    PHOTO_PATH: require('./assets/crew_photos/brad.jpg'),
    BLURB: 'Bradley is a professional photographer who is always tired. He likes experimental grindcore, intentionally boring video games, and checking your vibe.',
    TITLE: 'Designer',
    LINK: 'https://polished.rocks',
    FIRST_NAME: 'Brad',
    LAST_NAME: 'Rogers'
  },
  COREY: {
    PHOTO_PATH: require('./assets/crew_photos/corey.jpg'),
    BLURB: 'Corey is a builder. He enjoys making his life better through software, home automation, IoT devices, and general construction. Corey’s recent projects include this app, a device to keep cats away from Christmas trees, and a closet renovation.',
    TITLE: 'Software Engineer',
    LINK: 'https://www.github.com/cjames9001',
    FIRST_NAME: 'Corey',
    LAST_NAME: 'Pon'
  },
  TAYLOR: {
    PHOTO_PATH: require('./assets/crew_photos/taylor.jpg'),
    BLURB: 'Taylor has been working as a software engineer for 3 years.  Before that, he built particle accelerators and underwater computers as an electronics engineer.  Taylor is always striving to challenge himself both professionally and in his personal life.  His interests include robots, gummy bears, and sushi.',
    TITLE: 'Software Engineer',
    LINK: 'https://github.com/taylorglenn',
    FIRST_NAME: 'Taylor',
    LAST_NAME: 'Glenn'
  }
}
console.log(CREW_DATA)
console.log(ROCK_DATA)
