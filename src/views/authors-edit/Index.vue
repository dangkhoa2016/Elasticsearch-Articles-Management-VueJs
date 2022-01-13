<template>
  <component :is="authorData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="authorData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching author data
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

    <b-tabs
      v-if="authorData"
      pills
    >

      <!-- Tab: Account -->
      <b-tab active>
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Account</span>
        </template>
        <tab-account
          :author-data="authorData"
          class="mt-2 pt-75"
        />
      </b-tab>

      <!-- Tab: Information -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="InfoIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Information</span>
        </template>
        <tab-information class="mt-2 pt-75" />
      </b-tab>

      <!-- Tab: Social -->
      <b-tab>
        <template #title>
          <feather-icon
            icon="Share2Icon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Social</span>
        </template>
        <tab-social class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import {
  BTab, BTabs, BCard, BAlert, BLink,
} from 'bootstrap-vue'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import TabAccount from './TabAccount.vue'
import TabInformation from './TabInformation.vue'
import TabSocial from './TabSocial.vue'

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    TabAccount,
    TabInformation,
    TabSocial,
  },
  setup() {
    const authorData = ref(null)

    store.dispatch('authors/fetchAuthor', { id: router.currentRoute.params.id })
      .then(response => { authorData.value = response.data })
      .catch(error => {
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
