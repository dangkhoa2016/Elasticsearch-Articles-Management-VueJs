<template>
  <component :is="categoryData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="categoryData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching category data
      </h4>
      <div class="alert-body">
        No category found with this id. Check
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
      v-if="categoryData"
      #default="{ handleSubmit }"
      ref="refFormObserver"
    >
      <!-- Form -->
      <b-form
        class="p-2"
        @submit.prevent="handleSubmit(onSubmit)"
        @reset.prevent="resetForm"
      >

        <!-- Title -->
        <validation-provider
          #default="validationContext"
          name="Title"
          rules="required"
        >
          <b-form-group
            label="Title"
            label-for="title"
          >
            <b-form-input
              id="title"
              v-model="categoryData.title"
              autofocus
              :state="getValidationState(validationContext)"
              trim
              placeholder="Best category"
            />

            <b-form-invalid-feedback>
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>

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
            :to="{ name: 'categories-list' }"
          >
            Back to list
          </b-button>
        </div>

      </b-form>
    </validation-observer>

  </component>
</template>

<script>
import { required } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BTab, BTabs, BCard, BAlert, BLink, BForm, BRow, BCol,
  BFormGroup, BFormInput, BButton, BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import formValidation from '@core/comp-functions/forms/form-validation'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useToast } from 'vue-toastification/composition'

export default {
  components: {
    BTab, BTabs, BCard, BAlert, BLink, BForm, BRow, BCol,
    BFormGroup, BFormInput, BButton, BFormInvalidFeedback,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      required,
    }
  },
  setup() {
    const categoryData = ref(null)
    const toast = useToast()
    const originData = ref(null)
    store.dispatch('categories/fetchCategory', { id: router.currentRoute.params.id })
      .then(response => {
        categoryData.value = response.data
        originData.value = JSON.parse(JSON.stringify(response.data))
      }).catch(error => {
        if (error.response.status === 404) {
          categoryData.value = undefined
        }
      })

    const onReset = () => {
      categoryData.value = JSON.parse(JSON.stringify(originData.value))
    }

    const onSubmit = () => {
      store.dispatch('categories/updateCategory', categoryData.value)
        .then(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Success!',
              icon: 'SaveIcon',
              variant: 'success',
              text: 'Category data have been saved.'
            },
          }, { position: "bottom-right" })
        }).catch(() => {
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
      categoryData,
      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>
