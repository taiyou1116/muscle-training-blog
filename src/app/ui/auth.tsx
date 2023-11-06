import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../lib/firebase"
import Image from "next/image";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React from 'react';

const signInWithGoogle = async () => {
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

// サインインボタン
export function SignInButton() {
  return(
    <div>
      <button 
        className=" bg-sky-400 p-2 rounded-md text-white font-bold shadow-md hover:bg-sky-500" 
        onClick={() => signInWithGoogle()}>
        Googleでサインイン
      </button>
    </div>
  )
}

// サインアウトボタン
export function SignOutButton() {
  return(
    <div>
      <button 
        className=" bg-red-400 p-2 rounded-md text-white font-bold shadow-md hover:bg-red-500" 
        onClick={() => auth.signOut()}>
        サインアウト
      </button>
    </div>
  )
}

// ユーザー情報の表示
export function UserInfo() {
  const photoURL = auth.currentUser?.photoURL;

  return (
    <div>
      {photoURL ? (
        <Image 
          src={photoURL}
          alt="User profile picture" // alt属性
          width={40} // 画像の幅
          height={40} // 画像の高さ
        />
      ) : (
        <p>No profile picture available</p>
      )}
    </div>
  );
}
