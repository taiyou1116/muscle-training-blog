"use client"
import Link from "next/link";
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
          <div className=" font-bold pt-5 underline cursor-pointer">
            <Link href="/">
              🏠ホーム
            </Link>
          </div>
          <div className=" font-bold pt-5 underline cursor-pointer">
            <Link href="/mypage">
              👨マイページ
            </Link>
          </div>
          <div className=" font-bold pt-5 underline cursor-pointer">
            <Link href="/post/create">
              ✒️投稿
            </Link>
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
          <div className=" ml-auto">
            <SignInButton />
          </div>
        </>
        )
      }
    </div>
  )
}