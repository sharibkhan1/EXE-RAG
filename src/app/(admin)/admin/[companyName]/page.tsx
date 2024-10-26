// pages/index.js

'use client'; 

import { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import SetupContainer from '@/components/setupAdmin/containersetup';

export default function Home() {
  const [showSetup, setShowSetup] = useState(false);
  const [progress, setProgress] = useState(25);

  const handleSetupClick = () => {
    setShowSetup(true); // Show the new setup container
    setProgress(50);    // Update progress on the initial button click
  };

  return (
    <div className="flex overflow-hidden bg-[#dcdddc] justify-center dark:bg-[#2c2c2c] items-center h-screen">
      <div className="w-[90rem] h-[70rem] mt-[10rem] dark:bg-[#2c2c2c] bg-[#dcdddc] p-8 rounded-lg relative">
        {/* <div className="absolute top-0 left-0 right-0 p-4">
          <Progress value={progress} />
        </div> */}
          <SetupContainer />
      </div>
    </div>
  );
}
