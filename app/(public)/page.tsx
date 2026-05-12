import { Hero } from "@/components/home/hero";
import { BrandBand } from "@/components/home/brand-band";
import { Marquee } from "@/components/home/marquee";
import { Mantra } from "@/components/home/mantra";
import { ShopByExpansion } from "@/components/home/shop-by-expansion";
import { JustDropped } from "@/components/home/just-dropped";
import { EditorialBanner } from "@/components/home/editorial-banner";
import { HowItWorks } from "@/components/home/how-it-works";
import { BestSellers } from "@/components/home/best-sellers";
import { RequestACard } from "@/components/home/request-a-card";
import { TCGRoadmap } from "@/components/home/tcg-roadmap";
import { SpecsStrip } from "@/components/home/specs-strip";
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
      <Mantra />
      <ShopByExpansion products={products} />
      <JustDropped products={products} />
      <EditorialBanner
        eyebrow="Built to display"
        eyebrowColor="magenta"
        title="The art doesn't stop at the card."
        body="Each Slablabs surround is custom-printed to extend your card's artwork outward — so the slab itself becomes part of the piece."
        ctaLabel="See the process"
        ctaHref="/how-it-works"
        imageSrc="/brand/slab-mockup.png"
        imageAlt="Slab with expanded artwork extending past the card"
        bg="pink"
      />
      <HowItWorks />
      <Marquee bg="magenta" text="white" />
      <BestSellers products={products} />
      <RequestACard />
      <TCGRoadmap />
      <SpecsStrip />
      <TwoUpEditorial />
      <Newsletter />
    </>
  );
}
