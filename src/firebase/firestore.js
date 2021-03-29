import { firestore } from "./config";

export const CreateBranch = async (data) => {
  const { name, storeName, address, ownerId, branchCode } = data;
  const branchRef = firestore.doc(`stores/${ownerId}/branches/${branchCode}`);
  const shopData = {
    id: branchCode,
    storeName,
    branchCode,
    name,
    address,
  };
  try {
    await branchRef.set(shopData);
  } catch (error) {
    console.log("error creating branch", error.message);
  }
};
export const CreateCategory = async (data) => {
  const { category, id, ownerId } = data;
  console.log(data);
  const categoryRef = firestore.doc(
    `categories/${ownerId}/categories/${category.toLowerCase()}`
  );
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
export const CreateProduct = async (data, ownerId) => {
  const { productId, branchId } = data;
  console.log(data);

  const categoryRef = firestore.doc(
    `products/${ownerId}/branch/${branchId}/products/${productId}`
  );
  try {
    // await categoryRef.set(data);
  } catch (error) {
    console.log("error creating category", error.message);
  }
};
export const CreateEmployee = async (data) => {
  const { name, storeName, address, ownerId, branchCode, type, id } = data;
  const employeeRef = firestore.doc(`employees/${ownerId}/${type}/${id}`);
  const employeeData = {
    id,
    storeName,
    storeId: ownerId,
    branchCode,
    name,
    address,
  };
  try {
    await employeeRef.set(employeeData);
  } catch (error) {
    console.log("error creating shop", error.message);
  }
};
