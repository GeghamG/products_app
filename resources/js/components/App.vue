<template>
    <div class="container-fluid d-flex" :class="{ 'justify-content-center align-items-center': isLoading}">
        <template v-if="!isLoading">
            <sidebar/>
            <products/>
        </template>
        <template v-else>
            <b-spinner variant="primary" label="Spinning"></b-spinner>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: true
        }
    },
    mounted() {
        this.$store.dispatch('getProducts').then(() => {
            this.$store.dispatch('filterProducts')
        }).finally(() => this.isLoading = false)

    }
}
</script>

<style>
.container-fluid {
    min-height: 80vh;
}
</style>
