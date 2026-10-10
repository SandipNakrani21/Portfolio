import PageShell from "../components/page-shell";
import { AboutSection, ExperienceSection, SkillsSection } from "../components/sections";
import { pageMetadata } from "../page-metadata";
export const metadata=pageMetadata("About & Experience","Meet Sandip Nakrani: Senior Full Stack Developer, .NET and Angular engineer, and SaaS team lead in Ahmedabad. Explore his experience, education, and skills.","/about");
export default function AboutPage(){return <PageShell label="About" title="The developer behind the work." description="My experience, the way I work, and the technologies I use to build production applications."><AboutSection/><ExperienceSection/><SkillsSection/></PageShell>;}
