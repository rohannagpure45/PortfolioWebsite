import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create the client if environment variables are present
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null

const localPosts = [
  {
    id: 999, // Temporary ID
    title: "Gemini 3: The Significance of \"Insignificant\" Improvements",
    excerpt: "Gemini 3's improvement over GPT 5.1 signals the validation of scaling laws and a rapid march towards AGI.",
    content: `Gemini 3 has arrived, and at first glance, the improvements over GPT 5.1 might seem marginal—perhaps a single-digit percentage increase in benchmark scores. To the casual observer, this might look like stagnation. However, this is exactly what the **scaling laws** predicted, and it's terrifyingly impressive.

While **Moore's Law is dead** for traditional silicon scaling, AI progress is exploding exponentially. The trajectory is undeniable when you look back: the jump from GPT-2's basic coherence to GPT-3's few-shot learning was massive. Then came GPT-4, bringing reasoning capabilities that stunned the world, followed by GPT-5's refined mastery. Now, Gemini 3 pushes the frontier even further.

We are seeing exponential growth in intelligence. What looks like a small percentage gain at this level of capability is actually a massive absolute increase in reasoning power. We are steadily closing the gap on humanity's "last exams"—benchmarks like Sweet Bench that were thought to be years away from being solved.

If we extrapolate this trajectory, we aren't looking at decades of slow progress. We are potentially months, maybe even weeks, away from achieving Artificial General Intelligence (AGI). And once that threshold is crossed, the leap to Artificial Superintelligence (ASI) could follow faster than anyone anticipates.`,
    date: "2025-11-24",
    slug: "gemini-3-significance"
  }
]

export async function getBlogPosts() {
  let posts: any[] = []
  
  if (supabase) {
    const { data, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false })

    if (error) {
      console.error("Error fetching blog posts:", error)
    } else if (data) {
      posts = data
    }
  } else {
    console.warn("Supabase environment variables missing, using local/mock data only.")
  }

  // Combine local posts with fetched posts
  return [...localPosts, ...posts]
}
