function initialState() {
    return {
        options: {
            show: {
                black_page: false,
                menu: {
                    right: false,
                    left: false,
                    current: null
                },
                filter: false
            },
            sections: {},
            menu: {
                main: [
                    {
                        title: 'Desktop',
                        icon: 'desktop',
                    },
                    {
                        title: 'Messages',
                        icon: 'message',
                        count: 20,
                        size: 'font-size-1-4',
                    },
                    {
                        title: 'Chat',
                        icon: 'talk',
                        count: 35,
                        size: 'font-size-1-4',
                    },
                    {
                        title: 'Points',
                        icon: 'point',
                        count: 48,
                        size: 'font-size-1-4',
                    },
                    {
                        title: 'Stars',
                        icon: 'star',
                        count: 15,
                    },
                    {
                        title: 'Likes',
                        icon: 'like',
                        count: 10,
                    },
                    {
                        title: 'Favorites',
                        icon: 'heart',
                    },
                    {
                        title: 'History',
                        icon: 'history',
                    },
                    {
                        title: 'Account',
                        icon: 'user',
                    },
                    {
                        title: 'Setting',
                        icon: 'settings',
                    },
                    {
                        title: 'About',
                        icon: 'about',
                    },
                ]
            }
        },
    }
}

const getters = {
    options: state => state.options,
}

const actions = {
    async setOptions({ commit }, value) {
        commit('setOptions',  value);
    },
    setOption({ commit }, value) {
        commit('setOption',  value);
    },
    setSectionOptions({ commit }, value) {
        commit('setSectionOptions',  value);
    },
    toggleMenu({ commit }, pos) {
        commit('toggleMenu', pos);
    },
    setShowFilter({ commit }) {
        commit('setShowFilter');
    },
    resetOptions({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setOptions(state, options) {
        state.options = $.extend(state.options, options)
    },
    setOption(state, value) {
        var $options = state.options;
        if (typeof($options[value[0]]) === "undefined")
            $options[value[0]] = {};
        if (typeof(value[1]) !== "undefined")
            if ($.isArray(value[2]))
                $.each(value[2], function (i,v) {
                    $options[value[0]][value[1]][i] = v;
                });
            else
                $options[value[0]][value[1]] = value[2];
    },
    setSectionOptions(state, value) {
        state.options.sections[value[0]] = value[1];
    },
    toggleMenu(state, pos) {
        if (pos === 'off') {
            $.each(state.options.show.menu, function (i,v) {
                state.options.show.menu[i] = false
            })
            state.options.show.black_page = false
        }else if (!state.options.show.menu.current || pos === state.options.show.menu.current) {
            state.options.show.menu[pos] = !state.options.show.menu[pos]
            state.options.show.black_page = !state.options.show.black_page
        }else{
            var diff = state.options.show.menu.current;
            state.options.show.menu[pos] = !state.options.show.menu[pos]
            state.options.show.menu[diff] = false
            state.options.show.black_page = !state.options.show.black_page
        }
        state.options.show.menu.current = pos
    },
    setShowFilter(state) {
        state.options.show.filter = !state.options.show.filter
    },
    resetOptions(state) {
        state = Object.assign(state, initialState())
    }
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
