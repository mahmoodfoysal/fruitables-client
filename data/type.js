const category = [
    {
        cat_id: 0,
        cat_name: 'All Products'
    },
    {
        cat_id: 1,
        cat_name: 'vegetable'
    },
    {
        cat_id: 2,
        cat_name: 'Fruits'
    },
    {
        cat_id: 3,
        cat_name: 'Bread'
    },
    {
        cat_id: 4,
        cat_name: 'Meat'
    }
];

const products = [
    {   
        cat_id: 1,
        pro_id: 1,
        pro_image: 'https://i.ibb.co/NZs401p/leaft-vegetables.jpg',
        cat_name: 'Vegetable',
        pro_name: 'Leafy vegetables',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 4.99,
        pro_quantity: '1KG'
    },
    {   
        cat_id: 1,
        pro_id: 2,
        pro_image: 'https://i.ibb.co/YRBdsvm/fruite-item-4.jpg',
        cat_name: 'Vegetable',
        pro_name: 'Pumpkin',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 3.99,
        pro_quantity: '1KG'
    },
    {   
        cat_id: 1,
        pro_id: 3,
        pro_image: 'https://i.ibb.co/yNYP5yz/root-vegetables.jpg',
        cat_name: 'Vegetable',
        pro_name: 'Root vegetables',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 5.20,
        pro_quantity: '1KG'
    },
    {   
        cat_id: 1,
        pro_id: 4,
        pro_image: 'https://i.ibb.co/fdPmjDL/beetroot.jpg',
        cat_name: 'Vegetable',
        pro_name: 'Beetroot',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 5.99,
        pro_quantity: '1KG'
    },
    {   
        cat_id: 2,
        pro_id: 5,
        pro_image: 'https://i.ibb.co/NTvVLwL/fruite-item-6.jpg',
        cat_name: 'Fruits',
        pro_name: 'Apple',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 2.99,
        pro_quantity: '1KG'
    },
    {   
        cat_id: 2,
        pro_id: 6,
        pro_image: 'https://i.ibb.co/d0NVrGr/fruite-item-1.jpg',
        cat_name: 'Fruits',
        pro_name: 'Orange',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 3.99,
        pro_quantity: '1KG'
    },
    {   
        cat_id: 2,
        pro_id: 7,
        pro_image: 'https://i.ibb.co/CVTcv85/mango.jpg',
        cat_name: 'Fruits',
        pro_name: 'Mango',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 6.99,
        pro_quantity: '1KG'
    },
    {   
        cat_id: 2,
        pro_id: 8,
        pro_image: 'https://i.ibb.co/N2pgHyp/fruite-item-5.jpg',
        cat_name: 'Fruits',
        pro_name: 'Grapes',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 3.50,
        pro_quantity: '1KG'
    },
    {   
        cat_id: 2,
        pro_id: 9,
        pro_image: 'https://i.ibb.co/tCxHRf6/fruite-item-2.jpg',
        cat_name: 'Fruits',
        pro_name: 'Apricots',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 4.50,
        pro_quantity: '1KG'
    },
    {   
        cat_id: 3,
        pro_id: 10,
        pro_image: 'https://i.ibb.co/6J1nqJV/bagels.jpg',
        cat_name: 'Bread',
        pro_name: 'Bagels',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 1.50,
        pro_quantity: '1 Pound'
    },
    {   
        cat_id: 3,
        pro_id: 11,
        pro_image: 'https://i.ibb.co/M5gPj4b/cake.jpg',
        cat_name: 'Bread',
        pro_name: 'Cakes',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 2.50,
        pro_quantity: '1 Pound'
    },
    {   
        cat_id: 3,
        pro_id: 12,
        pro_image: 'https://i.ibb.co/D8xSMmM/muffin.jpg',
        cat_name: 'Bread',
        pro_name: 'Muffins',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 7.50,
        pro_quantity: '1 Pound'
    },
    {   
        cat_id: 3,
        pro_id: 13,
        pro_image: 'https://i.ibb.co/DtKCrHt/rolls-bread.jpg',
        cat_name: 'Bread',
        pro_name: 'Bread rolls',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 4.99,
        pro_quantity: '1 Pound'
    },
    {   
        cat_id: 4,
        pro_id: 14,
        pro_image: 'https://i.ibb.co/LRhTypS/organic-beef-dice-1.jpg',
        cat_name: 'Meet',
        pro_name: 'Beef',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 4.99,
        pro_quantity: '1 KG'
    },
    {   
        cat_id: 4,
        pro_id: 15,
        pro_image: 'https://i.ibb.co/Xjb7YwS/mutton.jpg',
        cat_name: 'Meet',
        pro_name: 'Mutton',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 5.99,
        pro_quantity: '1 KG'
    },
    {   
        cat_id: 4,
        pro_id: 16,
        pro_image: 'https://i.ibb.co/J2v6NJL/checken-organic.png',
        cat_name: 'Meet',
        pro_name: 'Checken',
        pro_details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        pro_price: 1.99,
        pro_quantity: '1 KG'
    },
]