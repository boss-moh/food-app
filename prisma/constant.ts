

const productsList = [
  {
    name: "Mighty Super Cheesecake",
    description:
      "A creamy and delicious cheesecake topped with fresh berries and a drizzle of berry sauce. This indulgent dessert is perfect for any occasion and will satisfy your sweet tooth cravings.",
    price: 8.99,
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1741688453/food-app/gnz3xfmfgwjp56u5uq3j.jpg",
    categoryId: "category-1",
    prepTime: 45,
    rating: 5,
    ingredients: [
      "Cream Cheese",
      "Sugar",
      "Eggs",
      "Vanilla Extract",
      "Graham Cracker Crust",
      "Fresh Berries",
    ],
    nutritionalInfo: ["calories: 150", "fat: 8", "carbs: 12", " protein: 6"],
  },
  {
    name: "Classic Spaghetti Bolognese",
    description:
      "A savory and hearty spaghetti with rich tomato and meat sauce, topped with grated Parmesan.",
    price: 12.99,
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1741770931/pexels-photo-1279330_gs70yc.jpg",
    categoryId: "category-6",
    prepTime: 30,
    rating: 3,
    ingredients: [
      "Spaghetti",
      "Ground Beef",
      "Tomatoes",
      "Garlic",
      "Olive Oil",
      "Parmesan",
    ],
    nutritionalInfo: ["calories: 150", "fat: 8", "carbs: 12", "protein: 6"],
  },
  {
    name: "Margherita Pizza",
    description:
      "Classic pizza topped with fresh tomatoes, mozzarella, and basil.",
    price: 8.99,
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1741771119/pexels-photo-2147491_rryys6.jpg",
    categoryId: "category-4",
    prepTime: 15,
    rating: 4.7,
    ingredients: ["Tomato Sauce", "Mozzarella", "Basil", "Dough"],
    nutritionalInfo: [
      "calories: 250",
      "fat: 10g",
      "carbs: 30g",
      "protein: 12g",
    ],
  },
  {
    name: "Grilled Salmon",
    description: "Perfectly grilled salmon with a lemon butter sauce.",
    price: 12.99,
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1740557810/samples/food/fish-vegetables.jpg",
    categoryId: "category-4",
    prepTime: 20,
    rating: 4.8,
    ingredients: ["Salmon", "Lemon", "Butter", "Garlic"],
    nutritionalInfo: ["calories: 220", "fat: 14g", "carbs: 2g", "protein: 25g"],
  },
  {
    name: "Voicdian Delight",
    description: "A mysterious and exquisite dish from the lands of Voicdia.",
    price: 15.99,
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1740557818/samples/breakfast.jpg",
    categoryId: "category-5",
    prepTime: 25,
    rating: 4.9,
    ingredients: ["Voicdian Root", "Celestial Herbs", "Moonlit Sauce"],
    nutritionalInfo: ["calories: 180", "fat: 5g", "carbs: 20g", "protein: 8g"],
  },
];



const categories = [
  {
    id: "category-1",
    name: "Desserts",
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1741688453/food-app/gnz3xfmfgwjp56u5uq3j.jpg",
  },
  {
    id: "category-3",
    name: "Pizzas",
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1741771119/pexels-photo-2147491_rryys6.jpg",
  },
  {
    id: "category-4",
    name: "Fish and Seafood",
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1740557810/samples/food/fish-vegetables.jpg",
  },
  {
    id: "category-5",
    name: "Vegetables & Fruits",
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1740557818/samples/breakfast.jpg",
  },
  {
    id: "category-6",
    name: "Spaghettis",
    imageUrl:
      "https://res.cloudinary.com/dhfzpgyuz/image/upload/f_auto,q_auto/v1741770931/pexels-photo-1279330_gs70yc.jpg",
  },
];

const admin = {
  name: "Admin",
  email: "admin@a2.com",
  phone:"00000000"
};



export const feedbackData = [
  {
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    rating: 5,
    content:
      "These headphones are amazing! The noise cancellation is top-notch and the battery life exceeds my expectations. Definitely worth the investment.",
  },
  {
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    rating: 4,
    content:
      "Great sound quality and comfortable to wear for long periods. The only downside is they get a bit warm after a few hours of use.",
  },
  {
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    rating: 5,
    content:
      "This smartwatch has changed my fitness routine completely. The health tracking features are accurate and the battery lasts for days!",
  },
  {
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
    rating: 3,
    content:
      "The watch is good but the app could use some improvements. Sometimes it disconnects and I have to restart my phone.",
  },
  {
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    rating: 4,
    content:
      "Impressive sound for such a compact speaker. I took it camping and it was perfect. The waterproof feature really works!",
  },
  {
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    rating: 5,
    content:
      "This backpack has so many pockets and compartments! The laptop section is well-padded and the USB charging port is super convenient.",
  },
  {
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    rating: 2,
    content: "The keys are too loud and the RGB lighting stopped working after a week. Not worth the price.",
  },
  {
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    rating: 5,
    content:
      "As a programmer, this keyboard is a dream to type on. The mechanical switches are responsive and the customization options are endless.",
  },
  {
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    rating: 4,
    content:
      'Great backpack for daily commute. Fits my 15" laptop perfectly and has room for all my accessories. The only issue is the zipper feels a bit flimsy.',
  },
  {
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    rating: 3,
    content:
      "The sound quality is good but not great. Battery life is excellent though, and it survived getting splashed at the pool.",
  },
]

export type feedBackType = typeof feedbackData[0]
export type createProductType = typeof productsList[0]
export {admin,categories,productsList}