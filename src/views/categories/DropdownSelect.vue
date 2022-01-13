<template>
  <v-select
    label="title"
    :options="items"
    ref="ddl" :value="value"
    :closeOnSelect="false"
    :multiple="true"
    :class="state ? '' : 'is-invalid'"
    @open="onOpen"
    @close="onClose"
    @input="setSelected"
    :filterable="false"
    @search="onSearch"
  >
    <template #list-footer>
      <li v-show="showLoadMore" ref="load" class="loader">
        Loading more options...
      </li>
    </template>
  </v-select>
</template>

<script>
import countries from '@/@fake-db/countries'
import store from '@/store'
import { mapGetters, mapActions } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  props: {
    value:  {
      type: Array,
      default: () => []
    },
    state:  {
      type: Boolean,
      default: true
    }
  },
  components: {
  },
  data: () => ({
    observer: null,
    search: '',
    categories: [],
    pageIndex: 1,
    pageSize: 10,
    hasNextPage: true,
    timeoutId: 0,
  }),
  computed: {
    ...mapGetters({
      fetching: 'categories/getFetching',
    }),
    items() {
      return this.firstPageIndex ? [{label: 'Loading...', value: '-1', title: 'Loading...'}] : (this.defaultItems || [])
    },
    firstPageIndex() {
      return this.categories.length === 0 && this.pageIndex === 1
    },
    defaultItems() {
      return this.categories || this.value
    },
    showLoadMore() {
      return !this.firstPageIndex && this.hasNextPage
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll)
  },
  methods: {
    ...mapActions({
    }),
    setSelected(value) {
      this.$emit('input', value)
    },
    onSearch(key) {
      clearTimeout(this.timeoutId)
      const vm = this
      this.timeoutId = setTimeout(function() {
        vm.search = key
        vm.reset()
        vm.fetchCategories()
      }, 400)
    },
    fetchCategories(cb) {
      store.dispatch('categories/toggleLoading', true)
      store.dispatch('categories/fetchCategories', {
        title: this.search,
        take: this.pageSize,
        skip: (this.pageIndex - 1) * this.pageSize,
        showTotal: true,
      }).then(response => {
        var { data: categories } = response.data
        this.categories = this.pageIndex === 1 ? categories : this.categories.concat(categories)
        this.hasNextPage = (categories.length >= this.pageSize)
        store.dispatch('categories/toggleLoading', false)
        if (typeof cb === 'function')
          cb()
      }).catch(error => {
        console.log(error)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching categories list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
        store.dispatch('categories/toggleLoading', false)
      })
    },
    async onOpen() {
      await this.$nextTick()
      this.observer.observe(this.$refs.load)
      this.onSearch('')
    },
    reset() {
      this.pageIndex = 1
      this.categories = []
      this.hasNextPage = true
    },
    onClose() {
      this.reset()
      this.observer.disconnect()
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent
        // const scrollTop = target.offsetParent.offsetHeight - 30
        const scrollTop = target.offsetParent.scrollTop
        this.pageIndex += 1
        await this.fetchCategories(() => {
          this.$nextTick(() => {
            ul.scrollTop = scrollTop
          })
        })
      }
    },
  },
  created() {
  },
}
</script>

<style lang="scss" scoped>
.loader {
  text-align: center;
  color: #bbbbbb;
}
</style>
