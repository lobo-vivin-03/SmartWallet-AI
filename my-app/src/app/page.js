import Image from "next/image";
import Header from "./_components/Header";
import Head from "next/head";
import Hero from "./_components/Hero";
import { Divide } from "lucide-react";


export default function Home() {
  return (
    <div>
      <Header/>
      <Hero/>
    </div>
  );
}
