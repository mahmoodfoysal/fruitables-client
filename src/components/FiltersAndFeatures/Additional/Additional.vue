<script>
export default {
    name: 'Additional'
}
</script>

<template>
    <h4>Additional</h4>
    <div class="mb-2 additional-text-style">
        <input type="radio" class="me-2" id="Categories-1" name="Categories-1" value="Beverages">
        <label for="Categories-1"> Organic</label>
    </div>
    <div class="mb-2 additional-text-style">
        <input type="radio" class="me-2" id="Categories-2" name="Categories-1" value="Beverages">
        <label for="Categories-2"> Fresh</label>
    </div>
    <div class="mb-2 additional-text-style">
        <input type="radio" class="me-2" id="Categories-3" name="Categories-1" value="Beverages">
        <label for="Categories-3"> Sales</label>
    </div>
    <div class="mb-2 additional-text-style">
        <input type="radio" class="me-2" id="Categories-4" name="Categories-1" value="Beverages">
        <label for="Categories-4"> Discount</label>
    </div>
    <div class="mb-2 additional-text-style">
        <input type="radio" class="me-2" id="Categories-5" name="Categories-1" value="Beverages">
        <label for="Categories-5"> Expired</label>
    </div>
</template>

<style scoped>

.additional-text-style label {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
</style>