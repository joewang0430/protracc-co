"use client"

import Image from "next/image";
import NavBar from "@/components/home/NavBar";
import HomeBody from "@/components/home/HomeBody";
import Footer from "@/components/home/Footer";


export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <HomeBody />
      <Footer />
    </div>
  );
}
