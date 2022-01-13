<template>
  <div>

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
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refCommentListTable"
        class="position-relative"
        :items="fetchComments"
        responsive
        :fields="tableColumns"
        primary-key="id"
        show-empty
        empty-text="No matching records found."
        :busy="$store.state.comments.fetching"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle mr-2"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>

        <!-- Column: User -->
        <template #cell(user)="data">
          <b-link
            :to="{ name: 'comments-view', params: { id: data.item.id } }"
            class="font-weight-bold d-block text-nowrap"
          >
            {{ data.item.user }}
          </b-link>
        </template>

        <!-- Column: User -->
        <template #cell(user)="data">
          <b-link
            :to="{ name: 'comments-view', params: { id: data.item.id } }"
            class="font-weight-bold d-block text-nowrap"
          >
            {{ data.item.user }}
          </b-link>
        </template>

        <!-- Column: Article -->
        <template #cell(article.title)="data">
          <b-link
            :to="{ name: 'articles-view', params: { id: data.item.article.id } }"
            class="font-weight-bold d-block text-nowrap"
          >
            {{ data.item.article.title }}
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
            <b-dropdown-item :to="{ name: 'comments-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'comments-edit', params: { id: data.item.id } }">
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
import { avatarText, formatDate } from '@core/utils/filter'
import useList from './useList'

export default {
  components: {
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

    const {
      fetchComments,
      tableColumns,
      perPage,
      currentPage,
      totalRecords,
      dataMeta,
      perPageOptions,
      searchQuery,
      refCommentListTable,
      refetchData,

    } = useList()

    return {

      fetchComments,
      tableColumns,
      perPage,
      currentPage,
      totalRecords,
      dataMeta,
      perPageOptions,
      searchQuery,
      refCommentListTable,
      refetchData,

      // Filter
      avatarText,
      formatDate,
    }
  },
  methods: {
    showConfirm(comment) {
      this.$store.dispatch('app/setConfirmMessage', `Are you sure to delete comment by user [${comment.user} - ${comment.user_location}] ?`)
    },
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>
