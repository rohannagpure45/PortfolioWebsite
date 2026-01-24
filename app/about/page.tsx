"use client";

const experiences = [
  {
    company: "Link Ventures",
    role: "Software Engineer",
    period: "Cambridge, MA | Jul 2025 – Dec 2025",
    bullets: [
      "Architected AI-accelerated full-stack project for venture accelerator, collaborating with and learning from both technical and entrepreneurial industry veterans.",
      "Mastered context engineering, Git workflows, and deployment pipelines for multiple concurrent projects.",
      "Built and maintained 5+ microservices on Kubernetes/GCP handling 1000+ daily requests with 99.9% uptime.",
    ],
  },
  {
    company: "Speekr",
    role: "Software Engineer",
    period: "Cypress, TX | Oct 2024 – Feb 2025",
    bullets: [
      "Engineered real time subtitle generation feature by integrating the Agentic RAG framework with an STT service.",
      "Model refinement boosted caption accuracy by 7% and reduced transcription delays by 11%.",
      "Assisted in deploying scalable cloud solutions with Docker and AWS, improving reliability.",
      "Collaborated with cross-functional teams using Flask, Node.js, and REST APIs to optimize subtitle processing workflows.",
    ],
  },
  {
    company: "Northeastern Electric Racing",
    role: "Software Developer",
    period: "January 2025 - Present",
    bullets: [
      "Developed and maintained FinishLine, a full-stack project management dashboard utilizing JavaScript, TypeScript, React, Express, and Node.js.",
      "Implemented containerization with Docker to create scalable, consistent development and production environments.",
      "Managed version control and deployment pipelines using Git and CI/CD tools reducing conflicts by 20%.",
    ],
  },
  {
    company: "Light Co.",
    role: "Founder, e-Commerce Business",
    period: "May 2022 - February 2023",
    bullets: [
      "Achieved $9,000 in revenue with strong profit margins.",
      "Successfully managed global supply chain relationships.",
      "Optimized online storefront for enhanced user experience.",
    ],
  },
];

const skills = {
  software: ["VSC", "IntelliJ", "Linux", "Microsoft Suite", "Git", "Figma", "Docker", "AWS"],
  languages: ["Java", "C++", "Python", "TypeScript", "React", "Next.js", "Node.js", "SQL"],
  soft: ["Leadership", "Public Speaking", "Problem Solving", "Team Collaboration", "Agile"],
};

const coursework = [
  "Object-Oriented Design",
  "Foundations of Data Science",
  "Cybersecurity",
  "Algorithms and Data Structures",
  "Financial Accounting",
  "Financial Management",
  "CS Research",
];

const clubs = [
  "AI Club",
  "Quant Club",
  "CTF Cybersecurity Club",
  "Northeastern Electric Racing",
  "Disrupt",
  "Data Science Club",
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center hero-gradient">
        <div className="accent-glow top-0 right-0 opacity-50" />

        <div className="relative z-10 text-center px-6 stagger-children">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#faf9f5]">
            Rohan Nagpure
          </h1>
          <p className="text-xl text-[#b0aea5] mb-8 max-w-xl mx-auto">
            Computer Science & Business Administration, Fintech Focus
          </p>

          {/* Contact buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:nagpure.r@northeastern.edu"
              className="btn btn-primary"
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/rohan-nagpure/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/rohannagpure45"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Education Section */}
          <section className="card-elevated p-8 animate-fade-up">
            <h2 className="text-2xl font-bold mb-6 text-[#d97757]">Education</h2>
            <div>
              <h3 className="text-xl font-semibold text-[#faf9f5]">Northeastern University</h3>
              <p className="text-[#b0aea5]">B.S. in Computer Science and Business Administration</p>
              <p className="text-[#b0aea5]/70">Expected Graduation: December 2026</p>
              <span className="badge mt-3">
                Concentration in Fintech
              </span>
              <p className="text-[#b0aea5] mt-4 leading-relaxed">
                My passion lies at the intersection of finance and technology. I'm particularly
                interested in working in the fintech industry, where I can apply my computer
                science skills to solve complex financial problems.
              </p>
            </div>
          </section>

          {/* Coursework */}
          <section className="card-elevated p-8 animate-fade-up">
            <h2 className="text-2xl font-bold mb-6 text-[#d97757]">Relevant Coursework</h2>
            <div className="flex flex-wrap gap-3">
              {coursework.map((course) => (
                <span key={course} className="badge-neutral">
                  {course}
                </span>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="card-elevated p-8 animate-fade-up">
            <h2 className="text-2xl font-bold mb-6 text-[#d97757]">Technical Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-[#d97757] font-semibold mb-4">Software & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.software.map((skill) => (
                    <span key={skill} className="badge-neutral">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[#d97757] font-semibold mb-4">Languages & Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill) => (
                    <span key={skill} className="badge-neutral">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[#d97757] font-semibold mb-4">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.soft.map((skill) => (
                    <span key={skill} className="badge-neutral">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Work Experience - Timeline */}
          <section className="animate-fade-up">
            <h2 className="text-2xl font-bold mb-8 text-[#d97757]">Work Experience</h2>
            <div className="relative pl-8 border-l-2 border-[#b0aea5]/20">
              {experiences.map((exp, index) => (
                <div key={index} className="mb-10 relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[25px] w-4 h-4 bg-[#d97757] rounded-full 
                                  ring-4 ring-[#141413] group-hover:ring-[#d97757]/20 transition-all" />

                  {/* Experience card */}
                  <div className="card-elevated p-6 ml-4 hover-lift">
                    <h3 className="text-xl font-semibold text-[#faf9f5] group-hover:text-[#d97757] transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-[#d97757] font-medium">{exp.role}</p>
                    <p className="text-[#b0aea5]/70 text-sm mb-4">{exp.period}</p>
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-[#b0aea5]">
                          <span className="text-[#d97757] mt-1 flex-shrink-0">→</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Activities and Clubs */}
          <section className="card-elevated p-8 animate-fade-up">
            <h2 className="text-2xl font-bold mb-6 text-[#d97757]">Activities & Clubs</h2>
            <div className="flex flex-wrap gap-3">
              {clubs.map((club) => (
                <span key={club} className="badge-neutral">
                  {club}
                </span>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
