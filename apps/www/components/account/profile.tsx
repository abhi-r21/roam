"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

export function Profile() {
  const { user } = useUser();

  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex items-center justify-center py-4">
        <div className="flex items-center gap-1.5">
          <div className="bg-pink-500 w-1.5 h-1.5 rounded-full" />
          <h1 className="font-medium tracking-tight text-center">
            Profile Details
          </h1>
        </div>
      </div>
      {/* Main Area */}
      <div className="overflow-scroll flex-1 flex flex-col items-center mx-auto max-w-4xl w-full pt-10 gap-16">
        <div className="w-full">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">AVATAR</h2>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={user?.imageUrl} className="w-8 h-8 rounded-full" />
              <p className="text-sm tracking-tight">
                This is the avatar of your account.
              </p>
            </div>
            <Button size={"xs"} variant={"ghost"}>
              Edit
            </Button>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">username</h2>
          <div className="w-full flex items-center justify-between">
            {/* <Input className="max-w-96"/> */}
            <p className="text-sm">yuvan</p>
            <Button size={"xs"} variant={"ghost"}>
              Edit
            </Button>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">email address</h2>
          <div className="w-full flex items-center justify-between">
            <p className="text-sm">{user?.emailAddresses[0].emailAddress}</p>
            <Button size={"xs"} variant={"ghost"}>
              Edit
            </Button>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">phone number</h2>
          <div className="w-full flex items-center justify-between">
            <p className="text-sm">+91 984934281</p>
            <Button size={"xs"} variant={"ghost"}>
              Edit
            </Button>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">connected accounts</h2>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1.5">
                <FcGoogle size={15}/>
                <p className="text-sm">Google</p>
            </div>
            <Button size={"xs"} variant={"ghost"}>
              Edit
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
