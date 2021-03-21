import firebase, { auth, firestore } from "./config";

export const createShopProfile = async (data) => {
  const { name, address, ownerId, shopId } = data;
  const shopRef = firestore.doc(`shopOwners/${ownerId}/shops/${shopId}`);
  const shopData = {
    id: shopId,
    name,
    address,
  };
  try {
    await shopRef.set(shopData);
  } catch (error) {
    console.log("error creating shop", error.message);
  }
};
export const createShopAdminProfile = async (userAuth, fullname) => {
  if (!userAuth) return;
  //   const userRef = firestore.doc(`shop/${shopId}/admin/${userAuth.uid}`);
  const userRef = firestore.doc(`shopOwners/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, emailVerified, uid, photoUri } = userAuth;
    const createdAt = Date.now();
    const userData = {
      id: uid,
      name: fullname || displayName,
      email,
      createdAt: createdAt,
      profileImage:
        photoUri || `https://api.adorable.io/avatars/285/${uid}.png`,
      hasShop: false,
      isSubscribed: false,
      emailVerified,
    };

    try {
      await userRef.set(userData);
      auth.currentUser.sendEmailVerification();
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};
export const createShopCasheirProfile = async (data, shopId) => {
  const { cashierId } = data;

  const cashierRef = firestore.doc(`shop/${shopId}/cashiers/${cashierId}`);

  try {
    await cashierRef.set(data);
  } catch (error) {
    console.log("error creating user", error.message);
  }
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
