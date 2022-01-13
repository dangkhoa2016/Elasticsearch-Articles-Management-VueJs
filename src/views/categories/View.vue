<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="categoryData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching category data.
      </h4>
      <div class="alert-body">
        No category found with this id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'categories-list' }"
        >
          Categories
        </b-link>
        for other categories.
      </div>
    </b-alert>

    <template v-if="categoryData">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="6"
        >
          <info-card :category-data="categoryData" />
        </b-col>
      </b-row>

      <articles :category-id="$router.currentRoute.params.id" :display-name="categoryData.title" />

    </template>

  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'

import InfoCard from './InfoCard.vue'
import Articles from '@/views/components/Articles.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,

    // Local Components
    InfoCard,
    Articles,
  },
  setup() {
    const categoryData = ref(null)

    store.dispatch('categories/fetchCategory', { id: router.currentRoute.params.id })
      .then(response => { categoryData.value = response.data })
      .catch(error => {
        console.log(error)
        if (error.response.status === 404) {
          categoryData.value = undefined
        }
      })

    return {
      categoryData,
    }
  },
}
</script>

<style>

</style>
