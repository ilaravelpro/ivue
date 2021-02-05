<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 7/31/20, 4:23 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div>
        <component v-bind:is="currentTabComponent"></component>
    </div>
</template>

<script>
    export default {
        name: "i-form-base"
    }
</script>
