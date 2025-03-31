"use client";

import React from "react";

export default function HealthcareChatbot() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">AI Healthcare Chatbot</h1>
      <iframe
        src="https://vite-react-supabase.vercel.app/"
        className="w-full h-[800px] border-none"
        title="Healthcare Chatbot"
      ></iframe>
    </div>
  );
}
