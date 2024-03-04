import { applicationDefault } from "firebase-admin/app";
import admin from "firebase-admin"

admin.initializeApp({
  credential: applicationDefault(),
});

export { admin };
