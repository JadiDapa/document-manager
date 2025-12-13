import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HeroSection() {
  const hero = await getHeroContent();

  return (
    <main className="relative min-h-screen w-full bg-cover bg-center">
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-br from-black/70 to-black/60"></div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto space-y-6 px-6 py-24 text-white lg:px-44 lg:py-44 lg:pt-64">
        <h1 className="text-5xl font-medium md:text-8xl">
          {hero.title} <span className="text-primary">.</span>
        </h1>

        <p className="max-w-6xl text-sm leading-relaxed lg:text-xl">
          {hero.description}
        </p>

        <div className="flex gap-4 pt-4">
          <Button className="rounded-md bg-primary px-6 py-3 font-medium hover:bg-primary lg:px-12 lg:py-6">
            <Link href={hero.primaryButton.href}>
              {hero.primaryButton.label}
            </Link>
          </Button>

          <Button className="rounded-md bg-white  px-6 py-3 font-medium text-black hover:bg-gray-200 lg:px-12 lg:py-6">
            <Link href={hero.secondaryButton.href}>
              {hero.secondaryButton.label}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

async function getHeroContent() {
  return {
    title: "We Collaborate",
    description:
      "The Artificial Intelligence-Medical Center of Excellence (AIMed CoE) is a leading center of excellence initiated by Universitas Sriwijaya, Indonesia. It houses Intelligent System research group (ISysRG), which is dedicated to advancing the field of artificial intelligence in medicine through interdisciplinary collaboration and innovation. AIMed CoE aims to develop AI-based technological solutions for the arly screening (detection) of non-communicable diseases that are accurate, efficient, ethical, and usable by non-specialist healthcare workers in primary care settings, through a mobile platform integrated with telemedicine.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1169&auto=format&fit=crop",
    primaryButton: { label: "About Us", href: "/about/research-team" },
    secondaryButton: { label: "View Product", href: "/products/teleotiva" },
  };
}
