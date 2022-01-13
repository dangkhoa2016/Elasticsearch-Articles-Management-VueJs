import { ref, watch, computed } from '@vue/composition-api'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'

export default function useList() {
  // Use toast
  const toast = useToast()

  const refCommentListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'user', sortable: false },
    { key: 'user_location', sortable: false },
    { key: 'article.title', label: 'Article', sortable: false },
    { key: 'created_at', sortable: false },
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
    const localItemsCount = refCommentListTable.value ? refCommentListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value,
    }
  })

  const refetchData = () => {
    refCommentListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })

  const fetchComments = (ctx, callback) => {
    store.dispatch('comments/toggleLoading', true)
    store
      .dispatch('comments/fetchComments', {
        skip: (currentPage.value - 1) * perPage.value,
        take: perPage.value,
        showTotal: true,
        loadRelation: true,
      })
      .then(response => {
        const { data: comments, total } = response.data

        totalRecords.value = total
        callback(comments)
        store.dispatch('comments/toggleLoading', false)
      })
      .catch(error => {
        console.log(error)
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching comments list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
        store.dispatch('comments/toggleLoading', false)
      })
  }

  return {
    fetchComments,
    tableColumns,
    perPage,
    currentPage,
    totalRecords,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refCommentListTable,
    refetchData,
  }
}
