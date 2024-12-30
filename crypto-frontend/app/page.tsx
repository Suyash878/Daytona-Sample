'use client';
import { Button } from "@/components/ui/button";

export default function Home() {

  function handleClick() {
    window.location.href = '/crypto';
  }

  return (
    <div className="text-center bg-black text-white w-screen p-4 h-screen">
      <div className="h-1/3">

      </div>
      <div className="text-6xl font-bold mb-4">
          <h1>Latest Crypto Prices</h1>
      </div>
      <div className="mb-2 text-sm font-extralight text-slate-200">
          <p>Get the latest crypto currency prices on your Fingertips</p>
      </div>
      <Button className="bg-white mt-5 text-black hover:bg-zinc-600" onClick={handleClick}>Get Started</Button>
    </div>
  );
}
