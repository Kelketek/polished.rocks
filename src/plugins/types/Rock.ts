import { ROCK_TYPES } from '@/plugins/types/ROCK_TYPES'

export default interface Rock {
  id: string,
  type: ROCK_TYPES,
  createdOn: string,
  finishedOn: string|null,
}
