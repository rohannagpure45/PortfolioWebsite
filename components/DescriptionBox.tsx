import type React from "react"

interface DescriptionBoxProps {
  children: React.ReactNode
}

const DescriptionBox: React.FC<DescriptionBoxProps> = ({ children }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
      <div className="prose prose-invert max-w-none">{children}</div>
    </div>
  )
}

export default DescriptionBox

