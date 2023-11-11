
import { faL } from "@fortawesome/free-solid-svg-icons";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, collectionGroup, doc, getDoc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(app);

export { auth }

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

const handleFileChanges = async (files: FileList) => {
  
  const filesArray = Array.from(files);

  const imageUrls = await Promise.all(
    filesArray.map(async (file) => {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    })
  );
    return imageUrls;
};

/**与えられたユーザーIDに基づいて、新しい投稿をFirestoreのサブコレクションに追加します。*/
export const createNewPost = async (exercisesData: any, text: string, files?: FileList) => {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    console.error('ユーザーが認証されていません。');
    return false;
  }
  
  try {
    // 親ドキュメントの参照を取得
    const postDocRef = doc(db, 'posts', uid);
    // サブコレクションへの参照を取得
    const subCollectionRef = collection(postDocRef, 'sub');

    let imageUrl = null;
    if (files) {
      imageUrl = await handleFileChanges(files);
    }

    // 新しいドキュメントをサブコレクションに追加
    const docRef = await addDoc(subCollectionRef, {
      exercisesData: exercisesData,
      text: text,
      imageUrl: imageUrl,
    });

    console.log('Document successfully written!');
    return true;

  } catch (e) {
    console.error('Error writing document: ', e);
    return false;
  }
}

export const getData = async () => {

  // サブコレクション 'sub' の全てのドキュメントにアクセスする
  const postsQuery = query(collectionGroup(db, 'sub'));
  const snapshot = await getDocs(postsQuery);

  const postsData = await Promise.all(snapshot.docs.map(async (doc) => {
    
    const parentDocRef = doc.ref.parent.parent;
    // 親ドキュメントの参照がnullでないことを確認
    if (parentDocRef) {
      // 親ドキュメントのデータを取得
      const parentDocSnapshot = await getDoc(parentDocRef);
      // 親ドキュメントのデータとサブドキュメントのデータを組み合わせる
      return {
        ...doc.data(),
        parentData: parentDocSnapshot.data()|| {}
      };
    }else {
      return { ...doc.data(), parentData: {} };
    }
  }));
  return postsData;
};