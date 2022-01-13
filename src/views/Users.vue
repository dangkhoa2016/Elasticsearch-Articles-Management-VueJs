<template>
  <b-row>
    <b-col cols="12">
      <table-basic />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import TableBasic from './components/TableBasic.vue'

export default {
  components: {
    BRow,
    BCol,

    TableBasic,
  }
}
</script>
