import Link from "next/link";
import Icon from "./ui-icon";
import { projects } from "../content";

export default function ProjectList({overview=false}:{overview?:boolean}) {
 return <section className="content-section work-section" id="work" aria-label="Selected projects">
  <div className="section-heading-row"><div className="section-heading"><p className="section-label"><span/>SELECTED WORK</p><h2>Some of my recent work.</h2><p className="section-description">Enterprise platforms, real workflows, and the engineering behind them. Explore what I built and the part I played.</p></div>{overview ? <Link className="inline-link" href="/projects">Explore all projects <Icon name="arrow" size={17}/></Link> : <a className="inline-link" href="/documents/Sandip-Nakrani-CV.pdf" target="_blank" rel="noopener noreferrer">Read the full CV <Icon name="arrow" size={17}/></a>}</div>
  <div className="reference-project-list">{projects.map(project=><article className="project-card reference-project" key={project.slug}>
   <span className="project-outline-number" aria-hidden="true"><svg viewBox="0 0 70 56" width="54" height="44"><text x="3" y="46">{project.number}</text></svg></span>
   <div className="reference-project-copy"><p className="reference-date">{project.dates}</p><h3>{project.title}</h3><p className="reference-company">{project.company}</p><p className="reference-description">{project.description}</p></div>
   <div className="reference-project-meta"><p className="reference-stack-label">BUILT WITH</p><div className="tags">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div><details className="project-details"><summary>Explore my contributions <span aria-hidden="true">+</span></summary><ul>{project.details.map(detail=><li key={detail}>{detail}</li>)}</ul></details><Link className="inline-link" href={`/projects/${project.slug}`}>View project details <Icon name="arrow" size={17}/></Link></div>
  </article>)}</div>
 </section>;
}
