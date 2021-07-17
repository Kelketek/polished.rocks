// This is the Vuex store that will perform global state management. Individual components may have their own localized
// state, but components that need to communicate state to each other, especially ones that can't directly hand state
// via props, or which mutate their parents state, will need to use this store.
// Anything which needs to be persisted between browser reloads should be kept in this store. The rest will be discarded.

import { InjectionKey } from 'vue'
import { Store, createStore, useStore as baseUseStore } from 'vuex'
import { RockState } from '@/types/RockState'
import { Version } from '@/types/Version'
import { POLISH_CYCLES } from '@/types/POLISH_CYCLES'
import deepEqual from 'fast-deep-equal'
import Rock from '@/types/Rock'
import { makeRock } from '@/lib'

declare module '@vue/runtime-core' {
  // Declare our own store state. We actually define the state structure in RockState and then do an empty extension
  // to copy it and keep it the 'correct' name for typing. I'm assuming it needs to be named 'State' here, though
  // I'm not actually sure.
  type State = RockState

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export const injectionKey: InjectionKey<Store<RockState>> = Symbol('injectionKey')

export const currentVersion = (): Version => ({
  // Major, Minor, and Patch might actually be a bit much for schema versioning, but ehhhhh....
  major: 0,
  minor: 1,
  patch: 0
})

export const initialState = (): RockState => ({
  // Note: This is not the application version. This is the state version. Whenever we change the state schema,
  // the version should be changed.
  version: currentVersion(),
  running: false,
  cycle: POLISH_CYCLES.COARSE,
  washed: false,
  rockLists: {
    outside: [],
    polished: [],
    tumbling: []
  },
  nextStop: new Date().toISOString()
})

export const migrate = (oldState: {version: Version}): RockState => {
  if (deepEqual(oldState.version, currentVersion())) {
    return oldState as RockState
  }
  // If we wanted to get fancy, we'd run migration operations here. Just keeping these hooks in place in case we need
  // them, but for now, just start over if the schema changed.
  return initialState()
}

export const retrieveFromStorage = (): RockState => {
  // Hydrate the state from localStorage. If it does not exist, build a new one from scratch.
  const oldState = localStorage.getItem('rockState')
  if (oldState) {
    const retrieved = JSON.parse(oldState) as RockState
    return migrate(retrieved)
  }
  return initialState()
}

export const stateSavePlugin = (store: Store<RockState>): void => {
  // Remove this lint disabling comment when enabling hydration once more.
  // eslint-disable-next-line
  store.subscribe((mutation, state) => {
    // Disabling for now for easier debugging.
    // localStorage.setItem('rockState', JSON.stringify(state))
  })
}

declare type RockCategory = 'tumbling' | 'polished' | 'outside'
declare type RockMovePayload = {sourceList: RockCategory, rocks: Rock[], destList: RockCategory}

const rocksToIds = (rocks: Rock[]) => rocks.map((rock: Rock) => rock.id)

// This initializes our Vuex store, which handles state and state changes. It is able to keep track of these changes
// over time, allowing us to play the state back and forward using debugging tools. The state and these actions
// are accessible from anywhere within the application, so that there is a single source of truth.
export const initializeStore = (): Store<RockState> => {
  return createStore<RockState>(
    {
      // Global state.
      state: retrieveFromStorage(),
      // Mutations are atomic, synchronous state changes.
      mutations: {
        addRocks: (state: RockState, { rockList, rocks }: {rockList: RockCategory, rocks: Rock[]}) => {
          state.rockLists[rockList].push(...rocks)
        },
        removeRocks: (state: RockState, { rocks, rockList }: {rocks: Rock[], rockList: RockCategory}) => {
          const toRemove = rocksToIds(rocks)
          state.rockLists[rockList] = state.rockLists[rockList].filter((rock: Rock) => !toRemove.includes(rock.id))
        },
        forceNeedWash: (state: RockState) => {
          state.washed = false
          state.running = false
          state.rockLists.tumbling = [makeRock()]
        },
        setWashed: (state: RockState, value: boolean) => {
          state.washed = value
        }
      },
      // Actions can do multiple mutations and can also perform asynchronous operations.
      actions: {
        moveRocks: ({ state, commit }, { sourceList, rocks, destList }: RockMovePayload) => {
          const toMoveIds = rocksToIds(rocks)
          // Don't let us move a rock that isn't actually in the source list.
          const movingRocks = state.rockLists[sourceList].filter((rock: Rock) => toMoveIds.includes(rock.id))
          commit('removeRocks', { rockList: sourceList, rocks: movingRocks })
          commit('addRocks', { rockList: destList, rocks: movingRocks })
        }
      },
      plugins: [stateSavePlugin]
    })
}

export const useStore = (): ReturnType<typeof baseUseStore> => {
  return baseUseStore(injectionKey)
}
