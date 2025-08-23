import CTA from "@/components/modules/homePage/CTA";
import FAQComponent from "@/components/modules/homePage/FAQComponent";
import FeatureSection from "@/components/modules/homePage/FeatureSection";
import HeroSection from "@/components/modules/homePage/HeroSection";
import HowItWorks from "@/components/modules/homePage/HowItWork";


export default function HomePage() {
  return (
    <div>
      <HeroSection/>
      <FeatureSection/>
      <HowItWorks/>
      <FAQComponent/>
      <CTA/>
    </div>
  )
}
