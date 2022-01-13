<template>
  <component :is="articleData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="articleData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching author data.
      </h4>
      <div class="alert-body">
        No author found with this id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'articles-list' }"
        >
          articles
        </b-link>
        for other articles.
      </div>
    </b-alert>

    <b-tabs
      v-if="articleData"
      pills
    >
    
      <!-- Tab: Information -->
      <b-tab active>
        <template #title>
          <feather-icon
            icon="InfoIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Information</span>
        </template>
        <tab-information class="mt-2 pt-75" :article-data="articleData" />
      </b-tab>

      <!-- Tab: Comments -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="MessageSquareIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Comments</span>
        </template>
        <tab-comments class="mt-2 pt-75" :comments="articleData.comments" />
      </b-tab>

    </b-tabs>

  </component>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref } from '@vue/composition-api'
import {
  BAlert, BLink, BTabs, BTab, BCard,
} from 'bootstrap-vue'
import TabInformation from './TabInformation.vue'
import TabComments from './TabComments.vue'

export default {
  components: {
    BAlert, BLink, BTabs, BTab, BCard,
    TabInformation, TabComments,
  },
  setup() {
    const articleData = ref(null)

    store.dispatch('articles/fetchArticle', { id: router.currentRoute.params.id, loadRelation: true })
      .then(response => { articleData.value = response.data })
      .catch(error => {
        console.log(error)
        if (error.response.status === 404) {
          articleData.value = undefined
        }
      })

    return {
      articleData,
    }
  },
  methods: {
    
  }
}
</script>

<style>

</style>
