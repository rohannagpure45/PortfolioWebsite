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
    excerpt: "Gemini 3's improvement over GPT 5.1 might seem small, but it signals a rapid march towards AGI and ASI.",
    content: `Gemini 3 has arrived, and at first glance, the improvements over GPT 5.1 might seem marginal—perhaps a single-digit percentage increase in benchmark scores. To the casual observer, this might look like stagnation or diminishing returns. However, this perspective misses the forest for the trees.

In the broad scheme of things, consistent single-digit percentage improvements on a weekly or monthly basis are compounding at an astonishing rate. We are steadily closing the gap on humanity's "last exams"—the most difficult reasoning and creativity benchmarks like Sweet Bench and other industry leading benchmarks.

If we extrapolate this trajectory, we aren't looking at decades of slow progress. We are potentially months, maybe even weeks, away from achieving Artificial General Intelligence (AGI). And once that threshold is crossed, the leap to Artificial Superintelligence (ASI) could follow faster than anyone anticipates.

The "insignificant" improvement is actually a siren; a clear signal that the exponential curve is still very much in effect.`,
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
  // Using a Set to avoid duplicates if we were syncing, but here just prepend
  return [...localPosts, ...posts]
}
