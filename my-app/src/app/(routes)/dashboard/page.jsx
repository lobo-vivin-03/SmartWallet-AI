'use client'

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import the router
import { SignIn, UserButton, useUser } from "@clerk/nextjs";

function Dashboard() {
  const { user, isSignedIn } = useUser(); // Check if the user is signed in
  const router = useRouter(); // Initialize Next.js router

  // Redirect to sign-in page if the user is not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page
    }
  }, [isSignedIn, router]);

  return (
    <div className="p-8">
      <h2 className="font-bold text-6xl">Hi, {user?.fullName || <SignIn/>}</h2> {/* Display user's full name */}
    </div>
  );
}

export default Dashboard;
