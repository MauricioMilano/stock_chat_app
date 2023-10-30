<template>
  <q-page class="flex flex-center">
  
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  beforeCreate() {
      this.$router.push({ path: '/login' })
  }
}
</script>
