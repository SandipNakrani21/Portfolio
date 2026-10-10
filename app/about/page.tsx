import PageShell from "../components/page-shell";
import { AboutSection, ExperienceSection, SkillsSection } from "../components/sections";
import { pageMetadata } from "../page-metadata";
export const metadata=pageMetadata("About & Experience","Meet Sandip Nakrani: Senior Full Stack Developer, .NET and Angular engineer, and SaaS team lead in Ahmedabad. Explore his experience, education, and skills.","/about");
export default function AboutPage(){return <PageShell label="About" title="The developer behind the work." description="My experience, the way I work, and the technologies I use to build production applications."><AboutSection/><ExperienceSection/><SkillsSection/><section className="content-section profile-answers" aria-labelledby="profile-answers-title"><p className="section-label">ABOUT MY WORK</p><h2 id="profile-answers-title">A few useful answers.</h2><dl>{[
  ["What technologies does Sandip work with?","I build enterprise web applications with .NET Core and C#, Angular and React, SQL Server, REST APIs, and Azure DevOps."],
  ["Where is Sandip based?","I’m based in Ahmedabad, Gujarat, India."],
  ["Does Sandip have team leadership experience?","At SpryBit Softlabs, I lead five developers on a workforce rostering SaaS and handle architecture, delivery, mentoring, and technical communication with an Australia-based client."],
  ["What kinds of projects has Sandip delivered?","My selected work covers workforce rostering, pharmaceutical microservices, container management, real estate, auto parts inventory, and cold storage operations."]
].map(([question,answer])=><div key={question}><dt>{question}</dt><dd>{answer}</dd></div>)}</dl></section></PageShell>;}
