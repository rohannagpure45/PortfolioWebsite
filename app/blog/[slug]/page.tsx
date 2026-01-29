import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/supabaseClient";
import { ReactNode } from "react";

// Format date from YYYY-MM-DD to "Month Day, Year"
function formatDate(dateString: string): string {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    slug: string;
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post: BlogPost) => ({
        slug: post.slug,
    }));
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
            description: "The requested blog post could not be found.",
        };
    }

    return {
        title: `${post.title} | Rohan Nagpure`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
        },
    };
}

// Helper to render content with proper list grouping
function renderContent(content: string): ReactNode[] {
    const lines = content.split("\n");
    const elements: ReactNode[] = [];
    let currentListItems: { text: string; idx: number }[] = [];
    let currentListType: "ul" | "ol" | null = null;

    const flushList = () => {
        if (currentListItems.length > 0 && currentListType) {
            const ListTag = currentListType;
            elements.push(
                <ListTag key={`list-${currentListItems[0].idx}`} className="ml-6 mb-4 text-[#b0aea5]">
                    {currentListItems.map((item) => (
                        <li key={item.idx} className={currentListType === "ul" ? "list-disc mb-2" : "list-decimal mb-2"}>
                            {item.text}
                        </li>
                    ))}
                </ListTag>
            );
            currentListItems = [];
            currentListType = null;
        }
    };

    const formatText = (text: string): ReactNode => {
        const parts = text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={i} className="text-[#faf9f5]">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
        return parts;
    };

    lines.forEach((paragraph, idx) => {
        const trimmed = paragraph.trim();
        if (!trimmed) {
            flushList();
            return;
        }

        // Handle markdown-style headers
        if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
            flushList();
            elements.push(
                <h3 key={idx} className="text-xl font-semibold text-[#faf9f5] mt-8 mb-4">
                    {trimmed.slice(2, -2)}
                </h3>
            );
            return;
        }

        // Handle unordered list items
        if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
            if (currentListType !== "ul") {
                flushList();
                currentListType = "ul";
            }
            currentListItems.push({ text: trimmed.slice(1).trim(), idx });
            return;
        }

        // Handle ordered list items
        if (/^\d+\./.test(trimmed)) {
            if (currentListType !== "ol") {
                flushList();
                currentListType = "ol";
            }
            currentListItems.push({ text: trimmed.replace(/^\d+\.\s*/, ''), idx });
            return;
        }

        // Regular paragraph
        flushList();
        elements.push(
            <p key={idx} className="text-[#b0aea5] mb-4 leading-relaxed">
                {formatText(trimmed)}
            </p>
        );
    });

    flushList();
    return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[30vh] flex items-center justify-center hero-gradient">
                <div className="accent-glow bottom-0 right-0 opacity-50" />

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto stagger-children">
                    <Link
                        href="/blog"
                        className="text-[#d97757] hover:underline inline-flex items-center gap-2 mb-6"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to blog
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#faf9f5]">
                        {post.title}
                    </h1>

                    <p className="text-[#b0aea5]/60">
                        {formatDate(post.date)}
                    </p>
                </div>
            </section>

            {/* Article Content */}
            <article className="container mx-auto px-6 py-16">
                <div className="max-w-3xl mx-auto">
                    <div className="card-elevated p-8 md:p-12">
                        {/* Blog Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-6 mb-6 border-b border-[#3d3d3a]">
                            <p className="text-[#faf9f5] font-medium">Rohan Nagpure</p>
                            <p className="text-[#b0aea5] text-sm">{formatDate(post.date)}</p>
                        </div>
                        <div className="prose max-w-none">
                            {renderContent(post.content)}
                        </div>
                    </div>

                    {/* Bottom navigation */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-[#d97757] hover:gap-3 transition-all font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to all posts
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
