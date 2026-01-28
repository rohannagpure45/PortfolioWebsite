import { getBlogPosts } from "@/lib/supabaseClient";

// Helper to escape XML special characters
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  let posts;

  try {
    posts = await getBlogPosts();
  } catch (err) {
    console.error("Error fetching blog posts for RSS feed:", err);
    // Return empty RSS feed on error
    const emptyRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rohan Nagpure - Blog</title>
    <link>https://rohannagpure.com/blog</link>
    <description>Insights about financial markets, technology trends, and the intersection of computer science and finance.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`;
    return new Response(emptyRss, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  const siteUrl = "https://rohannagpure.com";

  const rssItems = posts.map((post) => {
    const escapedSlug = escapeXml(post.slug);
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${escapedSlug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${escapedSlug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;
  }).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rohan Nagpure - Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Insights about financial markets, technology trends, and the intersection of computer science and finance.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
