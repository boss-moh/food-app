// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   // Create 5-10 users
//   const users = [];
//   for (let i = 0; i < 10; i++) {
//     const role = i % 3 === 0 ? "ADMIN" : i % 3 === 1 ? "CHEF" : "CUSTOMER";
//     const user = await prisma.user.create({
//       data: {
//         email: `user${i + 1}${Date.now()}@test.com`,
//         password: "password123",
//         role: role,
//         ...(role === "CUSTOMER" && {
//           customer: {
//             create: {
//               address: `Address ${i + 1}`,
//               phone: `12345678${i + 1}`,
//             },
//           },
//         }),
//       },
//     });
//     users.push(user);
//   }

//   // Create categories
//   const category1 = await prisma.category.create({
//     data: {
//       name: "meat",
//       imageUrl: "/images/category/meat.png",
//     },
//   });

//   const category2 = await prisma.category.create({
//     data: {
//       name: "Pancakes",
//       imageUrl: "/images/category/pancakes.png",
//     },
//   });

//   const category3 = await prisma.category.create({
//     data: {
//       name: "Soups",
//       imageUrl: "/images/category/soups.png",
//     },
//   });

//   // Create products
//   const products = [];
//   const productNames = [
//     "Pepperoni Pizza",
//     "Cheeseburger",
//     "Cola",
//     "Margherita Pizza",
//     "Veggie Burger",
//     "Lemonade",
//   ];
//   for (const name of productNames) {
//     const category = [category1, category2, category3][
//       Math.floor(Math.random() * 3)
//     ]; // Randomly assign to a category
//     const product = await prisma.product.create({
//       data: {
//         name,
//         description: `${name} description.`,
//         price: Math.floor(Math.random() * 10) + 5, // Random price between 5-15
//         categoryId: category.id,
//       },
//     });

//     const catg = await prisma.category.findUnique({
//       where: {
//         id: category.id,
//       },
//     });

//     const count = catg?.count ?? 0 + 1;
//     await prisma.category.update({
//       where: {
//         id: category.id,
//       },
//       data: {
//         count,
//       },
//     });

//     products.push(product);
//   }

//   // Create orders for customers with 5-10 items
//   for (const user of users.filter((user) => user.role === "CUSTOMER")) {
//     const orderItemCount = Math.floor(Math.random() * 6) + 5; // Random number of items between 5 and 10
//     const items = [];
//     for (let i = 0; i < orderItemCount; i++) {
//       const product = products[Math.floor(Math.random() * products.length)];
//       items.push({
//         menuItemId: product.id,
//         quantity: Math.floor(Math.random() * 3) + 1, // Random quantity between 1-3
//       });
//     }

//     //   await prisma.order.create({
//     //     data: {
//     //       customerId: user.id,
//     //       status: "PENDING",
//     //       items: {
//     //         create: items,
//     //       },
//     //     },
//     //   });
//     // }
//   }
//   console.log("Seed data created!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
