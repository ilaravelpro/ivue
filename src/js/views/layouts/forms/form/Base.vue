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
