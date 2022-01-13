<template>
  <b-card>
    <!-- User Info: Left col -->
    <div
      class="d-flex justify-content-between flex-column"
    >
      <!-- User Avatar & Action Buttons -->
      <div class="d-flex justify-content-start">
        <b-avatar
          :text="avatarText(categoryData.title)"
          :variant="`light-${'info'}`"
          size="104px"
          rounded
        />
        <div class="d-flex flex-column ml-1">
          <div class="mb-1">
            <h4 class="mb-0">
              {{ categoryData.title }}
            </h4>
          </div>
          <div class="d-flex flex-wrap">
            <b-button
              :to="{ name: 'categories-edit', params: { id: categoryData.id } }"
              variant="primary"
            >
              Edit
            </b-button>
            <b-button
              variant="outline-danger"
              class="ml-1"
              @click="showConfirm"
            >
              Delete
            </b-button>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="d-flex align-items-center mt-2">
        <div class="d-flex align-items-center mr-2">
          <b-avatar
            variant="light-primary"
            rounded
          >
            <feather-icon
              icon="AwardIcon"
              size="18"
            />
          </b-avatar>
          <div class="ml-1">
            <h5 class="mb-0">
              Created at
            </h5>
            <small>{{ formatDate(categoryData.created_at) }}</small>
          </div>
        </div>

        <div class="d-flex align-items-center">
          <b-avatar
            variant="light-success"
            rounded
          >
            <feather-icon
              icon="BoxIcon"
              size="18"
            />
          </b-avatar>
          <div class="ml-1">
            <h5 class="mb-0">
              Updated at
            </h5>
            <small>{{ formatDate(categoryData.updated_at) }}</small>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BAvatar, BRow, BCol,
} from 'bootstrap-vue'
import { avatarText, formatDate } from '@core/utils/filter'
import store from '@/store'

export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,
  },
  props: {
    categoryData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      avatarText,
      formatDate,
    }
  },
  methods: {
    showConfirm() {
      store.dispatch('app/setConfirmMessage', `Are you sure to delete category [${this.categoryData.title}] ?`)
    },
  },
}
</script>

<style>

</style>
