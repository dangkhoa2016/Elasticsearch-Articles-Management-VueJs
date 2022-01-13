import axios from '@axios'

const convertToData = article => {
  const {
    id, title, abstract, content, shares,
    categories = [], authors = [], published_on,
  } = (article || {})

  return {
    id,
    title,
    abstract,
    published_on,
    content,
    shares,
    categories: categories.map(c => (typeof c === 'object' ? c.id : c)),
    authors: authors.map(a => (typeof a === 'object' ? a.id : a)),
  }
}

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
    fetchArticles(ctx, queryParams) {
      const endpoint = ctx.rootGetters['app/getEndpoint']
      let url = ''
      if (queryParams.authorId) {
        url = `authors/${queryParams.authorId}/`
        // eslint-disable-next-line
        delete queryParams.authorId
      } else if (queryParams.categoryId) {
        url = `categories/${queryParams.categoryId}/`
        // eslint-disable-next-line
        delete queryParams.categoryId
      }

      return new Promise((resolve, reject) => {
        axios
          .get(`${endpoint}/api/${url}articles`, { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchArticle(ctx, { id, loadRelation }) {
      const endpoint = ctx.rootGetters['app/getEndpoint']
      return new Promise((resolve, reject) => {
        axios
          .get(`${endpoint}/api/articles/${id}?loadRelation=${loadRelation}`)
          .then(response => {
            const { data: article } = response
            if (Array.isArray(article.categories)) {
              article.categories = article.categories.map(c => {
                if (c.category_id) return c.category_id
                return c
              })
            }
            if (Array.isArray(article.authors)) {
              article.authors = article.authors.map(a => {
                if (a.category_id) return a.author_id
                return a
              })
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    addArticle(ctx, articleData) {
      const article = convertToData(articleData)
      const endpoint = ctx.rootGetters['app/getEndpoint']
      return new Promise((resolve, reject) => {
        axios
          .post(`${endpoint}/api/articles`, article)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateArticle(ctx, articleData) {
      const article = convertToData(articleData)
      const { id } = article
      delete article.id
      const endpoint = ctx.rootGetters['app/getEndpoint']
      ctx.dispatch('toggleLoading', true)
      return new Promise((resolve, reject) => {
        axios
          .put(`${endpoint}/api/articles/${id}`, article)
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
