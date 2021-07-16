import { makeRock } from '@/lib'
import { initialState, retrieveFromStorage } from '@/plugins/store'

let store: {[key: string]: string|null} = {}

const mockStorage = {
  getItem: (key: string) => {
    if (key in store) {
      return store[key]
    }
    return null
  },
  setItem: (key: string, value: any) => {
    store[key] = `${value}`
  },
  removeItem: (key: string) => {
    delete store[key]
  },
  reset () {
    store = {}
  }
}

Object.defineProperty(window, 'localStorage', { value: mockStorage })

describe('Hydration', () => {
  beforeEach(() => {
    localStorage.reset()
  })
  it('Handles no existing state', () => {
    expect(localStorage.getItem('rockState')).toBe(null)
    const result = retrieveFromStorage()
    expect(result.rockLists.polished).toEqual([])
  })
  it('Hydrates from storage', () => {
    const dummyData = initialState()
    const rock = makeRock()
    dummyData.rockLists.polished.push(rock)
    localStorage.setItem('rockState', JSON.stringify(dummyData))
    const result = retrieveFromStorage()
    expect(result.rockLists.polished).toEqual([rock])
  })
})
