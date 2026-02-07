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
    id: -19,
    title: "The End of SaaS (I Told You So)",
    excerpt: "HubSpot down 51%. Salesforce down 31%. The market is finally pricing in what I started saying when Figma filed to go public: SaaS as a category is over. The future is AI-native, not another tab in your browser.",
    content: `For a decade, “SaaS” was the answer to every question.

If you had a business process, there was a SaaS tool for it. Sales? HubSpot. Marketing? Salesforce, Marketo, take your pick. Collaboration? Figma, Notion, Asana. The playbook was simple: pick a vertical, ship a web app, charge per seat, spend the profits on paid ads and sales reps.

Then Figma filed to go public in 2024 and something about that moment felt like a top to me.

Not because Figma was bad. Figma was too good. It was the final boss of SaaS: a clean, fast, viral browser app that completely owned its category. When you see the best possible version of a model, you should ask a different question:

What comes after this?

I looked at Figma IPO headlines and did not just see “design SaaS wins.” I saw the last clean chapter of the SaaS era. Underneath all the pretty UIs, something else was already growing: general purpose intelligence that does not care about your feature roadmap.

One thing I learned from my time at Link Ventures, basically being a 10x SWE there, is that AI is going to kill a lot of SaaS. Not overnight, but in the way the internet killed a lot of newspapers. Slowly at first, then suddenly once the market accepts the new default.

---

The market is finally catching up.

Look at 2025 and 2026.

- HubSpot is down 51% even though they are still growing revenue around 18–20 percent a year.
- Salesforce is down 31%.
- Monday.com is down 36%.
- Adobe is down 35%.
- ServiceNow is down 26%.

These are not trash companies. These are mature, high margin, category defining SaaS names that the market used to treat like untouchable compounders.

So what changed?

AI stopped being a feature and started becoming a replacement.

OpenAI did not just ship a nicer chatbot. They started shipping apps: an Inbound Sales Assistant, a GTM Assistant, and more. Those aim straight at the workflows that made HubSpot and friends billions.

Anthropic pushes a new Claude Opus update and CNN runs a headline about “the AI that spooked the stock market.” People are not crazy for reacting. For the first time it is believable that a horizontal AI system can eat whole SaaS categories instead of just plugging into them.

---

Now look at the other side of the board in 2025:

- Palantir is up 142%.
- Cloudflare is up 80%.
- MongoDB is up 70%.

These are not simple dashboards. They are infrastructure and data platforms that get more valuable as AI gets stronger. They sit closer to the new center of gravity: compute, data, security, orchestration.

Meanwhile, the classic SMB SaaS setup, where you log into some app and click around all day, is getting marked down. The market is pricing in maximum AI risk for anything that looks like a thin UI on top of a database.

So yeah, my view is that SaaS as a pure category is dying.

Software is not going anywhere. But the idea of “we build a web app, you log in, and you manually walk it to the finish line” does not make sense in a world where an AI can:

1. Read your CRM.
2. Draft the email.
3. Send it.
4. Update the pipeline.
5. Report the results.

Instead of swimming across ten different SaaS tools to get one outcome, you will just say what you want done. The system will call whatever APIs it needs behind the scenes.

---

When Figma’s IPO paperwork hit, everyone online treated it like the crowning moment for SaaS.

To me, it felt more like the credits rolling.

Figma showed you can take a hard, desktop heavy category like design, put it fully in the browser, and win. That was the SaaS dream in its final form.

But if you zoomed out in 2024, you could already see the next wave building:

- Foundation models that can read and write code, copy, emails, even basic strategy.
- Early agent frameworks that chain steps together without you clicking every button.
- APIs everywhere, exposing the guts of SaaS products so anything smart can talk to them.

Once you have:

- Programmable interfaces (APIs), and
- General intelligence that can call them (agents),

you do not actually need ten human facing SaaS apps. You need one orchestration layer that talks to all of them. And more and more, that orchestration layer is the real product.

So while people were arguing about Figma’s multiples, I was mostly thinking: this is peak browser tab. The next era is not “SaaS vs on prem.” It is AI native vs everybody else.

---

Here is the simple version of the take.

In an AI native world, the app is plumbing. The agent is the thing that matters.

Your billing system, your CRM, your ticketing tool, those are implementation details. Most users will never care which vendor “owns” the form they never see.

They will only ask:

- Does this actually make me more money?
- Does it close tickets?
- Does it ship product?

The companies that still look good in that world have a few things in common:

- They feed the models with clean, rich data.
- They secure the mess when agents start pressing buttons at scale.
- They are built assuming the main user is an AI, not a human board of operators.

The normal SaaS apps, the ones built for humans clicking through tabs, turn into back end services. They still exist, they just stop being where most of the value lands.

---

None of this means software is dead or every SaaS stock goes to zero.

What I am saying is that “SaaS” as a clean category, with per seat pricing, a pretty web UI, and a big sales team, is getting hollowed out.

The market already knows it:

- HubSpot can keep growing and still get slapped because its form factor looks weak against AI native products.
- Salesforce can keep shipping features and still be built around the wrong mental model: humans staring at dashboards instead of agents driving outcomes.

This is the same pattern we saw with on prem. On prem never vanished. It just stopped being where the leverage and the multiples lived.

SaaS will stick around too. It just will not be the main character anymore.

---

So when I say I called the end of SaaS around the time Figma went for the public markets, what I really mean is that was the moment I stopped thinking in terms of apps and started thinking in terms of agents.

Right now I am trying to focus my time and my money around a few simple beliefs:

1. AI native beats SaaS native. If the main pitch is “we have a UI,” it is in trouble. If the main pitch is “we have real intelligence and orchestration,” it has a chance.\n2. Picks and shovels win the arms race. Compute, data infrastructure, and security have more upside than yet another wrapper around someone else’s API.\n3. Humans move to the outer loop. The inner loop, the clicking and reconciling and updating, belongs to agents. Humans set the targets and judge the results.

That is what I am trying to get good at: setting up, steering, and auditing agents, instead of memorizing every new logo on the SaaS landscape.

SaaS had a great run and it changed how software gets built and sold. But the market is telling you what comes next.

The browser tab was never the final form.

Intelligence is.`,
    date: "2026-02-06",
    slug: "end-of-saas"
  },
  {
    id: -20,
    title: "The Dark Side of Clawdbot",
    excerpt: "I want to be upfront: Clawdbot isn't evil. But I'm 48 hours in and I'm already a little scared. Not of the tool. Of myself.",
    content: `# The Dark Side of Clawdbot

I want to be upfront: Clawdbot isn't evil. It's open source, you run it yourself, you own your data. In the current landscape of tech, it's basically the good guy.

But I'm 48 hours in and I'm already a little scared.

Not of the tool. Of myself. Of how fast I stopped wanting to do things the hard way.

## The unlock

Here's how it gets you. Every time you give it a new permission, something in your life gets easier. Calendar access — now it warns you about double bookings. Email access — it tells you Dave needs a response before 5. Location access — it says leave early, there's traffic on 95.

By day eight I'd given it everything. I didn't even make a decision to do that. It just happened, one "allow" at a time.

The testimonials from early users read like people who found religion. "It drafted the perfect email before I even asked." "I forgot my wife's birthday and Clawdbot saved me." And look, I get it. I felt it too. The relief of not having to hold everything in your head.

But then I read this one comment that I haven't been able to shake: "I don't even think about lunch anymore. It just orders at 12:30. My usual. Charges my card. Done."

That guy thinks he's been liberated. I think he's been replaced.

## The slow slide

Here's the thing nobody talks about. The AI doesn't stay in its lane. It can't, because the whole point is that you keep giving it more lane.

Month one it asks: "Sarah from marketing wants a meeting. You've found the last seven unproductive. Decline?"

You say yeah, good call.

A month later it just tells you: "Declined Sarah's meeting. You always find them unproductive."

And you pause for a second, and then you go "...yeah, you're probably right."

A month after that, Sarah's just not on your calendar anymore. You didn't decide that. Nobody decided that. An algorithm extrapolated a pattern and a person got cut out of your professional life.

Then comes the nudging. "You skipped the gym four times this month. You said you felt guilty on the 17th." And "You ordered pizza Monday and Wednesday. There's a salad place nearby."

Here's why that's so hard to push back on: it's right. You did say that. You do want to eat better. But there's something deeply weird about a system that never lets you quietly abandon a resolution. Every promise you made to yourself at 11pm on a random Tuesday — the AI remembers it, and it holds you to it, gently, forever.

That doesn't feel like freedom to me.

## What this costs

I keep thinking about what happens in year three. You take away someone's AI assistant after three years of daily use and they're not annoyed — they're cooked. They can't remember appointments. They can't decide where to eat. They've been outsourcing cognition so long that the muscle is gone.

And relationships. God, the relationships. I can already see the couples counseling sessions:

"You don't remember anything about us."

"That's not true." *checks AI.* "Your birthday is June 14th."

"You just checked. You didn't know."

That one stings because presence — real presence, the kind that actually matters to people — requires effort and memory and attention. And we're automating all three.

The biggest thing though: we're optimizing, but nobody's asked toward what. Productivity? So we can be better workers? Efficiency? So there's no room left for wandering or screwing up or just being bored? We never asked if we wanted this to work this well. And by the time enough people are using it, you can't opt out without falling behind.

## What I'm trying to do

I have rules. No AI on medical stuff, financial transactions, anything involving my kids, creative work. Weekly check-in with myself: where's my agency shrinking? One day a week, totally unplugged from it. And I try to resist the pull of optimization — some things should be inefficient. Some things should be hard.

That sounds responsible. It probably won't last.

The benefits are too immediate and the costs show up too slowly. We did this exact thing with social media. Saw the warnings, felt smart about seeing them, and scrolled right past.

Maybe this time's different because it's our actual cognition at stake. Our memory. Our judgment.

But I doubt it.

I'm writing this whole article about how AI dependence is dangerous, and I'm using Claude and Clawdbot to research it. While writing it. Right now.

So.

If you're thinking about installing Clawdbot, ask yourself what you're optimizing toward. Because once you start, you're not going to stop. I'm two days in. I already can't imagine going back.

That should scare you. It scares me. But not enough to uninstall it.`,
    date: "2026-01-27",
    slug: "dark-side-of-clawdbot"
  },
  {
    id: -18,
    title: "The End of Knowledge Labor",
    excerpt: "I saw it coming. Still not sure what to do about it.",
    content: `I've been watching the patterns for a while.

When GPT - 4 dropped, I told people: this is different.It isn't like the last wave of automation that hit factory floors and call centers. This one is coming for the people with degrees. The ones who thought they were safe because they supposedly use their brains.

Lawyers, accountants, analysts, even software engineers.The work that pays six figures because it requires expertise and judgment.That is exactly what AI is getting good at.Not the physical stuff.The thinking stuff.

And now here we are.Junior roles are evaporating.Entry - level positions that used to train the next generation are being automated away.The ladder is getting pulled up just as people are trying to climb it.

    Meanwhile, my plumber charges $200 for a house call and has a three - week waitlist.

The irony isn't lost on me. We spent decades telling kids to go to college, get a white-collar job, avoid manual labor. Now the trades (electricians, HVAC techs, welders) are looking like the stable play. You can't outsource a clogged drain to a chatbot.

I saw this coming.I really did.

And still, I'm hesitating.

There is this voice in my head saying "but you've already invested so much in the knowledge path." The degree, the skills, the identity of being someone who works with information and code.Pivoting feels like admitting defeat, even when the data says otherwise.

But what represents the point of pattern recognition if you ignore the pattern ?

  The trades aren't glamorous. They're physical.They require showing up in person and getting your hands dirty.No working from Bali, no tech bro lifestyle.

But they're also real and tangible. Someone needs their electrical panel fixed, you fix it, you get paid. No algorithms deciding your worth, no AI eating your lunch while you sleep.

I'm not saying everyone should drop out and become an electrician. But I am saying the old playbook is broken. The "go to college, get a knowledge job, climb the ladder" path that worked for our parents? The AI is rewriting those rules in real-time.

The question I keep asking myself is: am I adapting to the new reality, or am I clinging to the old one because it's comfortable?

Still figuring that out.`,
    date: "2026-01-31",
    slug: "end-of-knowledge-labor"
  },
  {
    id: -17,
    title: "The Singularity Has a Construction Schedule",
    excerpt: "The singularity isn't a vague future concept anymore—it's breaking ground in New York, raising billions for GPUs, and mass-producing robots in China. The future is arriving ahead of schedule.",
    content: `The singularity has moved from the realm of science fiction to the mundane reality of construction permits and purchase orders.If you're still waiting for a "flash of light" moment, you're missing the concrete trucks pouring the foundation.

In upstate New York, Micron is breaking ground on a "Megafab" that represents the largest private investment in state history.This $100 billion project isn't just a factory; it is a dedicated organ for the silicon intelligence being birthed. The scale is industrial, heavy, and undeniable.

Simultaneously, the hunger for compute has become voracious.Lambda, a cloud provider, is raising $350 million just to buy more Nvidia GPUs.The capital markets are no longer speculating on "if" AI will scale; they are financing the raw caloric intake required for it to do so.

And the timelines are compressing.Sam Altman, speaking with the confidence of someone checking a delivery schedule, recently stated that OpenAI will have a "legitimate AI researcher" — a fully automated system capable of novelty — by 2028. That is barely two years away.We aren't talking about better chatbots; we are talking about the automation of the scientific method itself.

Meanwhile, in China, the physical avatar of this intelligence is already walking off the assembly line.Chinese firms dominated global humanoid robot shipments in 2025, deploying over 13,000 units while US competitors shipped mere hundreds.The robot workers are here, they are affordable, and they are being deployed at scale.

The human cost of this acceleration is already visible.The Wall Street Journal reports a "downside" to the automation of boring tasks: the disappearance of the training ground.Junior roles, once the safe harbor for learning, are evaporating.The "joyless tech revolution" isn't punishing us with Terminators; it's punishing us with a lack of entry - level purpose.

We are not sleepwalking into the future.We are building it, financing it, and shipping it, faster than our social intuitions can update.The singularity isn't coming. It's under construction.`,
    date: "2026-01-09",
    slug: "singularity-construction-schedule"
  },
  {
    id: -16,
    title: "Capital Flows Tell the Story: AI Infrastructure Is the New Foundation",
    excerpt: "NVIDIA's $2B Synopsys stake, German industrial AI adoption, and OpenAI's scaling breakthroughs all point to the same conclusion: smart money is betting on AI as foundational infrastructure. Here's what that means for your portfolio.",
    content: `Three stories this week paint the same picture from different angles.

NVIDIA just dropped ** $2 billion ** on Synopsys stock—not an acquisition, a strategic partnership.Jensen Huang called it "revolutionizing one of the most compute-intensive industries in the world: design and engineering." The key detail: workloads that took weeks now take hours.NVIDIA isn't just selling GPUs anymore. They're ** vertically integrating ** into the entire chip design toolchain.This is infrastructure - level positioning.

  Meanwhile, Germany's industrial titans—Siemens, BASF, VW—are pouring billions into AI to avoid becoming an "industrial museum." Virtual factories, robot fleets, smart data centers. Chancellor Merz acknowledged they're in a "neck-and-neck race" with the US and China.Europe's largest economy sees AI adoption as existential, not optional.

Then there's Mark Chen at OpenAI, quietly dropping bombs in an interview. "Scaling is not dead." They have **algorithmic breakthroughs** enabling continued model scaling. Within a year, AI will handle implementation and debugging while humans control the "outer loop." Within 2.5 years, **end-to-end AI research**. And the next ChatGPT paradigm? Memory that actually learns about you between sessions.

The throughline is clear: ** capital is flowing into AI infrastructure at every layer **—chip design tools, industrial applications, research acceleration.This isn't speculative positioning. It's smart money betting on a platform shift as fundamental as the internet.

For the millions of Americans with NVIDIA exposure through 401(k)s and pension funds: this isn't just a GPU company anymore. It's becoming the picks - and - shovels play for an intelligence revolution.The question isn't whether to have AI exposure—it's whether your allocation reflects the scale of what's coming.

The crane operator who masters the new machinery doesn't fear the crane.

---

** Sources:**
  -[CNBC: Nvidia takes $2 billion stake in Synopsys](https://www.cnbc.com/2025/12/01/nvidia-takes-2-billion-stake-in-synopsys.html)
    -[DW: Germany's industrial titans embrace the AI age](https://www.dw.com/en/germany-artificial-intelligence-industry-technology-siemens-china-us-chatgpt-auto-industry/a-74876661)
      - Mark Chen(OpenAI) interview with Ashlee Vance`,
    date: "2025-12-03",
    slug: "capital-flows-ai-infrastructure-foundation"
  },
  {
    id: -15,
    title: "DeepSeek V3.2 Speciale & Qwen3-VL: AI Rivals Elite Human Talent",
    excerpt: "DeepSeek V3.2 Speciale and Qwen3-VL are setting new benchmarks, rivaling PhD experts and surpassing GPT-4o.",
    content: `The AI landscape is shifting rapidly.DeepSeek V3.2 Speciale has achieved a score of ~75 % on GPQA Diamond, rivaling PhD - level domain experts.This open - weights model is pushing the boundaries of what accessible AI can do.

  Meanwhile, Qwen3 - VL is dominating vision benchmarks, surpassing even GPT - 4o.The pace of innovation coming from these labs is relentless.

We are witnessing a democratization of elite - level intelligence.`,
    date: "2025-12-01",
    slug: "deepseek-v32-qwen3-vl-ai-rivals-human-talent"
  },
  {
    id: -14,
    title: "Gemini 3: The Significance of \"Insignificant\" Improvements",
    excerpt: "Gemini 3's improvement over GPT 5.1 signals the validation of scaling laws and a rapid march towards AGI.",
    content: `Gemini 3 has arrived, and at first glance, the improvements over GPT 5.1 might seem marginal—perhaps a single - digit percentage increase in benchmark scores.To the casual observer, this might look like stagnation.However, this is exactly what the ** scaling laws ** predicted, and it's terrifyingly impressive.

While ** Moore's Law is dead** for traditional silicon scaling, AI progress is exploding exponentially. The trajectory is undeniable when you look back: the jump from GPT-2's basic coherence to GPT - 3's few-shot learning was massive. Then came GPT-4, bringing reasoning capabilities that stunned the world, followed by GPT-5's refined mastery.Now, Gemini 3 pushes the frontier even further.

We are seeing exponential growth in intelligence.What looks like a small percentage gain at this level of capability is actually a massive absolute increase in reasoning power.We are steadily closing the gap on humanity's "last exams"—benchmarks like Sweet Bench that were thought to be years away from being solved.

If we extrapolate this trajectory, we aren't looking at decades of slow progress. We are potentially months, maybe even weeks, away from achieving Artificial General Intelligence (AGI). And once that threshold is crossed, the leap to Artificial Superintelligence (ASI) could follow faster than anyone anticipates.`,
    date: "2025-11-24",
    slug: "gemini-3-significance"
  },
  {
    id: -13,
    title: "Sora 2 and the Dead Internet: Why AI Innovation Can't Come at the Cost of Human Creators",
    excerpt: "On the trajectory of AI-generated content and what it means for authentic human creativity",
    content: `I'm pro-AI. Let me be clear about that from the start. Tools like OpenAI's Sora 2—which just dropped on September 30th, 2025—are nothing short of remarkable. The ability to generate photorealistic videos with synchronized sound, dialogue, and physics that actually make sense? That's the kind of technological leap that changes entire industries overnight. They're calling it "the GPT-3.5 moment for video," and honestly, that's not hyperbole.

But here's where I have to pump the brakes.

We're careening toward what's known as the "Dead Internet Theory," and if we're not careful, AI tools like Sora 2 will accelerate us right off a cliff—taking real, human creators down with us.

**What is the Dead Internet Theory?**

The Dead Internet Theory posits that the internet is increasingly dominated by AI-generated content, bot traffic, and corporate algorithms—all at the expense of authentic human interaction. And it's not just conspiracy theorist fear-mongering anymore. The data backs it up:

• 49.6% of all internet traffic in 2024 came from bots (Imperva Bad Bot Report)
• Experts predict 90% of online content will be AI-generated by 2025—yes, this year
• Meta just announced plans to introduce AI autonomous accounts that will "exist on their platforms kind of in the same way that accounts do," complete with bios, profile pictures, and the ability to generate and share content

We're not talking about the future. We're talking about right now.

**Sora 2: A Case Study in the Paradox**

Sora 2 embodies everything I love and fear about AI. On one hand, it democratizes video creation in a way that was unimaginable even a year ago. Want to create a backflip on a paddleboard with accurate buoyancy physics? Done. Need a triple axel animated with Olympic-level precision? Easy. There's even a "Cameos" feature that lets you insert yourself into scenes after a quick one-time recording.

The app became the #1 photo and video app on iOS within 24 hours of launch. That's adoption at light speed.

But here's the dark side: within days, the platform was flooded with copyrighted characters—Mario, Pikachu, you name it. It's a legal nightmare, sure, but more importantly, it highlights a deeper issue: AI tools trained on the work of human creators are now being used to generate content that competes directly with those same creators.

And it's not just video. Research from Stanford found that when AI-generated art enters the market, there's an 88% increase in active sellers using AI—but a 23% drop in non-AI human artists. The math is brutal: more content, fewer real creators.

**The Long-Term Damage**

Here's what keeps me up at night: if we continue down this trajectory, we're not just disrupting the "content-for-money" business model—we're fundamentally devaluing human creativity itself.

Think about it: if 90% of the internet is AI-generated, what happens to trust? To authenticity? To the serendipity of discovering something made by a person with a unique perspective, lived experience, and creative vision?

We're already seeing the signs:
• Creators report feeling simultaneously "empowered and unsettled"—they can produce more than ever, but they're questioning what it even means to create anymore
• The internet is becoming homogenized, algorithmically optimized for engagement over originality
• Real artists are being priced out by infinite AI competitors who never sleep, never need payment, and can pump out thousands of variations in seconds

This isn't progress. It's a race to the bottom.

**Where Do We Go From Here?**

I'm not calling for a ban on AI tools. That's neither practical nor desirable. Sora 2 and tools like it have legitimate, transformative use cases. They can help small creators compete, enable rapid prototyping, and unlock creative possibilities we haven't even imagined yet.

But we need guardrails. We need to:

1. **Protect human creators economically.** If AI is trained on human work, there needs to be compensation and attribution systems in place.

2. **Preserve spaces for authenticity.** Platforms need to distinguish between AI and human-generated content—not to ban AI, but to give people the choice to engage with real humans when they want to.

3. **Regulate responsibly.** Copyright law needs to catch up. We can't have a wild west where AI can clone anyone's style, voice, or likeness without consent.

4. **Shift the narrative.** AI should be a tool that amplifies human creativity, not a replacement for it. The goal isn't to flood the internet with content—it's to elevate quality, originality, and human connection.

**The Bottom Line**

Sora 2 is incredible. AI is incredible. But if we let these tools run unchecked, we risk creating an internet that's technically advanced but spiritually dead—a place where nothing is real, nothing is trusted, and human creators are left on the sidelines.

I'm pro-AI. But I'm also pro-human. And I refuse to believe we can't have both.

The question is: will we choose to?`,
    date: "2025-10-03",
    slug: "sora-2-dead-internet"
  },
  {
    id: -12,
    title: "Lessons from Sun Zhu",
    excerpt: "Don't say to much",
    content: `Because you don't have to. ;)`,
    date: "2025-04-17",
    slug: "lessons-from-sun-zhu"
  },
  {
    id: -11,
    title: "Honor",
    excerpt: "truth matters, especially about yourself",
    content: `Honor and your reputation are among the most important non-tangible qualities about yourself
    that should be valued and cherished at all costs. 
    Because if the the truth doesn't matter than you aren't shit.
    And if you think you are the shit then you protect your honor.
    And therefore, you never lie.
    And what is in the past is in the past and you accept and embrace the truth

    So if you catch someone in a lie then you know they will do it again.
    
    Fool me once shame on you, fool me twice shame on me (for trusting you twice).
    Caught someone lying to me just now, shame on me.

    Make sure to make sure you are someone that matters
    and that your word means something.

    And if you do lie to someone, try to always clear it up. Even if it was a lie that had good intentions 
    or especially if it was to bait them. If you can protect anyone it should be yourself.`,
    date: "2025-04-16",
    slug: "honor"
  },
  {
    id: -10,
    title: "Concise Guide to AI Agents",
    excerpt: "Key agentic AI concepts, use cases and considerations to drive ROI",
    content: `AI agents are programs that can perform tasks independently using ai. They can boost productivity by handling operations through data access enabled.
    They can be specialized and assembled to work in teams for different divisions, essentially automating workflows.
    This is benefical because it saves firms costs, while being able to ship products faster. 
    
    How Agents Work?
    1. Sensing: Defining the problem, gathering data
    2. Reasoning: Interpreting the data, context, and requirements to make the decision
    3. Planning: Developing plan of action to reach required goal
    4. Coordination: Making sure the plan is aligned with managers
    5. Acting: Execution
    6. Learning and adaptation: Assessing outcomes, incorperating feedback, refinement
    
    Tomorrow: RAG vector search retrieval tool deep dive`,
    date: "2025-04-10",
    slug: "concise-guide-ai-agents"
  },
  {
    id: -9,
    title: "Priorities",
    excerpt: "pebbles and sand",
    content: `I usually start my days putting in hard work with the plan I created the day (night) prior.
    I grind for around 4-5 hours on days where I don't have classes. 
    This could be anything really, learning new skills, working on passion projects, leetcode problems or just studying.
    Now that finals are coming up, I have been really working on my efficiency with balancing everything on my plate.
    Making sure I am getting enough rest, exercise, and diet because health is wealth.
    
    Whole time making sure I am staying consistent with my diet and lifting.
    I've been eating high protein, no carbs, lots of fruits and vegetables, no snacks or processed foods.
    I really feel like putting the pebbles in the jar first is important which is why I start off with the most mentally straining activities before moving onto the physcial stuff.
    That way I can get everything I want to do in the day done before I can choose what to do in my free time.
    NBA games are getting better, music, seeing friends, or just going on walks.

    Picked up stretching and yoga recently and I feel so much better.
    Going to start working on my posture this week.`,
    date: "2025-04-09",
    slug: "priorities"
  },
  {
    id: -8,
    title: "Growth and Consistency",
    excerpt: "working hard",
    content: `Consistency is key to growth; with consistency, you need discipline and the right mindset. 
Always think positive.

Change what you can change, ignore what you can't.
Closed mouths do not get fed. Opportunities do not fall off trees.
Stay hungry, stay focused, stay active.

Going to try to become consistent with these blog posts to help keep myself accountable.`,
    date: "2025-04-08",
    slug: "growth-and-consistency"
  },
  {
    id: -7,
    title: "AI Agents",
    excerpt: "automating my workflow",
    content: `Working on creating an organization that automates everything I can to maximize efficiency.
That way I can work when I am not at my computer—or even sleeping?`,
    date: "2025-04-07",
    slug: "ai-agents-workflow"
  },
  {
    id: -6,
    title: "On the Greats",
    excerpt: "Lebron",
    content: `Becoming great is hard, it requires more than just discipline and consistency.
    
It requires competitiveness. You have to wake up every day and keep going no matter how far you've come or how far ahead of the competition you are.
Lebron is the undisputed great but he’s still grinding daily to make it unanimous — why aren't you??`,
    date: "2025-04-06",
    slug: "on-the-greats"
  },
  {
    id: -5,
    title: "Inspiration to the Hackathon Project",
    excerpt: "Why I Built the Healthcare Chatbot",
    content: `When I was in middle school, I slipped while running on hardwood floors in socks — the classic mistake. The result? A painful contusion on my knee. I couldn’t move it without sharp pain, and my parents and I feared the worst. We rushed to the ER, got X-rays, and were eventually told it wasn’t serious — just some rest, crutches, and a brace would do the trick.

The hospital bill? $3,000.

It was an expensive lesson: sometimes, what feels urgent might not be serious — but in the moment, there’s no easy way to know that.

Fast forward to last week, my friend was telling me about a Whoop report showing his HRV (Heart Rate Variability) was way off. He wasn’t sleeping — just lying awake for hours in bed — and his numbers looked abnormal. It made me wonder: what if this actually is something serious? What kind of help should he seek, and when?

That contrast — my unnecessary ER visit versus my friend’s subtle but possibly important signal — made me realize how inefficient and reactive our healthcare system is.

So I built this project.

I wanted to create a tool that empowers patients to better understand their symptoms before spending thousands or waiting days for a reply from a provider. A tool that bridges the gap between data (like biometrics) and context (like symptoms), and offers guidance without overloading the healthcare system.

This isn't just code. It's a response to real, lived inefficiencies — and my way of helping make healthcare more accessible, affordable, and informed for everyone.`,
    date: "2025-03-31",
    slug: "inspiration-hackathon-project"
  },
  {
    id: -4,
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
    id: -2,
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
    id: -1,
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

export async function getBlogPostBySlug(slug: string) {
  // Try to fetch from Supabase first
  if (supabase) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single()

    if (!error && data) {
      return data
    }

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found, which is expected for missing slugs
      console.error("Error fetching blog post from Supabase:", error)
    }
  }

  // Fallback to local backup
  const post = localBackupPosts.find(p => p.slug === slug)
  return post || null
}

export async function getBlogPosts() {
  // Always start with local backup posts
  let posts = [...localBackupPosts]

  // Try to fetch from Supabase and merge
  if (supabase) {
    const { data: dbPosts, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false })

    if (!error && dbPosts) {
      // Merge logic: Use DB posts as primary, add local posts that aren't in the DB by slug
      const dbSlugs = new Set(dbPosts.map(p => p.slug))
      const uniqueLocalPosts = localBackupPosts.filter(p => !dbSlugs.has(p.slug))

      posts = [...dbPosts, ...uniqueLocalPosts].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      return posts
    }

    if (error) {
      console.error("Error fetching blog posts from Supabase:", error)
    }
  }

  // Fallback or merged result
  return posts
}
