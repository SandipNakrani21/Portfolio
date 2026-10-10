import SiteHeader from "./site-header";
import Link from "next/link";
export default function PageShell({label,title,description,children}:{label:string;title:string;description:string;children:React.ReactNode}){
  return <><SiteHeader/><main id="main" className="inner-page"><div className="portfolio-body"><div className="page-intro"><p className="breadcrumb"><Link href="/">Home</Link><span>/</span>{label}</p><p className="section-label"><span/>{label.toUpperCase()}</p><h1>{title}</h1><p>{description}</p></div>{children}</div></main></>;
}
