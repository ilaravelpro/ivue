<template>
    <div>
        <i-form-fields :items="items" />
    </div>
</template>

<script>
    export default {
        name: "i-form",
        props: {
            items: [Object, Array]
        },
    }
</script>
