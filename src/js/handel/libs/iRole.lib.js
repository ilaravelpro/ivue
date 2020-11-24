const iRole = {
    scopes: {},
    can(name) {
        if (typeof(name) === 'object'){
            var $return = true;
            var $this = this;
            $.each(name, function (i, scope) {
                if ($this.scopes[scope] === 0) $return = false;
            })
            return $return;
        }
        name = String(name).replace('.index', '.view')
        return this.scopes[name] === 0 ? false: true;
    },
    fetch() {
        var $this = this;
        return new Promise((resolve, reject) => {
            ApiService.get('rules')
                .then(response => {
                    $this.scopes = response.handel.data
                    resolve(response.handel.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
};

export default iRole;
