import { firestore } from "./config";
export const CreateCategory = async (data) => {
  const { category, id } = data;
  console.log(data);
  const categoryRef = firestore.doc(`categories/${category.toLowerCase()}`);
  const categoryData = {
    id,
    label: category,
  };
  try {
    await categoryRef.set(categoryData);
  } catch (error) {
    console.log("error creating category", error.message);
  }
};
export const CreateProduct = async (data) => {
  const productRef = firestore.doc(`products/${data.query}`);
  try {
    await productRef.set(data);
  } catch (error) {
    console.log("error creating category", error.message);
  }
};
