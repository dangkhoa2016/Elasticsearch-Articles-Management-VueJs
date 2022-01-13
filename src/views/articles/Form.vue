<template>
  <b-card
    :title="formHeader"
  >

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="articleData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching article data
      </h4>
      <div class="alert-body">
        No article found with this id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'categories-list' }"
        >
          categories
        </b-link>
        for other categories.
      </div>
    </b-alert>

    <!-- BODY -->
    <validation-observer
      v-if="articleData" tag="div"
      #default="{ handleSubmit }"
      ref="refFormObserver"
    >
      <!-- Form -->
      <b-form
        @submit.prevent="handleSubmit(onSubmit)"
        @reset.prevent="resetForm"
      >
        <b-row>
          <b-col>
            <!-- Title -->
            <validation-provider
              #default="validationContext"
              name="Title" tag="div"
              rules="required"
            >
              <b-form-group
                label="Title"
                label-for="title"
              >
                <b-form-input
                  id="title"
                  v-model="articleData.title"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="Best article"
                />

                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Share count -->
            <validation-provider
              #default="validationContext"
              name="Share count" tag="div"
              rules="required"
            >
              <b-form-group
                label="Share count"
                label-for="shares-count"
              >
                <b-form-input
                  id="shares-count"
                  v-model="articleData.shares"
                  :state="getValidationState(validationContext)"
                  trim
                  type="number"
                  placeholder="0"
                />

                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Abstract -->
            <validation-provider
              #default="validationContext"
              name="Abstract" tag="div"
              rules="required"
            >
              <b-form-group
                label="Abstract"
                label-for="abstract"
              >
                <b-form-textarea
                  id="abstract"
                  v-model="articleData.abstract"
                  :state="getValidationState(validationContext)"
                  trim class="abstract"
                  placeholder="Summary"
                  rows="5"
                />

                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Abstract -->
            <validation-provider
              #default="validationContext"
              name="Categories" tag="div"
            >
              <b-form-group
                label="Categories"
                label-for="categories"
              >
                <dropdown-select v-model="articleData.categories"
                  :state="getValidationState(validationContext)"></dropdown-select>
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Published on -->
            <b-form-group
              label="Published on"
              label-for="published_on"
            >
              <flat-pickr
                v-model="articleData.published_on"
                class="form-control"
                :config="{ dateFormat: 'Y-m-d'}"
                placeholder="YYYY-MM-DD"
              />
            </b-form-group>
          </b-col>
        
          <b-col>
            <!-- Content -->
            <validation-provider
              #default="validationContext"
              name="Content" tag="div"
              rules="required"
            >
              <b-form-group
                label="Content"
                label-for="content"
              >
                <b-form-textarea
                  id="content"
                  v-model="articleData.content"
                  :state="getValidationState(validationContext)"
                  trim class="content"
                  placeholder="Content"
                  rows="15"
                />

                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>

        <div class="d-flex justify-content-between mt-2">
          <!-- Form Actions -->
          <div class="">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
            >
              Save
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
            >
              Reset
            </b-button>
          </div>

          <b-button
            variant="outline-info"
            :to="{ name: 'articles-list' }"
          >
            Back to list
          </b-button>
        </div>
      </b-form>
    </validation-observer>

  </b-card>
</template>

<script>
import { required } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BTab, BTabs, BCard, BAlert, BLink, BForm, BRow, BCol, BFormTextarea,
  BFormGroup, BFormInput, BButton, BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref, computed } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import formValidation from '@core/comp-functions/forms/form-validation'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useToast } from 'vue-toastification/composition'
import DropdownSelect from '@/views/categories/DropdownSelect.vue'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    BTab, BTabs, BCard, BAlert, BLink, BForm, BRow, BCol, BFormTextarea,
    BFormGroup, BFormInput, BButton, BFormInvalidFeedback, flatPickr,

    // Form Validation
    ValidationProvider,
    ValidationObserver,

    DropdownSelect,
  },
  directives: {
    Ripple,
  },
  watch: {
    'articleData.id' (val) {
      console.log('id change', val)
    }
  },
  setup() {
    const { categoryId, authorId } = (router.currentRoute.query || {})
    const articleData = ref({ shares: 0, categoryId, authorId, })
    const toast = useToast()
    const originData = ref(null)
    const id = ref(articleData.value.id || router.currentRoute.params.id)
    const formHeader = computed(() => `${id.value ? `Edit article ${id.value}` : 'Create new article' }${forEntity}`)

    if (id.value) {
      store.dispatch('articles/fetchArticle', { id: id.value, loadRelation: true })
        .then(response => {
          articleData.value = response.data
          originData.value = JSON.parse(JSON.stringify(response.data))
        }).catch(error => {
          if (error.response.status === 404) {
            articleData.value = undefined
          }
        })
    }

    const forEntity = categoryId ? ` for category: ${categoryId}` : (authorId ? ` by author: ${authorId}` : '')

    const onReset = () => {
      articleData.value = JSON.parse(JSON.stringify(originData.value || {}))
    }

    const onSubmit = () => {
      store.dispatch('articles/toggleLoading', true)
      const article = articleData.value
      if ((!article.authors || article.authors.length === 0) && article.authorId)
        article.authors = [authorId]
      if ((!article.categories || article.categories.length === 0) && article.categoryId)
        article.categories = [categoryId]
      if (id.value && !article.id) article.id = id.value
      store.dispatch(`articles/${id.value ? 'updateArticle' : 'addArticle'}`, article)
        .then((res) => {
          // articleData.value = res.data
          originData.value = articleData.value

          if (!id.value) {
            id.value = res.data.id

            // this.$router.push({name: 'articles-edit', params: { id: id.value } })
            window.history.pushState({}, '', `/articles/edit/${id.value}`);
          }

          toast({
            component: ToastificationContent,
            props: {
              title: 'Success!',
              icon: 'SaveIcon',
              variant: 'success',
              text: 'Article data have been saved.'
            },
          }, { position: "bottom-right" })
        }).catch(error => {
          console.log(error)
          toast({
            component: ToastificationContent,
            props: {
              title: 'Failed to update',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
              text: 'Something went wrong !!'
            },
          }, { position: "bottom-right" })
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(onReset)

    return {
      articleData,
      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,
      required,
      formHeader,
    }
  },
}
</script>

<style scoped>
  .abstract { min-height: 136px }
  .content { min-height: 360px }
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
