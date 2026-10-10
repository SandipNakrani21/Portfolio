export const profile = {
  name: "Sandip Nakrani", role: "Senior Full Stack Developer", email: "sandipdpatel2189@gmail.com",
  phone: "+91 78787 82189", location: "Ahmedabad, Gujarat, India", linkedin: "https://linkedin.com/in/sandip-nakrani"
};
export const services = [
  {icon:"screen",title:"Full Stack Development",description:"Production web applications with .NET Core and C# on the backend, and Angular or React on the frontend.",tags:[".NET Core","Angular","React.js"]},
  {icon:"layers",title:"APIs & Microservices",description:"RESTful APIs, independent services, and inter-service communication for enterprise and SaaS platforms.",tags:["ASP.NET Core Web API","Microservices"]},
  {icon:"database",title:"Database Performance",description:"SQL Server schema design, indexing, stored procedures, and query tuning for data-heavy applications.",tags:["SQL Server","Entity Framework Core"]},
  {icon:"rocket",title:"Architecture & Delivery",description:"From requirements to production: technical architecture, team mentoring, and Azure DevOps delivery pipelines.",tags:["Azure DevOps","CI/CD","Code Review"]}
];
export const skills = [
  {label:"Backend",items:[".NET Core","C#","ASP.NET Core Web API","ASP.NET MVC","Entity Framework Core"]},
  {label:"Frontend",items:["Angular","TypeScript","JavaScript","React.js","HTML5","CSS3"]},
  {label:"Architecture & data",items:["RESTful APIs","Microservices","Distributed Systems","SaaS","SQL Server"]},
  {label:"Cloud & quality",items:["Microsoft Azure","Azure DevOps","CI/CD Pipelines","SonarQube","Git"]},
  {label:"Ways of working",items:["Agile / Scrum","Sprint Planning","Code Review","Technical Mentoring"]},
  {label:"AI development tools",items:["Claude","GitHub Copilot","ChatGPT","Cursor"]}
];
export const projects = [
  {slug:"rostering",number:"01",type:"SAAS · TEAM LEAD",title:"Workforce Rostering SaaS",dates:"Aug 2024 – Present",company:"SpryBit Softlabs · Australian client",description:"A workforce platform built from scratch, covering shift scheduling, rosters, employee availability, and leave management.",stack:[".NET Core","React.js","EF Core","Azure DevOps"],nodes:["Shift scheduling","REST API","Workforce data"],details:["Owned technical architecture and led a team of 5 developers.","Built the REST API layer for core workforce modules.","Managed requirements, demos, and technical communication directly with the Australia-based client.","Established Azure DevOps CI/CD pipelines and quality gates."]},
  {slug:"microservices",number:"02",type:"ENTERPRISE · MICROSERVICES",title:"Zydus Pharmaceuticals",dates:"Jan – Jul 2024",company:"SpryBit Softlabs",description:"Independent microservices and distributed modules for an enterprise pharmaceuticals environment.",stack:[".NET Core","Angular","EF Core","REST APIs"],nodes:["Angular client","Service layer","Distributed modules"],details:["Developed independent services using .NET Core and Entity Framework Core.","Implemented RESTful APIs and inter-service communication across distributed modules."]},
  {slug:"containers",number:"03",type:"LOGISTICS · END-TO-END DELIVERY",title:"Container Management System",dates:"During Feb 2020 – Aug 2023",company:"OMEX INFOTECH",description:"A complete container lifecycle system, independently designed and delivered from requirements through deployment.",stack:["ASP.NET MVC","C#","Angular","SQL Server"],nodes:["Booking & dispatch","Container lifecycle","Tracking & reports"],details:["Architected and delivered the system from scratch.","Built APIs for real-time container tracking and reporting.","Designed the complete database schema for booking, dispatch, arrival, and return.","Owned requirements, architecture, development, and deployment."]},
  {slug:"real-estate",number:"04",type:"PROPERTY MANAGEMENT",title:"Real Estate Management Platform",dates:"Sep – Dec 2023",company:"SpryBit Softlabs",description:"Property listings, client management, and transaction modules supported by relational data and reporting.",stack:["ASP.NET Core","C#","Angular","SQL Server"],details:["Built property listing, client management, and transaction modules.","Designed and optimised SQL Server schemas for complex property relationships and reporting queries."]},
  {slug:"parts",number:"05",type:"INVENTORY · DATA PERFORMANCE",title:"Parts Connect",dates:"During Feb 2020 – Aug 2023",company:"OMEX INFOTECH",description:"Auto parts inventory search and filtering across datasets containing millions of records.",stack:["Angular","TypeScript","SQL Server"],details:["Built complex search and filter modules for large inventories.","Resolved performance bottlenecks with indexing strategies, stored procedures, and SQL query tuning."]},
  {slug:"cold-storage",number:"06",type:"OPERATIONS · REPORTING",title:"Cold Storage Management",dates:"During Feb 2020 – Aug 2023",company:"OMEX INFOTECH",description:"Inventory, temperature-log, and storage-allocation improvements for a cold storage management system.",stack:["ASP.NET MVC","C#","SQL Server"],details:["Enhanced inventory, temperature-log, and storage-allocation modules.","Optimised SQL queries on large datasets to improve report load times."]}
];
