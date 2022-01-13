import { ref, watch, computed } from '@vue/composition-api'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'

export default function useList() {
  // Use toast
  const toast = useToast()

  const refArticleListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'title', sortable: false },
    { key: 'abstract', sortable: false, class: 'article-content' },
    { key: 'published_on', sortable: false, class: 'text-nowrap' },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalRecords = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)

  const dataMeta = computed(() => {
    const localItemsCount = refArticleListTable.value ? refArticleListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value,
    }
  })

  const refetchData = () => {
    refArticleListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })

  const fetchArticles = (ctx, callback) => {
    store.dispatch('articles/toggleLoading', true)
    store
      .dispatch('articles/fetchArticles', {
        title: searchQuery.value,
        skip: (currentPage.value - 1) * perPage.value,
        take: perPage.value,
        showTotal: true,
        authorId: ctx.authorId,
        categoryId: ctx.categoryId,
      })
      .then(response => {
        const { data: articles, total } = response.data

        store.dispatch('articles/toggleLoading', false)
        totalRecords.value = total
        callback(articles)
      })
      .catch(e => {
        console.log('error fetchArticles', e)
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching articles list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
        store.dispatch('articles/toggleLoading', false)
      })
  }

  return {
    fetchArticles,
    tableColumns,
    perPage,
    currentPage,
    totalRecords,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refArticleListTable,
    refetchData,
  }
}
