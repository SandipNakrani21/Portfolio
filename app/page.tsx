import Link from "next/link";
import Hero from "./components/hero";
import Icon from "./components/ui-icon";
import { AboutSection, ServicesSection, SkillsSection, ExperienceSection, ContactSection, ProjectsSection } from "./components/sections";

export default function Home() {
  return <>
    <main id="main" className="landing-page">
      <Hero/>
      <div className="portfolio-body">
        <div id="overview"/>
        <AboutSection/>
        <ServicesSection overview/>
        <SkillsSection overview/>
        <ProjectsSection overview/>
        <ExperienceSection overview/>
        <div className="overview-detail-link"><Link className="outline-button" href="/about#experience">Read my full experience <Icon name="arrow" size={17}/></Link></div>
        <ContactSection/>
        <div className="overview-detail-link"><Link className="inline-link" href="/contact">Open the contact page <Icon name="arrow" size={17}/></Link></div>
      </div>
    </main>
  </>;
}
