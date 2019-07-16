<template>
  <div id="app">
    <v-app style="background: white;">
      <router-view name="header"></router-view>
      <router-view name="navigation"></router-view>
      <v-content>
        <router-view class="pb-5" name="body"></router-view>
        <router-view class="mt-4" name="footer"></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'electron-capston'
  }
</script>

<style>
  /* CSS */
</style>
