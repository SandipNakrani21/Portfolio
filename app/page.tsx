import Link from "next/link";
import Hero from "./components/hero";
import Icon from "./components/ui-icon";
import { AboutSection, ServicesSection, SkillsSection, ExperienceSection, ContactSection, ProjectsSection } from "./components/sections";
import { profile } from "./content";

export default function Home() {
  const structuredData = {"@context":"https://schema.org","@type":"Person",name:profile.name,jobTitle:profile.role,email:profile.email,telephone:profile.phone,sameAs:[profile.linkedin],address:{"@type":"PostalAddress",addressLocality:"Ahmedabad",addressRegion:"Gujarat",addressCountry:"IN"},knowsAbout:[".NET Core","C#","Angular","React.js","SQL Server","RESTful APIs","Microservices","Azure DevOps"]};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/>
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
