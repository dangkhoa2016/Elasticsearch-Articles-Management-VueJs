<template>
  <div>
    <ul v-if="comments.length > 0" class="list-unstyled media-bordered">
      <b-media
        tag="li"
        :class="index === 0 ? 'pb-2' : 'py-2'"
        v-for="(comment, index) in comments"
        :key="comment.id">
        <template #aside>
          <b-avatar
            :text="avatarText(comment.user)"
            :variant="tagColor(true)"
            size="90px"
            rounded
          />
        </template>
        <h5 class="mt-0 mb-1">
        {{ comment.user }} <span class="badge bg-secondary">{{comment.user_location}}</span> 
        at <span class="badge border-info text-info">{{ formatDate(comment.created_at, { dateStyle: 'full', timeStyle: 'long' }) }}</span>
        </h5>
        <p>Total stars: {{ comment.stars }}</p>
        <p class="mb-0" v-html="comment.body">
        </p>
      </b-media>
    </ul>
    <div v-else>
      <b-card>
        <div class="text-center">
          <feather-icon
            icon="XOctagonIcon"
            size="140" class="d-block m-auto"
          />
          <p class="mt-2">No comments for this article at this moment.</p>  
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BImg, BMedia, BAvatar, BCard,
} from 'bootstrap-vue'
import { avatarText, formatDate, } from '@core/utils/filter'
import { getRandomBsVariant } from '@core/utils/utils'

export default {
  components: {
    BImg, BMedia, BAvatar, BCard,
  },
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    return {
      avatarText,
      formatDate,
    }
  },
  methods: {
    tagColor(isLight) {
      return `${isLight ? 'light-' : ''}${getRandomBsVariant()}`
    },
  },
}
</script>
