"use client"
import { auth } from "./auth/firebase";
import { SignInButton, SignOutButton, UserInfo } from "./auth/auth";
import { useAuthState } from "react-firebase-hooks/auth"

export default function Home() {
  const [user] = useAuthState(auth);

  return (
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
    </div>
  )
}