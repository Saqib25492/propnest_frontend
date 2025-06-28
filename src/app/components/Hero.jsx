import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    // <section className="relative bg-gradient-to-br from-indigo-50 to-white py-20 md:py-32">
    //   {/* Background Image (optional) */}
    //   <div className="absolute inset-0 -z-10 opacity-10">
    //     <Image
    //       src="/images/house1.jpg"
    //       alt="Hero background"
    //       layout="fill"
    //       objectFit="cover"
    //       quality={80}
    //     />
    //   </div>

    //   <div className="container mx-auto px-6 text-center max-w-3xl">
    //     <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
    //       Find Your Dream <span className="text-indigo-600">Property</span>
    //     </h1>
    //     <p className="text-lg md:text-xl text-gray-600 mb-8">
    //       PropNest connects you with top-rated properties in seconds. Reliable. Fast. Beautiful.
    //     </p>
    //     <Button size="lg" className="px-8 py-6 text-base">
    //       View Listings
    //     </Button>
    //   </div>
    // </section>

<section className="relative bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-center h-[80vh]">
  {/* Background image */}
  <Image
    src="/images/house1.jpg"
    alt="Hero background"
    fill
    quality={80}
    className="object-cover opacity-15"
  />

  {/* Content */}
  <div className="absolute px-6 max-w-3xl">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
      Find Your Dream <span className="text-indigo-600">Property</span>
    </h1>
    <p
      className="text-lg md:text-xl text-gray-600 mb-8"
      style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' }}
    >
      PropNest connects you with top-rated properties in seconds. Reliable.
      Fast. Beautiful.
    </p>
    <button className="inline-flex items-center justify-center gap-2 font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-12 rounded-md px-8 py-2 text-base">
      View Listings
    </button>
  </div>
</section>

  );
}
