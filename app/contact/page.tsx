import PageShell from "../components/page-shell";
import { ContactSection } from "../components/sections";
import { pageMetadata } from "../page-metadata";
export const metadata=pageMetadata("Contact","Contact Sandip Nakrani in Ahmedabad for .NET, Angular, React, and full stack opportunities. Email, phone, LinkedIn, and an email draft form.","/contact");
export default function ContactPage(){return <PageShell label="Contact" title="Start a conversation." description="A project, a technical challenge, or a full stack opportunity — I’d love to hear about it."><ContactSection/></PageShell>;}
