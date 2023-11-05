"use client"
import Link from "next/link";
import { auth } from "../lib/firebase";
import { SignInButton, SignOutButton, UserInfo } from "./auth";
import { useAuthState } from "react-firebase-hooks/auth"

export default function Head() {
  const [user] = useAuthState(auth);
  
  return(
    <div className=" h-screen flex items-center justify-center">
      { user ? 
        (
          <>
            <UserInfo />
            <SignOutButton />
          </>
          ) : (
            <SignInButton />
          )
        }
      <Link href="/auth">
        auth
      </Link>
    </div>
  )
}