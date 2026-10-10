import type { Metadata } from "next";
export function pageMetadata(title:string,description:string,path:string):Metadata{
  return {title:`${title} | Sandip Nakrani`,description,alternates:{canonical:process.env.NEXT_PUBLIC_SITE_URL ? path : undefined},openGraph:{title:`${title} | Sandip Nakrani`,description,type:"website",images:[{url:"/media/og-image.jpg",width:1200,height:630,alt:"Sandip Nakrani — Senior Full Stack Developer"}]},twitter:{card:"summary_large_image",title:`${title} | Sandip Nakrani`,description,images:["/media/og-image.jpg"]}};
}
