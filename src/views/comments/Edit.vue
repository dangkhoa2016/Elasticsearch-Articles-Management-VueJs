<template>
  <component :is="commentData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="commentData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching comment data
      </h4>
      <div class="alert-body">
        No comment found with this id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'comments-list' }"
        >
          comments
        </b-link>
        for other comments.
      </div>
    </b-alert>

    <!-- BODY -->
    <validation-observer
      v-if="commentData"
      #default="{ handleSubmit }"
      ref="refFormObserver"
    >
      <!-- Form -->
      <b-form
        class="p-2"
        @submit.prevent="handleSubmit(onSubmit)"
        @reset.prevent="resetForm"
      >
        <b-row>
          <b-col>
            <!-- User -->
            <validation-provider
              #default="validationContext"
              name="User"
              rules="required"
            >
              <b-form-group
                label="User"
                label-for="user"
              >
                <b-form-input
                  id="user"
                  v-model="commentData.user"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="Best User"
                />

                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- User location -->
            <validation-provider
              #default="validationContext"
              name="User location"
              rules="required"
            >
              <b-form-group
                label="User location"
                label-for="user_location"
              >
                <b-form-input
                  id="user_location"
                  v-model="commentData.user_location"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="Great location"
                />

                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            
            <!-- Stars count -->
            <validation-provider
              #default="validationContext"
              name="Stars" tag="div"
              rules="required"
            >
              <b-form-group
                label="Stars"
                label-for="stars"
              >
                <b-form-input
                  id="stars"
                  v-model="commentData.stars"
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

          </b-col>

          <b-col>
            <!-- Body -->
            <validation-provider
              #default="validationContext"
              name="Body"
              rules="required"
            >
              <b-form-group
                label="Body"
                label-for="body"
              >
                <b-form-textarea
                  id="body"
                  v-model="commentData.body"
                  :state="getValidationState(validationContext)"
                  trim class="body"
                  placeholder="Summary"
                  rows="7"
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
            :to="{ name: 'comments-list' }"
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
  BTab, BTabs, BCard, BAlert, BLink, BForm, BRow, BCol, BFormTextarea,
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
    BTab, BTabs, BCard, BAlert, BLink, BForm, BRow, BCol, BFormTextarea,
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
    const commentData = ref(null)
    const toast = useToast()
    const originData = ref(null)
    store.dispatch('comments/fetchComment', { id: router.currentRoute.params.id })
      .then(response => {
        commentData.value = response.data
        originData.value = JSON.parse(JSON.stringify(response.data))
      }).catch(error => {
        if (error.response.status === 404) {
          commentData.value = undefined
        }
      })

    const onReset = () => {
      commentData.value = JSON.parse(JSON.stringify(originData.value))
    }

    const onSubmit = () => {
      store.dispatch('comments/toggleLoading', true)
      store.dispatch('comments/updateComment', commentData.value)
        .then(() => {
          
          store.dispatch('comments/toggleLoading', false)
          toast({
            component: ToastificationContent,
            props: {
              title: 'Success!',
              icon: 'SaveIcon',
              variant: 'success',
              text: 'Comment data have been saved.'
            },
          }, { position: "bottom-right" })
        }).catch(() => {
          
          store.dispatch('comments/toggleLoading', false)
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
      commentData,
      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
}
</script>
