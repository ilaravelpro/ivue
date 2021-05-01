/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 1/28/21, 12:05 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

const LoadIndexData = {
    computed() {
        return {
            iRecords() {
                return this.$store.getters[this.storeNamespace + '/' + 'iRecords']
            },
            iStatuses() {
                return this.$store.getters[this.storeNamespace + '/' + 'iStatuses']
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
            fetchData(page = 1) {
                return this.$store.dispatch(this.storeNamespace + '/fetchData', page);
            },
            fetchStatus() {
                return this.$store.dispatch(this.storeNamespace + '/fetchStatus', this.status_url);
            },
            deleteItem(item) {
                if (confirm('Are you sure you want to delete this Item?'))
                    this.destroyData(item.id)
            },
            getSlots(name) {
                return this.slots && this.slots[name] ? this.slots[name] : false;
            },
        }
    },
    watch() {
        return {

        }
    },
};

export default LoadIndexData;
