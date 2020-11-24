const iRole = {
    scopes: {},
    can() {
        Vue.$root.user
    },
    fetch() {
        console.log(appStore.getters['AircraftBasesSingle' + '/' + 'iRecord'])
        var $this = this;
        ApiService.get('rules')
            .then(response => {
                $this.scopes = response.handel.data
            })
    }
};

export default iRole;
