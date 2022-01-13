<template>
  <validation-observer
    tag="div"
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
          <!-- Endpoint -->
          <validation-provider
            #default="validationContext"
            name="Endpoint"
            rules="required"
          >
            <b-form-group
              label-cols-md="4"
              label-cols-lg="3"
              content-cols-md
              content-cols-lg
              description="Main server to send and get data..."
              label="Enter Endpoint"
              label-class="endpoint"
              label-align="left"
              label-align-md="right"
              label-for="input-endpoint"
            >
              <b-form-input
                id="input-endpoint"
                v-model="mainData"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="https://some.url.endpoint"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>

      <!-- Form Actions -->
      <div class="d-flex mt-2">
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

    </b-form>
  </validation-observer>
</template>

<script>
import { required } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BRow, BCol, BFormGroup, BFormInput, BForm,
  BCard, BCardHeader, BCardTitle, BFormInvalidFeedback,
} from 'bootstrap-vue'
import { computed, ref } from '@vue/composition-api'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import formValidation from '@core/comp-functions/forms/form-validation'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useToast } from 'vue-toastification/composition'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BCard,
    BCardHeader,
    BCardTitle,
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
  },

  setup(props) {
    const toast = useToast()
    // const mainData = ref(null)
    // mainData.value = store.getters['app/getEndpoint']
    const mainData = ref(store.getters['app/getEndpoint'])
    const onReset = () => {
      mainData.value = store.getters['app/getEndpoint']
    }

    const onSubmit = () => {
      store.dispatch('app/setEndpoint', mainData.value)
        .then(() => {
          toast({
            component: ToastificationContent,
            props: {
              title: 'Success!',
              icon: 'SaveIcon',
              variant: 'success',
              text: 'Settings have been saved.'
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
      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,
      mainData,
    }
  },

  computed: {
  }
}
</script>

<style>
  .endpoint { padding-top: 8px }
</style>
