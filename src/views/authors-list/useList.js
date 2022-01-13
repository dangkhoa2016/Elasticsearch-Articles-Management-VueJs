import { ref, watch, computed } from '@vue/composition-api'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'

export default function useList() {
  // Use toast
  const toast = useToast()

  const refAuthorListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'first_name', sortable: false },
    { key: 'last_name', sortable: false },
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
    const localItemsCount = refAuthorListTable.value ? refAuthorListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value,
    }
  })

  const refetchData = () => {
    refAuthorListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })

  const fetchAuthors = (ctx, callback) => {
    store.dispatch('authors/toggleLoading', true)
    store
      .dispatch('authors/fetchAuthors', {
        name: searchQuery.value,
        skip: (currentPage.value - 1) * perPage.value,
        take: perPage.value,
        showTotal: true,
      })
      .then(response => {
        const { data: authors, total } = response.data

        totalRecords.value = total
        callback(authors)
        store.dispatch('authors/toggleLoading', false)
      })
      .catch(error => {
        console.log(error)
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching authors list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
        store.dispatch('authors/toggleLoading', false)
      })
  }

  return {
    fetchAuthors,
    tableColumns,
    perPage,
    currentPage,
    totalRecords,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refAuthorListTable,

    refetchData,
  }
}
