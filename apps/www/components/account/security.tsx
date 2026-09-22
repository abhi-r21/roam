"use client"; 
import { Button } from "../ui/button"; 
import { Monitor } from "lucide-react"; 
 
export function Security() { 
  return <div> 
    <main className="flex flex-col w-full h-full"> 
      <div className="flex items-center justify-center py-4"> 
        <div className="flex items-center gap-1.5"> 
          <div className="bg-pink-500 w-1.5 h-1.5 rounded-full"/> 
          <h1 className="font-medium tracking-tight text-center"> 
            Security 
          </h1> 
        </div> 
      </div> 
      {/* Main Area */} 
      <div className="overflow-scroll flex-1 flex flex-col items-center mx-auto max-w-4xl w-full pt-10 gap-16"> 
        <div className="w-full"> 
          <div className="w-full grid grid-cols-[600px_1fr] gap-8"> 
            <div className="flex items-center gap-2"> 
              <p className="text-sm font-medium"> 
                Password 
              </p> 
            </div> 
            <Button size="xs" variant="ghost" className={"w-fit justify-self-start px-0"}> 
              Set Password  
            </Button> 
          </div> 
        </div> 
 
        <div className="w-full"> 
          <div className="w-full grid grid-cols-[600px_1fr] gap-8"> 
            <div className="flex items-center gap-2"> 
              <p className="text-sm font-medium"> 
                Passkeys 
              </p> 
            </div> 
            <Button size={"xs"} variant={"ghost"} className={"w-fit justify-self-start px-0"}> 
              + Add passkey 
            </Button> 
          </div> 
        </div> 
 
        <div className="w-full"> 
          <div className="w-full grid grid-cols-[600px_1fr] gap-8"> 
            <div className="flex items-center gap-2"> 
              <p className="text-sm font-medium"> 
                Two-step verification 
              </p> 
            </div> 
            <Button size={"xs"} variant={"ghost"} className={"w-fit justify-self-start px-0"}> 
              + Add two-step 
            </Button> 
          </div> 
        </div> 
 
        <div className="w-full"> 
          <div className="w-full grid grid-cols-[600px_1fr] gap-8 items-start"> 
            <div className="self-start"> 
              <p className="text-sm font-medium"> 
                Active devices 
              </p> 
            </div> 
 
            <div className="flex flex-col gap-1 max-w-sm justify-self-start"> 
              <div className="flex items-center gap-2"> 
                <Monitor size={16} /> 
                <p className="text-sm"> 
                  Windows 
                </p> 
 
                <span className="text-xs px-2 py-0.5 rounded-md bg-muted"> 
                  This device 
                </span> 
              </div> 
 
              <p className="text-sm text-muted-foreground"> 
                Firefox 156.0 
              </p> 
 
              <p className="text-sm text-muted-foreground"> 
                Chennai, India 
              </p> 
 
              <p className="text-sm text-muted-foreground"> 
                Today at 12:02  PM 
              </p> 
            </div> 
 
         </div> 
        </div> 
 
        <div className="w-full"> 
          <div className="w-full grid grid-cols-[600px_1fr] gap-8"> 
            <div className="flex items-center gap-2"> 
              <p className="text-sm font-medium"> 
                Delete account 
              </p> 
            </div> 
             
            <Button size={"xs"} variant={"ghost"} className={"w-fit justify-self-start text-red-500 hover:text-red-500"}> 
              Delete 
            </Button> 
 
          </div> 
        </div> 
 
      </div> 
    </main> 
  </div> 
} 
