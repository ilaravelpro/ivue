const BaseForm = {
    methods: {
        fields(name = null) {
            var items = this.items ||  this.$store.getters[this.storeNamespace + '/iFields'];
            return name ? items[name] : items;
        }
    }
};

export default BaseForm;
