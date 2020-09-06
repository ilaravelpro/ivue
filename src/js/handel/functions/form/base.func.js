import {mapGetters} from "vuex";
import {SET_BREADCRUMB} from "../../../../../../js/handel/store/system/breadcrumbs";

const BaseForm = {
    computed: {
        fields() {
            return this.items ||  this.$store.getters[this.storeIndex + '/iFields'];
        }
    },
    watch: {
    }
};

export default BaseForm;
