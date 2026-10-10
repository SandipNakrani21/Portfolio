import type { Metadata } from "next";
import { siteUrl } from "./site-config";
export function pageMetadata(title:string,description:string,path:string):Metadata{
  return {title:`${title} | Sandip Nakrani`,description,alternates:{canonical:siteUrl ? path : undefined},openGraph:{title:`${title} | Sandip Nakrani`,description,type:"website",...(siteUrl ? {url:`${siteUrl}${path}`} : {}),images:[{url:"/media/og-image.jpg",width:1200,height:630,alt:"Sandip Nakrani — Senior Full Stack Developer"}]},twitter:{card:"summary_large_image",title:`${title} | Sandip Nakrani`,description,images:["/media/og-image.jpg"]}};
}
