<template>
  <b-sidebar
    id="add-new-author-sidebar"
    :visible="isAddNewCategorySidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-author-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Add New Category
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- BODY -->
      <validation-observer
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
                placeholder="Title"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Add
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancel
            </b-button>
          </div>

        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import store from '@/store'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewCategorySidebarActive',
    event: 'update:is-add-new-author-sidebar-active',
  },
  props: {
    isAddNewCategorySidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      required,
    }
  },
  setup(props, { emit }) {
    const blankCategoryData = {
      title: '',
    }

    const categoryData = ref(JSON.parse(JSON.stringify(blankCategoryData)))
    const resetCategoryData = () => {
      categoryData.value = JSON.parse(JSON.stringify(blankCategoryData))
    }

    const onSubmit = () => {
      store.dispatch('categories/addCategory', categoryData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-category-sidebar-active', false)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetCategoryData)

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

<style lang="scss">
#add-new-author-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
