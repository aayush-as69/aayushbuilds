import MatrixLoader from "@/components/MatrixLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Hobbies from "@/components/Hobbies";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import GithubSection from "@/components/GithubSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { profile, siteUrl, skillGroups } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github, profile.linkedin],
  jobTitle: "Developer & Builder",
  description: profile.tagline,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Galgotias College of Engineering and Technology",
  },
  knowsAbout: skillGroups.flatMap((g) => g.items.map((i) => i.label)),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MatrixLoader />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Hobbies />
        <Skills />
        <Projects />
        <Experience />
        <GithubSection />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
