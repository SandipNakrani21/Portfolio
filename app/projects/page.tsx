import PageShell from "../components/page-shell";
import { ProjectsSection } from "../components/sections";
import { pageMetadata } from "../page-metadata";
export const metadata=pageMetadata("Projects","Explore Sandip Nakrani’s six enterprise and SaaS projects, including workforce rostering, pharmaceutical microservices, and container management.","/projects");
export default function ProjectsPage(){return <PageShell label="Projects" title="Systems I’ve helped bring to life." description="Six projects from my professional experience. Explore the technologies, scope, and my contribution to each one."><ProjectsSection/></PageShell>;}
