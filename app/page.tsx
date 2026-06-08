import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen w-fulloverflow-hidden scroll-smooth pt-14">
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}
