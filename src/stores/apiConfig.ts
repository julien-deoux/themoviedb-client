import { Just, Nothing, type Maybe } from '@/util/maybe'
import { defineStore } from 'pinia'
import { get, query } from '@/util/themoviedb'
import type { ApiConfiguration } from '@/model/api/configuration/configuration'

type ApiConfigStore = {
  imageUrl: Maybe<string>,
}

const configurationResource = '/configuration'

export const useApiConfigStore = defineStore({
  id: 'config',
  state: () => ({
    imageUrl: Nothing()
  } as ApiConfigStore),
  actions: {
    fetchSecureBaseUrl() {
      get(query(configurationResource))
        .then((data: ApiConfiguration) => new Promise<string>((resolve, _) => resolve(data.images.secure_base_url)))
        .then(url => this.imageUrl = Just(url)).catch(() => this.imageUrl = Nothing())
    }
  }
})
