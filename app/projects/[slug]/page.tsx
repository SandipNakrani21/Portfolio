import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "../../components/page-shell";
import { projects } from "../../content";
import { pageMetadata } from "../../page-metadata";

export function generateStaticParams(){return projects.map(project=>({slug:project.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=projects.find(p=>p.slug===slug);return project ? pageMetadata(project.title,project.description,`/projects/${slug}`) : {};}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const project=projects.find(p=>p.slug===slug);if(!project)notFound();
 return <PageShell label="Projects" title={project.title} description={project.description} currentProject={{title:project.title,slug:project.slug}}><section className="content-section case-study"><div className="case-overview"><p className="section-label">{project.type}</p><h2>Project context</h2><p>{project.company}</p><p>{project.dates}</p><h3>What the system does</h3><p>{project.description}</p><h3>Technology</h3><div className="tags">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div><Link className="outline-button page-cta" href="/projects">← All projects</Link></div><div className="case-contributions"><h2>My contribution</h2>{project.details.map((detail,i)=><article className="principle" key={detail}><span className="section-label">0{i+1}</span><p>{detail}</p></article>)}<Link className="outline-button page-cta" href="/contact">Discuss a similar project ↗</Link></div></section></PageShell>;
}
