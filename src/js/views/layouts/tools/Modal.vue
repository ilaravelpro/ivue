<!--
  - Author: Amir Hossein Jahani | iAmir.net
  - Last modified: 7/28/20, 12:02 PM
  - Copyright (c) 2021. Powered by iamir.net
  -->

<template>
    <div class="modal fade" :id="$attrs.id" tabindex="-1" role="dialog" :aria-labelledby="`${$attrs.id}Label`"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="`${$attrs.id}Label`" v-text="$attrs.title"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <slot name="body" class="modal-body">

                </slot>
                <slot name="footer" class="modal-footer">

                </slot>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'i-modal',
    }

</script>
