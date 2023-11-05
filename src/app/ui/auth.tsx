import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase"
import Image from "next/image";

// サインインボタン
export function SignInButton() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  }

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
