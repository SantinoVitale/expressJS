import { faker } from "@faker-js/faker"

export const generateProduct = () => {
  return{
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.number.int({max: 100}),
    id: faker.database.mongodbObjectId(),
    category: faker.commerce.productMaterial()
  }
}