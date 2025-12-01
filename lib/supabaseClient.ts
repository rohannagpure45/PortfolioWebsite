import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create the client if environment variables are present
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null

// Local backup posts - used as fallback if Supabase is unavailable
// Using negative IDs to avoid conflicts with real database IDs
const localBackupPosts = [
  {
    id: -1,
    title: "Gemini 3: The Significance of \"Insignificant\" Improvements",
    excerpt: "Gemini 3's improvement over GPT 5.1 signals the validation of scaling laws and a rapid march towards AGI.",
    content: `Gemini 3 has arrived, and at first glance, the improvements over GPT 5.1 might seem marginal—perhaps a single-digit percentage increase in benchmark scores. To the casual observer, this might look like stagnation. However, this is exactly what the **scaling laws** predicted, and it's terrifyingly impressive.

While **Moore's Law is dead** for traditional silicon scaling, AI progress is exploding exponentially. The trajectory is undeniable when you look back: the jump from GPT-2's basic coherence to GPT-3's few-shot learning was massive. Then came GPT-4, bringing reasoning capabilities that stunned the world, followed by GPT-5's refined mastery. Now, Gemini 3 pushes the frontier even further.

We are seeing exponential growth in intelligence. What looks like a small percentage gain at this level of capability is actually a massive absolute increase in reasoning power. We are steadily closing the gap on humanity's "last exams"—benchmarks like Sweet Bench that were thought to be years away from being solved.

If we extrapolate this trajectory, we aren't looking at decades of slow progress. We are potentially months, maybe even weeks, away from achieving Artificial General Intelligence (AGI). And once that threshold is crossed, the leap to Artificial Superintelligence (ASI) could follow faster than anyone anticipates.`,
    date: "2025-11-24",
    slug: "gemini-3-significance"
  },
  {
    id: -2,
    title: "First post",
    excerpt: "Marketing Lessons: Nike",
    content: `Nike is exceptional at marketing, They are endorsed by a ton of influencers and athletes. The swoosh lives without the name.

Nike was been around since 1964 and is one of the most recognizable brand. They spend a lot of time and money on legal fees to defend and protect their brand.

They grossed $51 billion last year. In a market with competeitors like Puma, Adidas, Under Armor, and North Face, Patagonia, Reebok, Eddie Bauer.

There are different levels of product targeting different market segments. They make ultra expensive soccer cleats for high performance athletes but also lounge/leisurewear for everyday people.

A company misson is what the companies objectives and goals are. Goals can change but the mission remains long term.

A companies portfolio has to align with their objectives and goals so that they can achieve their mission to be successful.`,
    date: "2025-01-15",
    slug: "marketing-lessons-nike"
  },
  {
    id: -3,
    title: "Cryptocurrency: A New Asset Class?",
    excerpt: "Examining the role of cryptocurrencies in modern investment portfolios.",
    content: `As cryptocurrencies continue to evolve, investors are increasingly asking whether they represent a legitimate new asset class. Bitcoin, Ethereum, and other digital assets have attracted significant attention from both retail and institutional investors.

Proponents argue that cryptocurrencies offer diversification benefits due to their low correlation with traditional assets. They also point to the potential for blockchain technology to revolutionize finance, supply chains, and other industries.

Critics, however, highlight the extreme volatility of cryptocurrency prices, regulatory uncertainty, and environmental concerns related to energy-intensive mining operations. The lack of intrinsic value and the speculative nature of many crypto projects are also frequently cited concerns.

For investors considering cryptocurrency exposure, it's important to understand the risks involved and to limit allocation to an amount they can afford to lose. As the regulatory landscape evolves and the technology matures, the role of cryptocurrencies in portfolios may become clearer.`,
    date: "2023-06-20",
    slug: "cryptocurrency-new-asset-class"
  },
  {
    id: -4,
    title: "The Rise of ESG Investing",
    excerpt: "Analysis of how Environmental, Social, and Governance factors are reshaping investment strategies.",
    content: `ESG investing has become increasingly important in the modern investment landscape. Environmental, Social, and Governance factors are now key considerations for many institutional and retail investors alike.

Environmental factors include a company's carbon footprint, waste management practices, and commitment to renewable energy. Social factors encompass employee relations, diversity and inclusion, and community engagement. Governance factors relate to board composition, executive compensation, and shareholder rights.

Studies have shown that companies with strong ESG practices often outperform their peers over the long term. This is because ESG-focused companies tend to be better managed, more innovative, and more resilient to regulatory and reputational risks.

As awareness of climate change and social issues grows, ESG investing is expected to continue its rapid expansion. Investors who integrate ESG factors into their decision-making process may be better positioned to identify both risks and opportunities.`,
    date: "2023-06-02",
    slug: "rise-of-esg-investing"
  },
  {
    id: -5,
    title: "Understanding Market Volatility",
    excerpt: "Exploring the factors that drive market fluctuations and strategies to navigate volatile periods.",
    content: `Market volatility is a natural part of investing. Understanding the factors that drive market fluctuations can help investors make better decisions and navigate volatile periods with confidence.

Volatility is often measured by the VIX index, also known as the "fear gauge." When the VIX is high, it indicates that investors expect significant price swings in the near future.

Key factors that drive market volatility include economic data releases, geopolitical events, central bank policies, and corporate earnings reports. During periods of uncertainty, markets tend to become more volatile as investors reassess their expectations.

Strategies for navigating volatile markets include diversification, maintaining a long-term perspective, and avoiding emotional decision-making. Dollar-cost averaging can also help smooth out the impact of volatility over time.`,
    date: "2023-05-15",
    slug: "understanding-market-volatility"
  }
]

export async function getBlogPosts() {
  // Try to fetch from Supabase first
  if (supabase) {
    const { data, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false })

    if (!error && data) {
      // Return data even if empty - this is a successful query result
      return data
    }
    
    if (error) {
      console.error("Error fetching blog posts from Supabase:", error)
    }
  }

  // Fallback to local backup only if Supabase client is unavailable or query failed
  console.warn("Using local backup posts - Supabase unavailable or query failed")
  return localBackupPosts
}
