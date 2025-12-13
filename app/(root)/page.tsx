import AboutSection from "@/components/root/home/About";
import ActivitySection from "@/components/root/home/Activity";
import DatasetSection from "@/components/root/home/Dataset";
import HeroSection from "@/components/root/home/Hero";
import PartnersSection from "@/components/root/home/Partners";
import ProductsSection from "@/components/root/home/Products";
import PublicationsSection from "@/components/root/home/Publications";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ActivitySection />
      <PublicationsSection />
      <DatasetSection />
      <PartnersSection />
    </>
  );
}
