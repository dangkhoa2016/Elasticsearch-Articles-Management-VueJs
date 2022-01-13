import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import authors from './authors'
import articles from './articles'
import categories from './categories'
import comments from './comments'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    authors,
    articles,
    categories,
    comments,
  },
  strict: process.env.DEV,
})
