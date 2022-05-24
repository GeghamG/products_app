<template>
    <div class="template">
        <div class="sticky-top">
            <h4>Filters</h4>
            <b-nav vertical>
                <b-form>
                    <b-card
                        title="Price"
                        class="mb-2"
                    >
                        <b-row class="mb-2">
                            <b-col sm="3">
                                <label for="minPrice">Min:</label>
                            </b-col>
                            <b-col sm="9">
                                <b-form-input size="sm" type="number" id="minPrice" v-model="minPrice" class="mr-1"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="3">
                                <label for="maxPrice">Max:</label>
                            </b-col>
                            <b-col sm="9">
                                <b-form-input size="sm" type="number" id="maxPrice" v-model="maxPrice" class="mr-1"></b-form-input>
                            </b-col>
                        </b-row>
                    </b-card>

                    <b-card
                        title="Category"
                        class="mb-2"
                    >
                        <b-row class="mb-2">
                            <b-col sm="12">
                                <b-form-select size="sm" class="w-100" id="categoryId" v-model="categoryId" :options="categoryOptions"></b-form-select>
                            </b-col>
                        </b-row>
                    </b-card>

                    <b-card
                        title="Availability"
                        class="mb-3"
                    >
                        <b-row class="mb-2">
                            <b-col sm="12" class="check-if-available">
                                <b-form-checkbox v-model="checkIfAvailable">In Store Availability</b-form-checkbox>
                            </b-col>
                        </b-row>
                    </b-card>
                    <b-button @click="resetFilters" class="me-2">Reset</b-button>
                    <b-button @click="search" variant="success">Search</b-button>
                </b-form>
            </b-nav>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            isFiltersChanged: false
        }
    },
    computed: {
        ...mapGetters([
            'products',
            'categories',
            'productFiltersMinPrice',
            'productFiltersMaxPrice',
            'productFiltersCheckIfAvailable',
            'productFiltersCategoryId'
        ]),
        minPrice: {
            set(val) {
                this.isFiltersChanged = true
                this.setProductMinPrice(val)
            },
            get() {
                return this.productFiltersMinPrice
            }
        },
        maxPrice: {
            set(val) {
                this.isFiltersChanged = true
                this.setProductMaxPrice(val)
            },
            get() {
                return this.productFiltersMaxPrice
            }
        },
        categoryId: {
            set(val){
                this.isFiltersChanged = true
                this.setProductCategoryId(val)
            },
            get(){
                return this.productFiltersCategoryId
            }
        },
        checkIfAvailable: {
            set(val){
                this.isFiltersChanged = true
                this.setCheckIfAvailable(val)
            },
            get(){
                return this.productFiltersCheckIfAvailable
            }
        },
        categoryOptions() {
            return [
                {
                    value: "0",
                    text: "All categories"
                },
                ...this.categories.map(category => ({
                    value: category.id,
                    text: category.name
                }))
            ]
        },
        totalRows() {
            return this.products.length;
        }
    },
    mounted() {
        this.$store.dispatch('getCategories')
        this.getProducts()
    },
    methods: {
        resetFilters() {
            this.resetProductFilters()
        },
        getProducts() {
            if (this.isFiltersChanged) {
                this.isFiltersChanged = false
            }
        },
        search() {
            this.$store.dispatch('filterProducts')
        },
        ...mapMutations({
            resetProductFilters: 'RESET_PRODUCT_FILTERS',
            setProductMinPrice: 'SET_PRODUCT_MIN_PRICE',
            setProductMaxPrice: 'SET_PRODUCT_MAX_PRICE',
            setProductCategoryId: 'SET_PRODUCT_CATEGORY_ID',
            setCheckIfAvailable: 'SET_CHECK_IF_AVAILABLE',
        })
    }
}
</script>

<style scoped>
.sticky-top a {
    color: #212529;
}
.template {
    min-width: 300px;
    min-height: 100vh;
    background-color: lightgray;
    margin-right: 20px;
    padding: 30px 20px 0;
}
.check-if-available .custom-control-label {
    margin-left: 10px;
}
</style>
