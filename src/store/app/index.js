import { $themeBreakpoints } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    confirmMessage: '',
    endpoint: 'https://3000-coffee-antlion-zi0929v1.ws-us25.gitpod.io',
  },
  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
    getConfirmMessage: state => state.confirmMessage,
    getEndpoint: state => state.endpoint,
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
    SET_CONFIRM_MESSAGE(state, msg) {
      state.confirmMessage = msg
    },
    SET_ENDPOINT(state, url) {
      state.endpoint = url
    },
  },
  actions: {
    setConfirmMessage(ctx, msg) {
      ctx.commit('SET_CONFIRM_MESSAGE', msg)
    },
    setEndpoint(ctx, url) {
      ctx.commit('SET_ENDPOINT', url)
    },
  },
}
