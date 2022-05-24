import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        categories: [],
        products: [],
        productFilters: {
            price: {
                min: null,
                max: null
            },
            categoryId: 0,
            checkIfAvailable: false
        },
        filteredProducts: []
    },
    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories
        },
        SET_PRODUCTS(state, products) {
            state.products = products
        },
        SET_PRODUCT_MIN_PRICE(state, minPrice) {
            state.productFilters.price.min = minPrice
        },
        SET_PRODUCT_MAX_PRICE(state, maxPrice) {
            state.productFilters.price.max = maxPrice
        },
        SET_PRODUCT_CATEGORY_ID(state, categoryId) {
            state.productFilters.categoryId = categoryId
        },
        SET_CHECK_IF_AVAILABLE(state, checkIfAvailable) {
            state.productFilters.checkIfAvailable = checkIfAvailable
        },
        RESET_PRODUCT_FILTERS(state) {
            state.productFilters.price.min = null
            state.productFilters.price.max = null
            state.productFilters.categoryId = 0
            state.productFilters.checkIfAvailable = null
        },
        SET_FILTERED_PRODUCTS(state, filteredProducts) {
            state.filteredProducts = filteredProducts
        },
    },
    actions: {
        getProducts({ commit, getters }, ) {
            return axios.get('/api/products', {
                params: {
                    min_price: getters['productFiltersMinPrice'],
                    max_price: getters['productFiltersMaxPrice'],
                    category_id: getters['productFiltersCategoryId'],
                    is_available: getters['productFiltersCheckIfAvailable'],
                }
            }).then(({ data }) => {
                commit('SET_PRODUCTS', data)
            })
        },
        getCategories({ commit, state }, ) {
            return axios.get('/api/categories').then(({ data }) => {
                commit('SET_CATEGORIES', data)
            })
        },
        filterProducts({ commit, getters }) {
            let products = _.cloneDeep(getters['products'])

            const minPrice = getters['productFiltersMinPrice']
            if (minPrice) {
                products = products.filter(product => product.price >= minPrice)
            }

            const maxPrice = getters['productFiltersMaxPrice']
            if (maxPrice) {
                products = products.filter(product => product.price <= maxPrice)
            }

            const categoryId = getters['productFiltersCategoryId']
            if (categoryId) {
                products = products.filter(product => product.category_id === categoryId)
            }

            const checkIfAvailable = getters['productFiltersCheckIfAvailable']
            if (checkIfAvailable) {
                products = products.filter(product => product.available)
            }

            commit('SET_FILTERED_PRODUCTS', products)

            return products
        },
        resetProductFilters({ commit }) {
            commit('RESET_PRODUCT_FILTERS')
        }
    },
    getters: {
        products: state => state.products,
        categories: state => state.categories,
        productFiltersCategoryId: state => +state.productFilters.categoryId,
        productFiltersMinPrice: state => state.productFilters.price.min,
        productFiltersMaxPrice: state => state.productFilters.price.max,
        productFiltersCheckIfAvailable: state => state.productFilters.checkIfAvailable,
        filteredProducts: state => state.filteredProducts,
    },
})
