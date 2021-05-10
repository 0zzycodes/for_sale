import firebase, { auth, firestore } from "./config";

export const createShopAdminProfile = async (userAuth, otherProps) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {
      firstName,
      lastName,
      phone,
      businessName,
      homeAddress,
    } = otherProps;
    const { email, emailVerified, uid, photoUri } = userAuth;
    const createdAt = Date.now();
    const userData = {
      id: uid,
      firstName,
      lastName,
      phone,
      businessName,
      homeAddress,
      email,
      createdAt: createdAt,
      profileImage: photoUri || "",
      hasBranch: false,
      hasSubcribedBefore: false,
      isSubscribed: false,
      subExpireDate: "",
      emailVerified,
    };
    try {
      auth.currentUser.sendEmailVerification();
      await userRef.set(userData);
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};
export const CompleteStoreSetup = async (data, userId) => {
  const userRef = firestore.doc(`users/${userId}`);

  try {
    await userRef.update(data);
  } catch (error) {
    console.log("error", error.message);
  }
};
export const UpdateShopInfo = async (data, userId) => {
  const userRef = firestore.doc(`users/${userId}`);
  try {
    await userRef.update(data);
  } catch (error) {
    console.log("error", error.message);
  }
};
export const CreateEmployeeProfile = async (data) => {
  const { id } = data;
  const cashierRef = firestore.doc(`employees/${id}`);
  try {
    await cashierRef.set(data);
  } catch (error) {
    console.log("error creating cashier", error.message);
  }
};
export const UpdateEmployeeProfile = async (data) => {
  const { id } = data;
  const cashierRef = firestore.doc(`employees/${id}`);
  try {
    await cashierRef.update(data);
  } catch (error) {
    console.log("error creating cashier", error.message);
  }
};
export const OnArchiveEmployee = async (data, history) => {
  const batch = firestore.batch();
  const { id } = data;
  const cashierRef = firestore.doc(`employees/${id}`);
  const archiveRef = firestore.doc(`archived_employees/${id}`);
  batch.set(archiveRef, data).delete(cashierRef);
  try {
    await batch.commit();
    history.goBack();
  } catch (error) {
    console.log(
      "An error occured while trying to archive cashier",
      error.message
    );
  }
};
export const OnDeleteEmployee = async (id) => {
  const batch = firestore.batch();
  const cashierRef = firestore.doc(`employees/${id}`);
  const cashierStatsRef = firestore.doc(`cashier_stats/${id}`);
  batch.delete(cashierRef).delete(cashierStatsRef);
  try {
    await batch.commit();
  } catch (error) {
    console.log(
      "An error occured while trying to delete cashier",
      error.message
    );
  }
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
