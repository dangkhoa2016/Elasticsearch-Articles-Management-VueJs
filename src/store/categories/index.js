import axios from '@axios'

export default {
  namespaced: true,
  state: {
    fetching: false,
  },
  getters: {
    getFetching: state => state.fetching,
  },
  mutations: {
    fetching(state, status) {
      state.fetching = status
    },
  },
  actions: {
    toggleLoading(ctx, status) {
      ctx.commit('fetching', status)
    },
    fetchCategories(ctx, queryParams) {
      const endpoint = ctx.rootGetters['app/getEndpoint']
      return new Promise((resolve, reject) => {
        axios
          .get(`${endpoint}/api/categories`, { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchCategory(ctx, { id }) {
      const endpoint = ctx.rootGetters['app/getEndpoint']
      return new Promise((resolve, reject) => {
        axios
          .get(`${endpoint}/api/categories/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addCategory(ctx, categoryData) {
      const { title } = (categoryData || {})
      const endpoint = ctx.rootGetters['app/getEndpoint']
      return new Promise((resolve, reject) => {
        axios
          .post(`${endpoint}/api/categories`, { title })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateCategory(ctx, categoryData) {
      const endpoint = ctx.rootGetters['app/getEndpoint']
      const { id, title } = (categoryData || {})
      ctx.dispatch('toggleLoading', true)
      return new Promise((resolve, reject) => {
        axios
          .put(`${endpoint}/api/categories/${id}`, { title })
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
