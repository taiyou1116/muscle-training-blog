import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import Image from "next/image";

// Buttonでサインイン
export function SignInButton() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  }

  return(
    <div className=" bg-slate-400 flex flex-col rounded-md shadow-md p-10 gap-5">
      <h1 className="font-bold">ログインする</h1>
      <button 
        className="bg-orange-400 p-2 rounded-md text-white font-bold" 
        onClick={() => signInWithGoogle()}>
        グーグルでサインイン
      </button>
    </div>
  )
}

// Buttonでサインアウト
export function SignOutButton() {
  return(
    <div className=" bg-slate-400 flex flex-col rounded-md shadow-md p-10 gap-5">
      <h1 className="font-bold">サインアウトする</h1>
      <button 
        className="bg-orange-400 p-2 rounded-md text-white font-bold" 
        onClick={() => auth.signOut()}>
        サインアウト
      </button>
    </div>
  )
}

export function UserInfo() {
  const photoURL = auth.currentUser?.photoURL;

  return (
    <div>
      {photoURL ? (
        <Image 
          src={photoURL}
          alt="User profile picture" // alt属性
          width={100} // 画像の幅
          height={100} // 画像の高さ
        />
      ) : (
        <p>No profile picture available</p>
      )}
    </div>
  );
}
