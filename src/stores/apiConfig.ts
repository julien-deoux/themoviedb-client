import { getImageUrl } from "@/util/themoviedb";
import { defineStore } from "pinia";

export const useApiConfigStore = defineStore({
  id: 'config',
  state: () => ({
    imageUrl: ''
  }),
  actions: {
    fetchSecureBaseUrl() {
      getImageUrl().then(url => this.imageUrl = url)
    }
  }
})
