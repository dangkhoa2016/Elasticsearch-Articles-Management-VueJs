<template>
  <b-card
    :title="articleData.title"
  >
    <b-media no-body>
      <b-media-aside
        vertical-align="center"
        class="mr-50"
      >
        <b-avatar
          :text="avatarText(articleData.title.trim())"
          :variant="tagColor(true)"
          size="104px"
          rounded
        />
      </b-media-aside>
      <b-media-body>
        <div class="mb-2">
          <small class="text-muted mr-50">by</small>
          <small>
            <b-link
              class="text-body"
              v-for="(author, index) in articleData.authors"
              :key="`${author}-${index}`" :title="`Go to author [${author.first_name} ${author.last_name}] show page`"
              :to="{ name: 'authors-view', params: { id: author.id } }"
            >
              <b-badge
                pill
                class="mr-75"
                :variant="tagColorIndex(false, index)"
              >
                {{ author.first_name }} {{ author.last_name }}
              </b-badge>
            </b-link>
          </small>
          <span class="text-muted ml-75 mr-50">|</span>
          <small class="text-muted">{{ articleData.published_on }}</small>
        </div>
        <div class="d-flex flex-wrap">
          <b-button
            :to="{ name: 'articles-edit', params: { id: articleData.id } }"
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
      </b-media-body>
    </b-media>

    <div class="my-1 py-25">
      Categories: <b-link
        v-for="category in articleData.categories"
        :key="category.id" :title="`Go to category [${category.title}] show page`"
        :to="{ name: 'categories-view', params: { id: category.id } }"
      >
        <b-badge
          pill
          class="mr-75"
          :variant="tagColor(true)"
        >
          {{ category.title }}
        </b-badge>
      </b-link>
    </div>
    <hr class="my-2">
    <!-- eslint-disable vue/no-v-html -->
    <div
      class="blog-content"
      v-html="articleData.content.trim().replace(/\r\n|\n/g, '<br/>')"
    />
  </b-card>
</template>

<script>
import { avatarText } from '@core/utils/filter'
import {
  BButton, BBadge, BMedia,
  BAvatar, BRow, BCol, BLink,
  BFormGroup, BCard,
  BCardHeader, BCardTitle,
  BMediaBody, BMediaAside,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { getRandomBsVariant, getColorByIndex } from '@core/utils/utils'
import store from '@/store'

export default {
  components: {
    BButton, BBadge, BMedia,
    BAvatar, BRow, BCol, BLink,
    BFormGroup, BCard,
    BCardHeader, BCardTitle,
    BMediaBody, BMediaAside,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
    }
  },
  props: {
    articleData: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    return {
      avatarText,
    }
  },

  computed: {
  },

  methods: {
    tagColor(isLight) {
      return `${isLight ? 'light-' : ''}${getRandomBsVariant()}`
    },
    tagColorIndex(isLight, indx) {
      return `${isLight ? 'light-' : ''}${getColorByIndex(indx)}`
    },
    showConfirm() {
      store.dispatch('app/setConfirmMessage', `Are you sure to delete article [${this.articleData.title}] ?`)
    },
  }
}
</script>

<style lang="scss">
</style>
