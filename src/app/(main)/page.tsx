"use client"

import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { CanvasRevealEffectDemo } from "@/components/elements/hovercard";
import { BentoGridDemo } from "@/components/elements/bento";
import ProjectsSection from "@/components/Card/projectsction";
import Footer from "@/components/homescreen/footer";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import IconCloud from "@/components/ui/icon-cloud";
import RobotCanve from "@/components/elements/Robot_hand";
import BallssCanve from "@/components/elements/Ballsss";
import HumanCanva from "@/components/elements/Human_hand";
import { Button } from "@/components/ui/button";
import {  useRouter } from 'next/navigation'; // Import navigation functions


export default function Home() {
  // console.log({ Spotlight, ModelCanvas });
  const router = useRouter(); // Initialize router for navigation
  const handleRedirect = () => {
    router.push('/signin'); // Redirects the user to the sign-in page
  };
  const slugs = [
    "typescript",
    "javascript",
    "notion",
    "react",
    "googledrive",
    "slack",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "firebase",
    "vercel",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "python",
    "langchain"
  ];
  return (
    <main className="flex flex-col bg-[#0A0A0A] items-center justify-center">
      {/* hero section */}
      <section
  className="h-screen w-full !overflow-visible relative flex flex-col items-center antialiased"
  style={{
    backgroundImage:
      "radial-gradient(125% 125% at 50% 10%, #121212 40%, #373737)",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="dark:bg-grid-white/[0.04] w-full bg-grid-black/[0.2] h-screen">
    <div className="relative w-full h-[15%]">
      <SparklesCore
        background="transparent"
        minSize={1}
        maxSize={2}
        particleDensity={500}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
    </div>
    <div className="flex flex-1 flex-col items-center p-5 md:p-20">
      <div
        className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        style={{
          backgroundImage:
            "radial-gradient(125% 125% at 50% 10%, #121212 20%, transparent)",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <h1 className="font-bold text-[4.5rem] leading-[3.25rem] md:-mt-7 md:text-[11.75rem] md:leading-[3.75rem] flex items-center">
        EXE
        <div
          className="bg-white text-black px:3 py-3 md:px-4 md:py-12 ml-2 rounded"
          style={{ display: "inline-block" }}
        >
          <span className="text-[#121212] font-bold">RAG</span>
        </div>
      </h1>
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 2 }}>
        <div
          className="w-[50%] mr-[30rem] mt-[20rem] h-[50%] rotate-[100deg] flex items-center justify-center"
          style={{ zIndex: 5 }} // Ensure this is above the SparklesCore
        >
          <RobotCanve />
        </div>
        <div
          className="w-[50%] absolute flex items-center mt-[10rem] left:[40rem] justify-center"
          style={{ zIndex: 3 }} // Ensure this is above the SparklesCore
        >
          <BallssCanve />
        </div>
        
        <div
          className="w-[50%] absolute ml-[53rem] mb-[20rem] h-[50%] rotate-[80deg] items-center justify-center"
          style={{ zIndex: 3 }} // Ensure this is above the SparklesCore
        >
          <HumanCanva />
        </div>
      </div>
      
    </div>

  </div>
  <div className="mb-3 ml-10 z-[50]"> {/* Pushes button towards bottom */}
          <Button   variant="secondary" onClick={handleRedirect}   className=" hover:bg-gray-800  hover:shadow-none px-32 py-6 border-2 border-black dark:border-white uppercase bg-muted text-white  transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
          > {/* Reduced button width */}
            Welcome
          </Button>
        </div>
</section>

      {/* Infinite cards */}
      <VelocityScroll
      text="EXE RAG "
      default_velocity={5}
      className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
    />
<div className='flex flex-row mt-10 justify-around items-center ' >
  <span className=" text-4xl text-white font-bold" >Your Know this are all the platfroms</span>
        <IconCloud  iconSlugs={slugs} />
        <span className=" text-4xl text-white font-bold" >That  we Provide</span>
        </div>
      <ProjectsSection />
      <BentoGridDemo/>

      {/* Render the cards */}


      <CanvasRevealEffectDemo />
      <Footer/>
    </main>
  );
}