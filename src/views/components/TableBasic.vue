<template>
  <b-card-actions
    title="Users list"
    no-body
    no-actions
  >
    <b-row>
      <b-col cols="12">
        <b-table
          responsive="sm"
          :items="items"
        />
      </b-col>
    </b-row>
  </b-card-actions>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import { BRow, BCol, BTable } from 'bootstrap-vue'

export default {
  components: {
    BRow, BCol,
    BTable,
    BCardActions,
  },
  data() {
    return {
      items: [
        {
          age: 40, first_name: 'Dickerson', last_name: 'Macdonald', Occupation: 'Job',
        },
        {
          age: 21, first_name: 'Larsen', last_name: 'Shaw', Occupation: 'Job',
        },
        {
          age: 89, first_name: 'Geneva', last_name: 'Wilson', Occupation: 'Bussiness',
        },
        {
          age: 38, first_name: 'Jami', last_name: 'Carney', Occupation: 'Bussiness',
        },
        {
          age: 40, first_name: 'James', last_name: 'Thomson', Occupation: 'Job',
        },
      ],
    }
  },
}
</script>
