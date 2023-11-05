"use client"
import { auth } from "../lib/firebase";
import { SignInButton, SignOutButton, UserInfo } from "./auth";
import { useAuthState } from "react-firebase-hooks/auth"

export default function Head() {
  const [user] = useAuthState(auth);
  
  return(
    <div className="bg-white flex gap-5 p-5">
      { user ? (
        <>
        {/* アイコンは変更する */}
          <div className=" font-bold pt-5 underline">
            🏠ホーム
          </div>
          <div className=" font-bold pt-5 underline">
            👨マイページ
          </div>
          <div className=" font-bold pt-5 underline">
            ✒️投稿
          </div>
          {/* autoはできる限りのmarginをとる */}
          <div className=" flex gap-3 ml-auto">
            <UserInfo />
            <SignOutButton />
          </div>
        </>
        ) : (
        <>
          <div className=" font-bold pt-5 underline">
            🏠ホーム
          </div>
          <SignInButton />
        </>
        )
      }
    </div>
  )
}