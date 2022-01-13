import axios from '@axios'

const convertToData = comment => {
  const {
    id, body, user, user_location, pick, stars, article_id,
  } = (comment || {})

  return {
    id, body, user, user_location, pick, stars, article_id,
  }
}

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
    fetchComments(ctx, queryParams) {
      const endpoint = ctx.rootGetters['app/getEndpoint']
      return new Promise((resolve, reject) => {
        axios
          .get(`${endpoint}/api/comments`, { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchComment(ctx, { id }) {
      const endpoint = ctx.rootGetters['app/getEndpoint']
      return new Promise((resolve, reject) => {
        axios
          .get(`${endpoint}/api/comments/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addComment(ctx, commentData) {
      const comment = convertToData(commentData)
      const endpoint = ctx.rootGetters['app/getEndpoint']
      return new Promise((resolve, reject) => {
        axios
          .post(`${endpoint}/api/comments`, comment)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateComment(ctx, commentData) {
      const endpoint = ctx.rootGetters['app/getEndpoint']
      const comment = convertToData(commentData)
      const { id } = comment
      ctx.dispatch('toggleLoading', true)
      return new Promise((resolve, reject) => {
        axios
          .put(`${endpoint}/api/comments/${id}`, comment)
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
