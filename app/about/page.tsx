import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot1-wJmDNwnWRISn0d8ZzLWR2975UL7KsO.jpeg"
              alt="Rohan Nagpure"
              width={300}
              height={300}
              className="rounded-2xl shadow-xl"
            />
            <div>
              <h1 className="text-4xl font-bold mb-4">Rohan Nagpure</h1>
              <p className="text-xl mb-4">Computer Science & Business Administration, Fintech Student</p>
              <div className="flex gap-4">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Education Section */}
          <section className="mb-12 bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <div>
              <h3 className="text-xl font-semibold">Northeastern University</h3>
              <p className="text-gray-300">B.S. in Computer Science and Business Administration</p>
              <p className="text-gray-300">Expected Graduation: December 2026</p>
              <p className="text-blue-400 mt-2">Concentration in Fintech</p>
              <p className="text-gray-300 mt-4">
                My passion lies at the intersection of finance and technology. I'm particularly interested in working in
                the fintech industry, where I can apply my computer science skills to solve complex financial problems.
                Areas that fascinate me include blockchain technology, algorithmic trading, and financial data
                analytics. I'm excited about the potential of technology to revolutionize traditional financial services
                and create more accessible and efficient financial systems.
              </p>
            </div>
          </section>

          {/* Relevant Coursework */}
          <section className="mb-12 bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Relevant Coursework</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Object-Oriented Design</li>
                  <li>Foundations of Data Science</li>
                  <li>Cybersecurity</li>
                  <li>Foundations of Computer Science II</li>
                  <li>Financial Accounting</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Managerial Accounting</li>
                  <li>Algorithms and Data Structures</li>
                  <li>Financial Management</li>
                  <li>CS Research</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-12 bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-blue-400">Software/OS</h3>
                <ul className="list-disc list-inside text-gray-300">
                  <li>VSC</li>
                  <li>IntelliJ</li>
                  <li>Linux</li>
                  <li>Microsoft Suite</li>
                  <li>Git</li>
                  <li>x86 Assembly</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-blue-400">Languages</h3>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Java</li>
                  <li>C++</li>
                  <li>Python</li>
                  <li>Figma</li>
                  <li>Racket</li>
                  <li>React</li>
                  <li>HTML</li>
                  <li>C</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-blue-400">Soft Skills</h3>
                <ul className="list-disc list-inside text-gray-300">
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
          <section className="mb-12 bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Light Co.</h3>
                <p className="text-blue-400">Founder, e-Commerce Business</p>
                <p className="text-gray-400 mb-2">May 2022 - February 2023</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Achieved $9,000 in revenue with strong profit margins</li>
                  <li>Successfully managed global supply chain relationships</li>
                  <li>Elevated customer satisfaction through various initiatives</li>
                  <li>Optimized online storefront for enhanced user experience</li>
                  <li>Utilized analytical tools for data-driven decision making</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Kumon</h3>
                <p className="text-blue-400">Tutor</p>
                <p className="text-gray-400 mb-2">May 2022 - January 2023</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Maintained commitment to student success</li>
                  <li>Tutored small groups of 1-3 students</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Activities and Clubs */}
          <section className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Activities and Clubs</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="list-disc list-inside text-gray-300">
                <li>AI Club</li>
                <li>Quant Club</li>
                <li>CTF Cybersecurity Club</li>
              </ul>
              <ul className="list-disc list-inside text-gray-300">
                <li>Disrupt</li>
                <li>Data Science Club</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

