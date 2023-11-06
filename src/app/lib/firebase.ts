
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE,
  appId: process.env.NEXT_PUBLIC_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export { auth, provider, db };


// Googleでサインイン & DBと紐付け
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);

  // 認証情報からユーザー情報を取得
  const user = result.user;

  const userRef = doc(db, "posts", user.uid);
  const docSnap = await getDoc(userRef);

  // ユーザーデータがまだFirestoreにない場合は新しく作成
  if (!docSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      // その他保存したいユーザー情報
    });
    console.log("新しいユーザープロファイルを作成しました。");
  } else {
    console.log("既存のユーザーです。");
  }
}

export const signOut = () => {
  auth.signOut();
}

export const showUserProfile = () => {
  const photoURL = auth.currentUser?.photoURL;
  return photoURL;
}