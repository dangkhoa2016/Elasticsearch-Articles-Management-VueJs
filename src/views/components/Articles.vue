<template>
  <b-card
    no-body
    class="mb-0"
  >
    <b-card-body>
      <b-card-title>Articles</b-card-title>
      <b-card-sub-title>List of articles</b-card-sub-title>
    </b-card-body>
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
            <b-link
              class="btn btn-primary"
              :to="{ name: 'articles-new', query: { authorId, categoryId } }"
            >
              <span class="text-nowrap">Add Article</span>
            </b-link>
          </div>
        </b-col>
      </b-row>

    </div>

    <b-table
      ref="refArticleListTable"
      class="position-relative"
      :items="loadArticles"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found."
      :sort-desc.sync="isSortDirDesc"
      :busy="$store.state.articles.fetching"
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
          :to="{ name: 'articles-view', params: { id: data.item.id } }"
          class="font-weight-bold d-block"
        >
          {{ data.item.title }}
        </b-link>
      </template>

      <!-- Column: Abstract -->
      <template #cell(abstract)="data">
        {{ data.item.abstract }}
      </template>

      <!-- Column: Created at -->
      <template #cell(published_on)="data">
        <b-badge
          pill
          :variant="`light-${'warning'}`"
          class="text-capitalize"
        >
          {{ formatDate(data.item.published_on, { month: "long", day: "numeric", year: "numeric" }) }}
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
          <b-dropdown-item :to="{ name: 'articles-view', params: { id: data.item.id } }">
            <feather-icon icon="FileTextIcon" />
            <span class="align-middle ml-50">Details</span>
          </b-dropdown-item>

          <b-dropdown-item :to="{ name: 'articles-edit', params: { id: data.item.id } }">
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
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable,
  BBadge, BDropdown, BDropdownItem, BPagination, BSpinner,
  BCardBody, BCardTitle, BCardSubTitle, BMedia, BAvatar, BLink,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import { avatarText, formatDate, } from '@core/utils/filter'
import useList from './useArticleList'

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
    BCardBody, BCardTitle, BCardSubTitle,
    BSpinner,
  },
  props: {
    authorId: {
      type: [String, Number],
      required: false,
    },
    categoryId: {
      type: [String, Number],
      required: false,
    },
    displayName: {
      type: String,
      required: false,
    },
  },
  setup() {
    const {
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
    } = useList()

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

      // Filter
      avatarText,
      formatDate,
    }
  },
  methods: {
    loadArticles(ctx, callback) {
      ctx.authorId = this.authorId
      ctx.categoryId = this.categoryId
      this.fetchArticles(ctx, callback)
    },
    showConfirm(article) {
      this.$store.dispatch('app/setConfirmMessage', `Are you sure to delete article [${article.title}] ?`)
    },
  }
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
.article-content { width: 50% }
</style>
