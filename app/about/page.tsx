"use client";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section without Image */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16 text-white mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Rohan Nagpure</h1>
          <p className="text-xl mb-4">
            Computer Science &amp; Business Administration, Fintech Student
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="mailto:nagpure.r@northeastern.edu"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/rohan-nagpure/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white px-4 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/rohannagpure45"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white px-4 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Github
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12 flex-grow">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Education Section */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Education</h2>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Northeastern University</h3>
              <p className="text-gray-700">B.S. in Computer Science and Business Administration</p>
              <p className="text-gray-700">Expected Graduation: December 2026</p>
              <p className="text-blue-600 mt-2">Concentration in Fintech</p>
              <p className="text-gray-700 mt-4">
                My passion lies at the intersection of finance and technology. I'm particularly interested in working in the fintech industry, where I can apply my computer science skills to solve complex financial problems...
              </p>
            </div>
          </section>

          {/* Relevant Coursework */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Relevant Coursework</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Object-Oriented Design</li>
                  <li>Foundations of Data Science</li>
                  <li>Cybersecurity</li>
                  <li>Foundations of Computer Science II</li>
                  <li>Financial Accounting</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Managerial Accounting</li>
                  <li>Algorithms and Data Structures</li>
                  <li>Financial Management</li>
                  <li>CS Research</li>
                  <li>Managerial Accounting</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Technical Skills</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-blue-600">Software/OS</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>VSC</li>
                  <li>IntelliJ</li>
                  <li>Linux</li>
                  <li>Microsoft Suite</li>
                  <li>Git</li>
                  <li>Figma</li>
                  <li>x86 Assembly</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-blue-600">Languages</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Java</li>
                  <li>C++</li>
                  <li>Python</li>
                  <li>Racket</li>
                  <li>React</li>
                  <li>HTML</li>
                  <li>C</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-blue-600">Soft Skills</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Start-Up Leadership</li>
                  <li>Economic Statistics</li>
                  <li>Web Design</li>
                  <li>Public Speaking</li>
                  <li>Management</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Work Experience */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Work Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Speekr</h3>
                <p className="text-blue-600">Software Engineer</p>
                <p className="text-gray-500 mb-2">Cypress, TX | Oct 2024 – Feb 2025</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    Engineered real time subtitle generation feature by integrating the Agentic RAG framework with an STT service.
                  </li>
                  <li>
                    Model refinement boosted caption accuracy by 7% and reduced transcription delays by 11%.
                  </li>
                  <li>
                    Assisted in deploying scalable cloud solutions with Docker and AWS, improving reliability.
                  </li>
                  <li>
                    Collaborated with cross-functional teams using Flask, Node.js, and REST APIs to optimize subtitle processing workflows, enhancing meeting accessibility and driving a 6% reduction in error rates.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Northeastern Electric Racing</h3>
                <p className="text-blue-600">Software Developer</p>
                <p className="text-gray-500 mb-2">January 2025 - Present</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Developed and maintained FinishLine, a full-stack project management dashboard...</li>
                  <li>Implemented containerization with Docker to create a scalable, consistent environment...</li>
                  <li>Managed version control and deployment pipelines using Git and CI/CD tools...</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Light Co.</h3>
                <p className="text-blue-600">Founder, e-Commerce Business</p>
                <p className="text-gray-500 mb-2">May 2022 - February 2023</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Achieved $9,000 in revenue with strong profit margins</li>
                  <li>Successfully managed global supply chain relationships</li>
                  <li>Optimized online storefront for enhanced user experience</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Kumon</h3>
                <p className="text-blue-600">Tutor</p>
                <p className="text-gray-500 mb-2">May 2022 - January 2023</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Maintained commitment to student success</li>
                  <li>Tutored small groups of 1-3 students</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Activities and Clubs */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Activities and Clubs</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="list-disc list-inside text-gray-700">
                <li>AI Club</li>
                <li>Quant Club</li>
                <li>CTF Cybersecurity Club</li>
                <li>Northeastern Electric Racing</li>
              </ul>
              <ul className="list-disc list-inside text-gray-700">
                <li>Disrupt</li>
                <li>Data Science Club</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
