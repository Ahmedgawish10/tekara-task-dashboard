"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Tekar</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Features
              </a>
              <a href="#about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                Contact
              </a>
              <Button
                variant="outline"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="flex   justify-center gap-12">
            <div className="flex-1 text-center  ">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                First design login please  <br />
                <span className="text-primary">and to be able show dashboard</span>
              </h1>
              <p className="mt-6 text-center text-lg text-gray-600 ">
                Simple Hero Section.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-center">
                <Button
                  size="lg"
                  onClick={() => router.push('/login')}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push('#features')}
                >
                  Learn More
                </Button>
              </div>
            </div>
         
          </div>
        </div>
      </section>


    </div>
  );
}
