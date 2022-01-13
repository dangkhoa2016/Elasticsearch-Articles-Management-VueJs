import axios from '@axios'

export default {
  namespaced: true,
  state: {
    fetching: false,
  },
  getters: {},
  mutations: {
    fetching(state, status) {
      state.fetching = status
    },
  },
  actions: {
    toggleLoading(ctx, status) {
      ctx.commit('fetching', status)
    },
    fetchAuthors(ctx, queryParams) {
      const endpoint = ctx.rootGetters['app/getEndpoint']
      return new Promise((resolve, reject) => {
        axios
          .get(`${endpoint}/api/authors`, { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchAuthor(ctx, { id }) {
      const endpoint = ctx.rootGetters['app/getEndpoint']
      return new Promise((resolve, reject) => {
        axios
          .get(`${endpoint}/api/authors/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addAuthor(ctx, authorData) {
      const { first_name, last_name } = (authorData || {})
      const endpoint = ctx.rootGetters['app/getEndpoint']
      return new Promise((resolve, reject) => {
        axios
          .post(`${endpoint}/api/authors`, { first_name, last_name })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateAuthor(ctx, authorData) {
      const { id, first_name, last_name } = (authorData || {})
      const endpoint = ctx.rootGetters['app/getEndpoint']
      ctx.dispatch('toggleLoading', true)
      return new Promise((resolve, reject) => {
        axios
          .put(`${endpoint}/api/authors/${id}`, { first_name, last_name })
          .then(response => {
            ctx.dispatch('toggleLoading', false)
            resolve(response)
          })
          .catch(error => {
            ctx.dispatch('toggleLoading', false)
            reject(error)
          })
      })
    },
  },
}
