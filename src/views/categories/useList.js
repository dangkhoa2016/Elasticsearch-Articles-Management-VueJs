import { ref, watch, computed } from '@vue/composition-api'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store'

export default function useList() {
  // Use toast
  const toast = useToast()

  const refCategoryListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'title', sortable: false },
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
    const localItemsCount = refCategoryListTable.value ? refCategoryListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalRecords.value,
    }
  })

  const refetchData = () => {
    refCategoryListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })

  const fetchCategories = (ctx, callback) => {
    store.dispatch('categories/toggleLoading', true)
    store
      .dispatch('categories/fetchCategories', {
        title: searchQuery.value,
        skip: (currentPage.value - 1) * perPage.value,
        take: perPage.value,
        showTotal: true,
      })
      .then(response => {
        const { data: categories, total } = response.data

        totalRecords.value = total
        callback(categories)
        store.dispatch('categories/toggleLoading', false)
      })
      .catch(error => {
        console.log(error)
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching categories list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
        store.dispatch('categories/toggleLoading', false)
      })
  }

  return {
    fetchCategories,
    tableColumns,
    perPage,
    currentPage,
    totalRecords,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refCategoryListTable,
    refetchData,
  }
}
