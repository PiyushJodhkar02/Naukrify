import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const qaData = [
  {
    category: "Architecture & Tech Stack",
    question: "Can you explain the tech stack used in your project and why you chose it?",
    answer: "Frontend: React.js (via Vite) for fast rendering and component-based architecture. Styling: Tailwind CSS & Shadcn UI (Radix UI) for rapid, accessible, and customizable styling. Authentication: Clerk Auth for robust, out-of-the-box secure authentication with role-based metadata. Backend/Database: Supabase (PostgreSQL) for a scalable database, raw SQL support, and built-in Storage buckets."
  },
  {
    category: "Architecture & Tech Stack",
    question: "Why did you use Vite instead of Create React App (CRA)?",
    answer: "Vite uses native ES modules during development, making the local dev server incredibly fast. It also uses Rollup for production builds, which is much faster and produces more optimized bundles than Webpack (which CRA uses)."
  },
  {
    category: "Authentication",
    question: "How do you handle Role-Based Access Control (Candidate vs Recruiter)?",
    answer: "During the onboarding route (/onboarding), the user selects a role. This role is saved directly into the user's Clerk profile as unsafeMetadata. In the React components, I access this metadata via Clerk's useUser() hook and conditionally render views (like showing the 'Post Job' button only to recruiters)."
  },
  {
    category: "Database & Backend",
    question: "What is RLS (Row Level Security) in Supabase?",
    answer: "Row Level Security is a PostgreSQL feature that restricts which rows in a table a user can SELECT, INSERT, UPDATE, or DELETE. We write policies that check the auth.uid() against the user's ID to ensure they only see their own data."
  },
  {
    category: "React Specifics",
    question: "What is the purpose of useEffect in your JobListing component?",
    answer: "useEffect is used to trigger the fetching of getCompanies and getJobs when the user is authenticated. It also re-runs fnJobs() whenever the dependencies (location, company_id, or searchQuery strings) change, efficiently re-fetching filtered data."
  },
  {
    category: "Scalability",
    question: "If this portal hits 100,000 users, what would break first?",
    answer: "1. Database reads/searches: Searching jobs by string ILIKE queries will get slow. I would need to implement Full-Text Search. 2. Asset delivery: I would need a CDN in front of Supabase storage buckets. 3. Pagination: The backend currently fetches jobs as a bulk array. We would need to implement pagination (LIMIT and OFFSET)."
  },
  {
    category: "JavaScript Basics",
    question: "What are Promises in JavaScript and why did you use async/await?",
    answer: "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. I used async/await because it makes asynchronous code look and behave a bit more like synchronous code, making it much easier to read and debug than using .then().catch() chains."
  },
  {
    category: "CSS & UI",
    question: "Why do you prefer Tailwind over standard CSS/SCSS?",
    answer: "Tailwind reduces context switching and ensures consistency. It avoids issues like global CSS conflicts or writing repetitive code by relying on utility classes, which leads to smaller production CSS bundles because it aggressively purges unused styles."
  }
];

const InterviewPrep = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] -z-10"></div>

      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          Know all the secrets of this project
        </h1>
        <p className="text-gray-400 text-lg">
          All insiders of this Project!
        </p>
      </header>

      <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 shadow-2xl backdrop-blur-sm">
        <Accordion type="single" collapsible className="w-full">
          {qaData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/[0.05]">
              <AccordionTrigger className="text-left font-medium text-[15px] hover:text-cyan-400 transition-colors py-4">
                <span className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-1 bg-white/5 rounded text-violet-300 uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 leading-relaxed pb-4 pt-1">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default InterviewPrep;
