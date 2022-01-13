<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="authorData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching author data.
      </h4>
      <div class="alert-body">
        No author found with this id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'authors-list' }"
        >
          Authors
        </b-link>
        for other authors.
      </div>
    </b-alert>

    <template v-if="authorData">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="6"
        >
          <info-card :author-data="authorData" />
        </b-col>
      </b-row>

      <articles :author-id="$router.currentRoute.params.id" :author-name="authorData.fullName" />

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
    const authorData = ref(null)

    store.dispatch('authors/fetchAuthor', { id: router.currentRoute.params.id })
      .then(response => { authorData.value = response.data })
      .catch(error => {
        console.log(error)
        if (error.response.status === 404) {
          authorData.value = undefined
        }
      })

    return {
      authorData,
    }
  },
}
</script>

<style>

</style>
