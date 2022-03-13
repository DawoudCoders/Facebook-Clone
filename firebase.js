const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");

const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();



export { db };
