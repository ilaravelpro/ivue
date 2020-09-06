const BaseForm = {
    computed: {
        fields() {
            return this.items ||  this.$store.getters[this.storeNamespace + '/iFields'];
        }
    },
    watch: {
    }
};

export default BaseForm;
