<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="commentData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching comment data.
      </h4>
      <div class="alert-body">
        No comment found with this id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'comments-list' }"
        >
          Comments
        </b-link>
        for other comments.
      </div>
    </b-alert>

    <template v-if="commentData">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="6"
        >
          <info-card :comment-data="commentData" />
        </b-col>
      </b-row>

      <b-card>
        <h5 class="mt-0 mb-1">
        {{ commentData.user }} <span class="badge bg-secondary">{{commentData.user_location}}</span> 
        at <span class="badge border-info text-info">{{ formatDate(commentData.created_at, { dateStyle: 'full', timeStyle: 'long' }) }}</span>
        </h5>
        <p>Total stars: {{ commentData.stars }}</p>
        <p class="mb-0" v-html="commentData.body">
        </p>
      </b-card>
    </template>

  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink, BMedia, BCard,
} from 'bootstrap-vue'
import { formatDate, } from '@core/utils/filter'
import InfoCard from './InfoCard.vue'

export default {
  components: {
    BRow, BCol, BAlert, BLink, BMedia, BCard,

    // Local Components
    InfoCard,
  },
  setup() {
    const commentData = ref(null)

    store.dispatch('comments/fetchComment', { id: router.currentRoute.params.id })
      .then(response => { commentData.value = response.data })
      .catch(error => {
        console.log(error)
        if (error.response.status === 404) {
          commentData.value = undefined
        }
      })

    return {
      commentData,
      formatDate,
    }
  },
}
</script>

<style>

</style>
