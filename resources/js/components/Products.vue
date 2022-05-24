<template>
    <div class="d-flex ms-3 w-100 flex-column mt-4">
        <template v-if="totalRows">
            <h1 class="mb-3">Products</h1>
            <b-table
                :items="filteredProducts"
                :fields="fields"
                :per-page="perPage"
                :current-page="currentPage"
            ></b-table>

            <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
            ></b-pagination>
        </template>
        <h5 v-else class="text-center">
            No data found...
        </h5>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
    data() {
        return {
            currentPage: 1,
            perPage: 20,
            fields: [
                'name',
                {
                    key: "category.name",
                    label: "Category"
                },
                'description',
                {
                    key: 'price',
                    label: 'Price',
                    formatter: (value) => `$${value}`
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
            filteredProducts: 'filteredProducts'
        }),
        totalRows() {
            return this.filteredProducts.length;
        }
    }
}
</script>
