import { RedirectToSignIn, SignedIn, SignedOut, UserProfile } from "@clerk/clerk-react";
import React from "react";

function UserDetail() {
  return (
    <div>
    
      <SignedIn>
        <UserProfile />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}

export default UserDetail;
