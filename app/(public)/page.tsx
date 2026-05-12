import { Hero } from "@/components/home/hero";
import { BrandBand } from "@/components/home/brand-band";
import { Marquee } from "@/components/home/marquee";
import { SpecsStrip } from "@/components/home/specs-strip";
import { HowItWorks } from "@/components/home/how-it-works";
import { ShopByExpansion } from "@/components/home/shop-by-expansion";
import { BestSellers } from "@/components/home/best-sellers";
import { EditorialBanner } from "@/components/home/editorial-banner";
import { CardNotIncluded } from "@/components/home/card-not-included";
import { Testimonials } from "@/components/home/testimonials";
import { FAQ } from "@/components/home/faq";
import { RequestACard } from "@/components/home/request-a-card";
import { TCGRoadmap } from "@/components/home/tcg-roadmap";
import { TwoUpEditorial } from "@/components/home/two-up-editorial";
import { Newsletter } from "@/components/home/newsletter";
import { getAllProducts } from "@/lib/products";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <>
      <Hero />
      <BrandBand />
      <Marquee bg="text" text="white" />
      <SpecsStrip />
      <HowItWorks />
      <ShopByExpansion products={products} />
      <BestSellers products={products} />
      <EditorialBanner
        eyebrow="Built to display"
        eyebrowColor="magenta"
        title="The art doesn't stop at the card."
        body="Each Slablabs surround is custom-printed to extend your card's artwork outward. So the slab itself becomes part of the piece."
        ctaLabel="See the process"
        ctaHref="/how-it-works"
        imageSrc="/brand/slab-mockup.png"
        imageAlt="Slab with expanded artwork extending past the card"
        bg="pink"
      />
      <CardNotIncluded />
      <Testimonials />
      <FAQ />
      <RequestACard />
      <TCGRoadmap />
      <TwoUpEditorial />
      <Newsletter />
    </>
  );
}
