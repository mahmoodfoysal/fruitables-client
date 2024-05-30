import axios from "axios";

export const loadCategory = async (result) => {
    try {
        const result = await axios.get('http://localhost:5000/category');
        // this.categoryData = result.data;
        return result.data;
        // console.log(result.data);
    } catch (error) {

    }
    console.log(result)
};


export const loadProducts = async () => {
    try {
        const result = await axios.get('http://localhost:5000/products');
        const shuffledProducts = this.shuffleArray(result.data); // Shuffle the array
        // this.productsData = shuffledProducts;
    }
    catch (error) {
        console.error('Error loading products:', error);
    }
};

export const shuffleArray = (array) => {
    // Fisher-Yates (aka Knuth) Shuffle Algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const loadPosterProduct = async (result) => {
    try {
        const result = await axios.get('http://localhost:5000/bannerOffer');
        return result.data;
    }
    catch(error) {
        console.log(error);
    }
    console.log(result)
}


