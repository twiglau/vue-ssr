<template>
  <div>
    <p>Test Page</p>

    <router-link :to="{name:'link'}">link page</router-link>
    <router-link to="params/123?a=1&b=2">params page</router-link>
    <router-link to="enter/1">enter 1</router-link>
    <router-link to="enter/2">enter 2</router-link>
    <router-view />
    <p>-----------------------</p>
    <!-- <router-view name="link" /> -->
  </div>
</template>
<script>
export default {
  name: 'Test',
  props: ['pid'],
  mounted () {
    console.group()
    console.log(this.$route)
    console.log(this.$route.params)
    console.log(this.$route.query)
    console.log(this.pid)
    console.groupEnd()
  },
}
</script>
