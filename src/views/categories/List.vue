<template>
  <div>

    <add-new
      :is-add-new-category-sidebar-active.sync="isAddNewCategorySidebarActive"
      @refetch-data="refetchData"
    />

    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
              <b-button
                variant="primary"
                @click="isAddNewCategorySidebarActive = true"
              >
                <span class="text-nowrap">Add Category</span>
              </b-button>
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refCategoryListTable"
        class="position-relative"
        :items="fetchCategories"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found."
        :sort-desc.sync="isSortDirDesc"
        :busy="$store.state.categories.fetching"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle mr-2"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>

        <!-- Column: Title -->
        <template #cell(title)="data">
          <b-link
            :to="{ name: 'categories-view', params: { id: data.item.id } }"
            class="font-weight-bold d-block text-nowrap"
          >
            {{ data.item.title }}
          </b-link>
        </template>

        <!-- Column: Created at -->
        <template #cell(created_at)="data">
          <b-badge
            pill
            :variant="`light-${'warning'}`"
            class="text-capitalize"
          >
            {{ formatDate(data.item.created_at, { month: "long", day: "numeric", year: "numeric" }) }}
          </b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item :to="{ name: 'categories-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'categories-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item @click="showConfirm(data.item)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="totalRecords"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BSpinner,
} from 'bootstrap-vue'
import { ref, onUnmounted } from '@vue/composition-api'
import { avatarText, formatDate, } from '@core/utils/filter'
import useList from './useList'
import SidebarNew from './SidebarNew.vue'

export default {
  components: {
    AddNew: SidebarNew,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
  
    BSpinner,
  },
  setup() {
    const isAddNewCategorySidebarActive = ref(false)

    const {
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

    } = useList()

    return {

      // Sidebar
      isAddNewCategorySidebarActive,

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

      // Filter
      avatarText,
      formatDate,
    }
  },
  methods: {
    showConfirm(category) {
      this.$store.dispatch('app/setConfirmMessage', `Are you sure to delete category [${category.title}] ?`)
    },
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>
