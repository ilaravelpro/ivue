const LoadIndexData = {
    computed() {
        return {
            iRecords() {
                return this.$store.getters[this.storeNamespace + '/' + 'iRecords']
            },
            iTotal() {
                return this.$store.getters[this.storeNamespace + '/' + 'iTotal']
            },
            iMeta() {
                return this.$store.getters[this.storeNamespace + '/' + 'iMeta']
            },
            iFilterAll() {
                return this.$store.getters[this.storeNamespace + '/' + 'iFilterAll']
            },
            iOperatorAll() {
                return this.$store.getters[this.storeNamespace + '/' + 'iOperatorAll']
            },
            iLoading() {
                return this.$store.getters[this.storeNamespace + '/' + 'iLoading']
            },
        }
    },
    methods() {
        return {
            setState(key, value) {
                return this.$store.dispatch(this.storeNamespace + '/setState', [key, value]);
            },
            destroyData(key) {
                return this.$store.dispatch(this.storeNamespace + '/destroyData', key);
            },
            fetchData() {
                return this.$store.dispatch(this.storeNamespace + '/fetchData');
            },
            deleteItem(item) {
                if (confirm('Are you sure you want to delete this Item?'))
                    this.destroyData(item.id)
            },
            getSlots(name) {
                return this.slots && this.slots[name] ? this.slots[name] : false;
            }
        }
    },
    watch() {
        return {

        }
    },
};

export default LoadIndexData;