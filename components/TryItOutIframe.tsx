"use client";

import React, { useState } from "react";

export default function TryItOutIframe() {
  const [showIframe, setShowIframe] = useState(false);

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded transition-colors hover:bg-blue-400"
        onClick={() => setShowIframe(true)}
      >
        Try it out →
      </button>
      {showIframe && (
        <iframe
          src="https://vite-react-supabase-dbqhmi7n4-rohannagpure45s-projects.vercel.app"
          className="w-full h-[800px] border-none mt-4"
          title="Vite React Supabase Project"
        ></iframe>
      )}
    </div>
  );
}

