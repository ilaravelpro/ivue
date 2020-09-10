const CheckboxField = {
    computed: {
        getCheck() {
            if (this.getIndex('get') && this.getOption('store.get', true)) {
                this.checked = Boolean(this.model);
            } else {
                this.checked = Boolean(this.value);
            }
            switch (this.checked) {
                case 'true':
                    this.checked = true;
                    break;
                case 'false':
                    this.checked = false;
                    break;
            }
            return this.checked;
        }
    },
    methods: {
        changeValue: function () {
            this.checked = !this.getCheck;
        },
    },
    watch: {
        checked: {
            handler: function (newValue) {
                if (typeof (newValue) !== "undefined") {
                    this.model = newValue ? 1 : null
                }
            }
        }
    }
};

export default CheckboxField;
