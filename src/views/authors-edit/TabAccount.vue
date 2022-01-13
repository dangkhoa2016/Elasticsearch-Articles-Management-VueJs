<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :text="avatarText(mainData.fullName)"
          :variant="`light-${'danger'}`"
          size="90px"
          rounded
        />
      </template>

      <h4 class="mb-1">
        {{ fullName }}
      </h4>

      <div>
        <label class="d-block">Created at: 3424</label>
        <label class="d-block">Updated at: 3424</label>
      </div>
    </b-media>

    
    <!-- BODY -->
    <validation-observer
      v-if="mainData" tag="div"
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
            <!-- First name -->
            <validation-provider
              #default="validationContext"
              name="First name"
              rules="required"
            >
              <b-form-group
                label="First name"
                label-for="first-name"
              >
                <b-form-input
                  id="first-name"
                  v-model="mainData.first_name"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="John"
                />

                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
          
          <b-col>
            <!-- Last name -->
            <validation-provider
              #default="validationContext"
              name="Last name"
              rules="required"
            >
              <b-form-group
                label="Last name"
                label-for="last-name"
              >
                <b-form-input
                  id="last-name"
                  v-model="mainData.last_name"
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="Doe"
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
            :to="{ name: 'authors-list' }"
          >
            Back to list
          </b-button>
        </div>

      </b-form>
    </validation-observer>

  </div>
</template>

<script>
import { required } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm,
  BCard, BCardHeader, BCardTitle, BFormCheckbox, BFormInvalidFeedback,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import formValidation from '@core/comp-functions/forms/form-validation'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useToast } from 'vue-toastification/composition'

export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    BFormInvalidFeedback,
    
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
  props: {
    authorData: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)
    const toast = useToast()
    const mainData = ref(null)
    mainData.value = JSON.parse(JSON.stringify(props.authorData))

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      mainData.avatar = base64
    })

    const onReset = () => {
      mainData.value = JSON.parse(JSON.stringify(props.authorData))
    }

    const onSubmit = () => {
      store.dispatch('authors/updateAuthor', mainData.value)
        .then(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Success!',
              icon: 'SaveIcon',
              variant: 'success',
              text: 'Author data have been saved.'
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
      avatarText,
      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,
      mainData,
    }
  },

  computed: {
    fullName() {
      return this.authorData ? `${this.authorData.first_name} ${this.authorData.last_name}` : ''
    },
  },
}
</script>

<style lang="scss">
</style>
