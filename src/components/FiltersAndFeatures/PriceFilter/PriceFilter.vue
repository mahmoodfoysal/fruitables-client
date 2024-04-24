<script>
export default {
    name: 'PriceFilter',
    data() {
        return {
            priceRange: ({ min: 0, max: 500 })
        }
    },
    methods: {
        handlePriceFilter() {
            this.$emit('handle-price-range',this.priceRange)
        }
    }
}
</script>

<template>
    <div class="mb-3">
        <h4 class="mb-2">Price</h4>
        <input 
        class="form-range w-100" 
        type="range" 
        v-model="priceRange.min" 
        :min="0" 
        :max="500" 
        @input="handlePriceFilter" />
        <output 
        id="amount" 
        name="amount" 
        :for="'range-' + priceRange.min" 
        :value="priceRange.min">
        {{ priceRange.min }}
        </output>
    </div>
</template>

<style scoped></style>