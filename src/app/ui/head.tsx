"use client"
import Link from "next/link";
import { auth } from "../lib/firebase";
import { SignInButton, UserInfo } from "./auth";
import { useAuthState } from "react-firebase-hooks/auth"

export default function Head() {
  const [user] = useAuthState(auth);
  
  return(
    <div className="bg-white p-3">
      <h1 className="ml-3">マッスル</h1>
      {/* 今後画像に変える */}
      <div className="flex gap-5">
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
            <div className=" flex mr-5 ml-auto cursor-pointer">
              <Link href="/mypage">
                <UserInfo />
              </Link>
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
    </div>
  )
}