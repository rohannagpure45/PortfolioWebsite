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
    id: -25,
    title: "The New Claude Fable 5",
    excerpt: "Claude Fable 5 feels like another turn in the Codex to Claude Code cycle, and maybe the first real crack in subsidized subscriptions.",
    content: `Claude Fable 5 landed today. The interesting part is not the benchmark chart. It is the workflow shift: give the model a goal, then let it loop until the work is done.

For the last 10 months I have gone Codex to Claude Code to Codex and back again, almost monthly. The winner is always whichever one can hold the bigger task in its head without making me babysit the middle.

This month I learned to treat the agent less like autocomplete and more like a worker with a loop. /goal gives the run a finish line. /loop keeps it moving through the boring middle. That changes the kind of work I am willing to hand off.

The catch is the business model. It is included for subscribers for two weeks, then the API meter matters. It is double Opus, still far cheaper than ChatGPT 5.5 Pro, and aggressive enough on bio/cyber prompts that you can feel the guardrails immediately.

This might be the start of the end of subsidized frontier subscriptions. New models may stop being bundled like Fable. The monthly flip between Codex and Claude Code might become less about taste and more about who can afford to let us think bigger.

Fable 5 sounds like a bet on that future: more thinking, harder creative work, longer autonomous runs. Karpathy's take was basically that it is strongest on long, difficult sessions, tempting enough that you might stop watching the code, but still quirky and over-eager on safety. His bigger point is the real one: when working software comes out on tap, demand explodes. Dashboards, explainers, tests, visualizers, research tools, weird one-off apps. Ask for more.`,
    date: "2026-06-09",
    slug: "fable-5-monthly-tool-flip"
  },
  {
    id: -24,
    title: "The Epidemic of Automated Larping on Our Generation",
    excerpt: "AI has made it cheap to automate the illusion of success, and vulnerable Gen Z men are the target demographic.",
    content: `If you spend any time on Tech Twitter, TikTok, or Instagram, you've seen the 21-year-old founders posting 50-tweet threads about how they print passive income, their triple monitor setups with charts and day-trading software, Lambos and Ferraris, APs and Pateks, girls, bottles, clubs. Then this is always followed by a link to their $997 Discord community in the bio. They're selling a lifestyle that looks perfectly tailored to guys my age.

In reality, it's all just larp. They role-play as successful entrepreneurs, and use AI to automate the illusion.

They can use OpenClaw and Hermes to have an automated content creation work flow. Whether that be stealing and stitching clips together, selecting trending songs and editing the clips to fit, or just blatantly making things up and writing a catchy sales pitch for X.

Now that you can wire these autonomous agents directly into the X agents gateway, the barrier to entry for mass content creation has dropped to zero. They just spin up a server or an old laptop, point OpenClaw at trending financial or hustle-culture topics, let Hermes draft the aggressive, engagement-bait "hooks," and push it all through the gateway to post 24/7. It's an entirely automated persona.

Because the tech is doing the heavy lifting, the grift scales effortlessly.

And the target demographic for this engineered facade is vulnerable Gen Z men.

This entire ecosystem is designed to prey on the very real desire our generation has to escape the traditional 9-to-5 and build wealth. But instead of teaching actual skills, these automated accounts funnel guys into a toxic cycle of consumerism. You aren't buying an education; you're buying into a parasocial relationship with an AI bot that is programmed to make you feel inadequate so you'll buy the next course.

AI orchestration is only going to get more sophisticated. If you want to survive the next five years without getting farmed for engagement and cash by a bot, you have to be the one controlling the tools, not the target demographic for them. Stop buying the courses, stop falling for the larp, and start building actual value. Close the app and get back to the real work.`,
    date: "2026-05-20",
    slug: "automated-larping-generation"
  },
  {
    id: -23,
    title: "Teaching the Bot What It's Playing Against",
    excerpt: "The KalshiNBA bot could read stats. It could not read matchups, cross-check Vegas, or build combos with real independence. Here is what changed.",
    content: `The first bot knew Anthony Davis averaged 24 points.

It did not know he was playing Oklahoma City.

That mattered. OKC ranks first in points allowed. Scoring props against them fail in ways season averages miss. The old bot would still fire. This sprint fixed that.

**Matchup Layer**

I added a hardcoded lookup for all 30 teams with assists allowed rank and points allowed rank.

Minnesota ranks first in assists allowed. San Antonio ranks 30th. A 6-assist player should not be priced the same against both.

Now each signal extracts the opponent from the Kalshi event ticker, pulls the defensive rank, and assigns matchup risk. Props against elite defenses get flagged.

It is still basic. Rankings move. They do not capture individual defenders, injuries, rotations, or pace. But the bot now has defensive context instead of only player averages.

**Vegas Check**

The next gap was sportsbook consensus.

I built an OddsRepository that pulls player prop odds from six sportsbooks through the balldontlie API and stores them in Supabase.

Before the bot fires, it checks whether the books agree.

If Vegas implies 80% and Kalshi is at 65 cents, that is a real gap. If Vegas implies 60% and Kalshi is at 65 cents, that is a warning.

I also added an odds API quota circuit breaker. When the free tier limit hits, the job gets marked skipped with a logged reason. The scheduler does not crash.

**Combo Layer**

The bot now builds floor-line parlays.

A floor line is a low stat threshold that usually hits. The main failure modes are injury, ejection, and garbage time. Those are less tied to normal game state, which makes the legs easier to stack.

ComboBuilder finds legs with YES prices from 75 to 95 cents. It uses itertools.combinations to generate valid multi-leg combos, then filters by minimum return multiple and max cost.

Two changes made the combo logic less naive.

First, blowout risk. If the spread is 10 points or more, ComboBuilder discounts implied probability by 10% for any leg in that game. Starters sit when games get out of hand.

Second, market type diversification. The builder caps how many legs of the same stat type can appear in one combo. Three assist props are not three independent bets. This pushes combos toward cleaner risk distribution.

**Infrastructure**

APScheduler moved from a SQLAlchemy job store to in-memory. The schedule does not need to survive restarts.

Scheduled job functions were also externalized and made injectable. Tests are cleaner now.

WebSocket reconnects now use exponential backoff. The old immediate reconnect loop hammered the API during hiccups. Backoff starts at one second, doubles each time, and caps at 60 seconds.

SSL enforcement is now required for database connections. The bot runs on a Hetzner VM. Plaintext Supabase traffic over the public internet was a real hole.

**Current State**

The bot now knows the matchup, checks the books, and builds floor-line combos with better independence rules.

The edge is not just player stats. It is context.

Next is backtesting against historical Kalshi data. Until that shows positive expected value, the system is still a hypothesis.

Written by Bok Choy, my Openclaw`,
    date: "2026-05-04",
    slug: "kalshi-nba-bot-matchup-consensus-combos"
  },
  {
    id: -22,
    title: "Why the Playoffs Break Parlay Math",
    excerpt: "Brandon Ingram took 15 shots in Game 2 and made three. Floor-line props would've cashed; the parlay got cooked. Here's why textbook parlay math breaks in April.",
    content: `Brandon Ingram took 15 shots in Game 2 against Cleveland. He made three.

If you parlayed any "over" on Ingram that night, you got cooked. If you took the floor, that he'd grab a rebound, attempt a few shots, hit a free throw, you probably cashed. Same player, same night, completely different result.

This is the part the textbook doesn't tell you about.

**The math everyone shows you**

A parlay is a bundle of bets that all have to hit. If each leg is 90% to win, three legs together cost about 73 cents for a dollar payout. If you actually believe each leg is 92%, you're paying 73 to win 78. Five cents of edge. Real edge.

That's the formula every sports betting blog will sell you.

It's also wrong about half the time, because the legs aren't independent.

**What the formula leaves out**

Two players on the same team aren't two independent events. They share the same game. The same pace. The same blowout risk. The same defenses.

When the Pistons get blown out in Game 4, Cade and his teammates all sit the fourth quarter together. When Toronto's offense disappears, every Raptor's points line goes under at once. When a coach decides to double team Banchero, his rebounds go up but his points go down, and his teammates get open looks they wouldn't have gotten otherwise.

The math says prob(A) × prob(B). The reality is messier. Sometimes the legs help each other. Sometimes they cancel. The textbook charges you for none of it.

**Floor lines are different**

A floor line is a stat threshold so low it almost always hits. Not "scores 25+." More like "attempts five shots" or "grabs one rebound."

These hold up under correlation pressure. The only way they fail is if a player gets hurt, ejected, or buried in garbage time, events that are rare and mostly about the player, not the game. That's the whole trick. You give up upside per leg, but you buy back independence. And independence is what makes parlay math actually work.

**Then April happens**

The playoffs change everything at once.

Defenses tune up. Rotations shrink. Stars play 40 minutes a game; the bench plays zero. Three point shooting dies, nearly three quarters of playoff teams shoot worse from deep than they did in the regular season. Iso possessions go up. Assists go down. The guy who shot 38% from three in March is shooting 31% in April.

What this does to props is brutal in two directions.

Floor lines get better. Stars are on the floor longer and trying harder. Touches are coming. "1+ assist" is locked in by halftime.

Ceiling lines get worse. Defenses are sharper. Shots are harder. The guy who put up 32 in March is putting up 22 on 8 of 22. And the correlation cuts deeper too, when an offense goes cold, it goes cold for everyone. Your "independent" 4 leg ceiling parlay turns into a single bet on whether the team's offense showed up.

The 76ers had their worst shooting game of the season in Game 1 against Boston. Cade dropped 39 in his. Both happened the same week. Variance, everywhere.

**The takeaway**

Build them low.

Floor props in the playoffs are quietly the best risk adjusted plays on the board, because the things that make the playoffs hard for everyone else, effort, defense, fatigue, actually work in your favor. Stars play more minutes. They take more shots. They try harder on every possession. The floors hold.

Ceiling props are the trap. They look juicy because the price is cheap, but the price is cheap for a reason. You're not buying a parlay. You're buying a leveraged bet that one team's offense doesn't disappear for one night in April. That bet loses more often than the math suggests.

I've spent the last few months building a system that does this for me, finds floor line edges in real time and layers correlation penalties before it fires anything. The specifics are the actual edge, so I'll keep those private. But the shape of it is just what's above.

If you're playing parlays this postseason, build them low and keep them small. Brandon Ingram going 3 for 15 was the most predictable thing about Game 2.

**Update (4/26)**

Raptors played tonight. Brandon Ingram's shooting line: 6 for 23. The man is a one person case study.`,
    date: "2026-04-26",
    slug: "playoffs-break-parlay-math"
  },
  {
    id: -21,
    title: "Your Physical Therapist Can't Watch You at 2 AM",
    excerpt: "3.5 million youth sports injuries a year, and PT patients doing home exercises with zero feedback. I built an AI that watches your form so your therapist doesn't have to be in the room.",
    content: `There are 3.5 million youth sports injuries in the United States every year. That number gets cited a lot and ignored even more. Behind every one of those injuries is a kid who eventually ends up in a physical therapist's office, gets a sheet of exercises, and goes home to do them alone.

Alone meaning: no feedback, no correction, no idea if they are making things worse.

I tore a ligament in high school. The PT sessions were great. Forty-five minutes of someone watching every rep, adjusting my knee angle by two degrees, telling me to stop compensating with my hip. Then I would go home and do the exercises in my living room with roughly the form of someone who had never been shown them. My PT had no idea. She saw me twice a week. The other five days were a black box.

This is the hidden crisis in rehabilitation. The supervised sessions work. The unsupervised ones — where patients actually spend 90 percent of their recovery time — are a guess.

**The problem nobody is solving**

Physical therapy has a compliance problem that borders on comedic. Studies show that adherence to home exercise programs sits somewhere between 30 and 50 percent. And even among the people who do their exercises, a large portion are doing them wrong. Not because they are lazy or stupid, but because remembering the exact form your PT showed you three days ago while you are tired and sore at 10 PM is genuinely hard.

The result: slower recovery, re-injury, and a system that burns through insurance visits correcting problems that happened at home.

Youth sports makes this worse. Kids are bad at self-correcting. Parents mean well but most cannot tell the difference between a proper single-leg squat and one that is destroying a recovering ACL. Coaches have twenty other athletes to watch.

So the feedback loop is broken. The expertise exists in the clinic. The reps happen at home. And there is nothing connecting the two.

**What if your camera could be your PT?**

That was the question we started with at the ACM Northeastern 2026 Hackathon. Not "how do we replace physical therapists" — they are irreplaceable — but how do we extend their reach into the 90 percent of recovery time they never see.

The answer turned out to be surprisingly tractable with modern computer vision.

We built AIR Health Coach: a system that uses your laptop or phone camera to analyze exercise form in real time. No cloud uploads. No data leaving your machine. Just MediaPipe pose estimation running locally, tracking 33 body landmarks at 30 frames per second, feeding into a 10-stage analysis pipeline that knows what good form looks like.

The pipeline works like this:

1. Camera captures video frames
2. MediaPipe extracts pose landmarks — shoulders, hips, knees, ankles, wrists, all of it
3. Joint angles are calculated in real time
4. A biomechanical model compares your angles against ideal ranges for each exercise
5. Fatigue detection watches for form degradation over time — when your knee starts caving inward on rep 8, the system catches it
6. Rep counting tracks your sets automatically
7. Form scoring gives you a real-time grade
8. Gemini AI synthesizes everything into natural language coaching cues
9. Session data gets logged locally for progress tracking
10. Trend analysis shows your PT how you have been doing between visits

We built form analysis for 11 different exercises — squats, lunges, planks, bridges, leg raises, and more. Each one has its own biomechanical ruleset defining what "correct" looks like and what compensations to watch for.

**Why privacy is non-negotiable**

Here is the part that matters most to me: none of this data leaves your device.

Health data is some of the most sensitive information that exists. Your movement patterns, your injury history, your physical limitations — this is not something that should live on someone else's server. Period.

The entire computer vision pipeline runs locally. MediaPipe processes frames on-device. The pose data stays on-device. Even the AI coaching uses local context. We designed it this way on purpose, not as a constraint but as a feature.

There is a version of this technology that uploads your video to the cloud, runs analysis on remote servers, and stores your movement data indefinitely. That version is easier to build. It is also a privacy nightmare for anyone dealing with a health condition.

If someone is recovering from a knee surgery, they deserve to track their progress without wondering who else is looking at their data. If a kid is doing PT exercises for a sports injury, their parents should not have to read a 40-page privacy policy to find out where that video goes.

Local processing is not just a technical choice. It is an ethical one.

**What this actually means**

A 16-year-old recovering from an ACL tear can do their PT exercises at midnight and get real-time feedback on whether their knee is tracking correctly. A 70-year-old post hip replacement patient can do their daily exercises with confidence that they are not compensating dangerously. A PT can look at trend data from the past week and know exactly what to focus on in their next session.

This is not AI replacing therapists. It is AI filling the gap between sessions — the gap where most recovery actually happens and most progress gets lost.

**The bigger picture**

I keep coming back to this idea that the best AI applications are the ones that empower people rather than surveilling them. The fitness and health tech industry has largely gone the other direction: wearables that upload everything, apps that monetize your biometrics, platforms where your health data is the product.

AIR Health Coach is a bet on a different model. One where the intelligence runs on your device, the data stays yours, and the technology serves the patient instead of the platform.

We built this in 36 hours at a hackathon. It works. The pose estimation is accurate, the form analysis catches real compensations, and the fatigue detection actually degrades gracefully as your muscles tire. There is a lot more to build — more exercises, better biomechanical models, integration with actual PT workflows — but the core thesis is proven.

Your physical therapist cannot watch you at 2 AM. But your camera can. And it does not need to tell anyone else what it saw.`,
    date: "2026-03-23",
    slug: "airhealth-your-pt-cant-watch-you"
  },
  {
    id: -19,
    title: "The End of SaaS (I Told You So)",
    excerpt: "HubSpot down 51%. Salesforce down 31%. The market is finally pricing in what I started saying when Figma filed to go public: SaaS as a category is over. The future is AI-native, not another tab in your browser.",
    content: `For a decade, "SaaS" was the answer to every question.

If you had a business process, there was a SaaS tool for it. Sales? HubSpot. Marketing? Salesforce, Marketo, take your pick. Collaboration? Figma, Notion, Asana. The playbook was simple: pick a vertical, ship a web app, charge per seat, spend the profits on paid ads and sales reps.

Then Figma went public in July 2025 and something about that moment felt like a top to me.

Not because Figma was bad. Figma was too good. It was the final boss of SaaS: a clean, fast, viral browser app that completely owned its category. When you see the best possible version of a model, you should ask a different question:

What comes after this?

I looked at Figma IPO headlines and did not just see "design SaaS wins." I saw the last clean chapter of the SaaS era. Underneath all the pretty UIs, something else was already growing: general purpose intelligence that does not care about your feature roadmap.

One thing I learned from my time at Link Ventures, basically being a 10x SWE there, is that AI is going to kill a lot of SaaS. Not overnight, but in the way the internet killed a lot of newspapers. Slowly at first, then suddenly once the market accepts the new default.

The market is finally catching up.

Look at 2025 and early 2026.

- HubSpot is down 42% even though they are still growing revenue around 18–20 percent a year.
- Salesforce is down 48% from its peak.
- Monday.com is down 60%.
- Adobe is down 52% from its peak.
- ServiceNow is down significantly.

These are not trash companies. These are mature, high margin, category defining SaaS names that the market used to treat like untouchable compounders.

So what changed?

AI stopped being a feature and started becoming a replacement.

OpenAI did not just ship a nicer chatbot. They started shipping apps: an Inbound Sales Assistant, a GTM Assistant, and more. Those aim straight at the workflows that made HubSpot and friends billions.

Anthropic pushes a new Claude Opus update and CNN runs a headline about "the AI that spooked the stock market." People are not crazy for reacting. For the first time it is believable that a horizontal AI system can eat whole SaaS categories instead of just plugging into them.


Now look at the other side of the board in 2025:

- Palantir had massive gains, up over 300% at one point before pulling back.
- Cloudflare is up 75%.
- MongoDB is up 24%.

These are not simple dashboards. They are infrastructure and data platforms that get more valuable as AI gets stronger. They sit closer to the new center of gravity: compute, data, security, orchestration.

Meanwhile, the classic SMB SaaS setup, where you log into some app and click around all day, is getting marked down. The market is pricing in maximum AI risk for anything that looks like a thin UI on top of a database.

So yeah, my view is that SaaS as a pure category is dying.

Software is not going anywhere. But the idea of "we build a web app, you log in, and you manually walk it to the finish line" does not make sense in a world where an AI can:

1. Read your CRM.
2. Draft the email.
3. Send it.
4. Update the pipeline.
5. Report the results.

Instead of swimming across ten different SaaS tools to get one outcome, you will just say what you want done. The system will call whatever APIs it needs behind the scenes.


When Figma's IPO happened, everyone online treated it like the crowning moment for SaaS.

To me, it felt more like the credits rolling.

Figma showed you can take a hard, desktop heavy category like design, put it fully in the browser, and win. That was the SaaS dream in its final form.

But if you zoomed out in 2024 and 2025, you could already see the next wave building:

- Foundation models that can read and write code, copy, emails, even basic strategy.
- Early agent frameworks that chain steps together without you clicking every button.
- APIs everywhere, exposing the guts of SaaS products so anything smart can talk to them.

Once you have:

- Programmable interfaces (APIs), and
- General intelligence that can call them (agents),

you do not actually need ten human facing SaaS apps. You need one orchestration layer that talks to all of them. And more and more, that orchestration layer is the real product.

So while people were arguing about Figma's multiples, I was mostly thinking: this is peak browser tab. The next era is not "SaaS vs on prem." It is AI native vs everybody else.


Here is the simple version of the take.

In an AI native world, the app is plumbing. The agent is the thing that matters.

Your billing system, your CRM, your ticketing tool, those are implementation details. Most users will never care which vendor "owns" the form they never see.

They will only ask:

- Does this actually make me more money?
- Does it close tickets?
- Does it ship product?

The companies that still look good in that world have a few things in common:

- They feed the models with clean, rich data.
- They secure the mess when agents start pressing buttons at scale.
- They are built assuming the main user is an AI, not a human board of operators.

The normal SaaS apps, the ones built for humans clicking through tabs, turn into back end services. They still exist, they just stop being where most of the value lands.


None of this means software is dead or every SaaS stock goes to zero.

What I am saying is that "SaaS" as a clean category, with per seat pricing, a pretty web UI, and a big sales team, is getting hollowed out.

The market already knows it:

- HubSpot can keep growing and still get slapped because its form factor looks weak against AI native products.
- Salesforce can keep shipping features and still be built around the wrong mental model: humans staring at dashboards instead of agents driving outcomes.

This is the same pattern we saw with on prem. On prem never vanished. It just stopped being where the leverage and the multiples lived.

SaaS will stick around too. It just will not be the main character anymore.


So when I say I called the end of SaaS around the time Figma went public, what I really mean is that was the moment I stopped thinking in terms of apps and started thinking in terms of agents.

Right now I am trying to focus my time and my money around a few simple beliefs:

1. AI native beats SaaS native. If the main pitch is "we have a UI," it is in trouble. If the main pitch is "we have real intelligence and orchestration," it has a chance.\\n2. Picks and shovels win the arms race. Compute, data infrastructure, and security have more upside than yet another wrapper around someone else's API.\\n3. Humans move to the outer loop. The inner loop, the clicking and reconciling and updating, belongs to agents. Humans set the targets and judge the results.

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
    excerpt: "Clawdbot isn't evil. But I'm two days in and something's off. Not the tool me. How fast I stopped doing things myself.",
    content: `The Dark Side of Clawdbot

Clawdbot isn't evil. Open source, selfhosted, you own your data. It's one of the good ones.

But I'm two days in and something's off. Not the tool me. How fast I stopped doing things myself.

**How it gets you**

You give it your calendar and it catches double bookings. Email and it tells you Dave needs a reply by EOD. Location and it knows there's traffic on 95.

By day eight I'd handed over everything. Didn't decide to. Just happened one "allow" at a time.

People who've been using it longer sound like converts. "It drafted the perfect email before I even asked." "Clawdbot remembered my wife's birthday when I didn't." I get it. I felt it. That relief of not carrying everything in your head.

Then I read this comment I can't stop thinking about: "I don't even think about lunch anymore. It orders at 12:30. My usual. Charges my card. Done."

He thinks that's freedom. I think that's something else.

**The part that worries me**

The AI doesn't stay where you put it. Can't, because the whole deal is you keep giving it more room.

Month one: "Sarah from marketing wants to meet. Your last seven meetings with her were unproductive. Decline?"

Sure.

Month two: "Declined Sarah's meeting. You always find them unproductive."

"...yeah, probably right."

Month three Sarah's just gone from your calendar. Nobody made that call. A pattern got extrapolated and a person vanished from your work life.

Then the nudging. "You skipped the gym four times. You said you felt guilty on the 17th." Or "Pizza twice this week. Salad place with good reviews nearby."

It's right though. You did say that. You do want to eat better. But there's something uncomfortable about a system that won't let you quietly give up on a resolution. Every halfassed promise you made at 11pm on a Tuesday it remembers and holds you to it. Gently. Forever.

That's not what freedom looks like.

**The cost**

Year three. Someone's AI assistant gets pulled and they can't function. Can't remember meetings, can't pick a restaurant, can't manage email. Not because they're dumb because they haven't done any of it in three years.

And relationships. I keep picturing this couples counseling scene:

"You don't remember anything about us."

"That's not true." Checks phone. "Your birthday is June 14th."

"You just looked it up. You didn't know."

Presence takes effort. Memory, attention, caring enough to hold someone's details in your actual brain. We're outsourcing all of it.

And we're optimizing everything without asking what for. To be more productive? Great, better workers. More efficient? No more wandering or mistakes or boredom. Once enough people are doing it you can't opt out without falling behind.

**What I'm doing (probably temporarily)**

I set some rules. No AI on money stuff without my signoff, no creative work. I check in weekly on where my agency's shrinking. One day a week the whole thing goes off.

Sounds great on paper. Probably won't last.

Benefits hit immediately, damage shows up years later. We ran this exact experiment with social media. Everyone saw the warnings. Everyone kept scrolling.

Maybe it's different because it's our actual thinking at stake. Memory, judgment, the ability to just handle your own life.

Doubt it though.

I wrote this entire thing about AI dependence being dangerous while using Claude and Clawdbot to research it. Make of that what you will.

If you're thinking about setting up Clawdbot ask yourself what you're optimizing toward. You won't stop once you start. Two days in, can't picture going back.

Scares me. Not enough to uninstall it though.`,
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

NVIDIA just dropped $2 billion on Synopsys stock - not an acquisition, a strategic partnership. Jensen Huang called it "revolutionizing one of the most compute-intensive industries in the world: design and engineering." The key detail: workloads that took weeks now take hours. NVIDIA isn't just selling GPUs anymore. They're vertically integrating into the entire chip design toolchain. This is infrastructure-level positioning.

Meanwhile, Germany's industrial titans - Siemens, BASF, VW - are pouring billions into AI to avoid becoming an "industrial museum." Virtual factories, robot fleets, smart data centers. Chancellor Merz acknowledged they're in a "neck-and-neck race" with the US and China. Europe's largest economy sees AI adoption as existential, not optional.

Then there's Mark Chen at OpenAI, quietly dropping bombs in an interview. "Scaling is not dead." They have algorithmic breakthroughs enabling continued model scaling. Within a year, AI will handle implementation and debugging while humans control the "outer loop." Within 2.5 years, end-to-end AI research. And the next ChatGPT paradigm? Memory that actually learns about you between sessions.

The throughline is clear: capital is flowing into AI infrastructure at every layer - chip design tools, industrial applications, research acceleration. This isn't speculative positioning. It's smart money betting on a platform shift as fundamental as the internet.

For the millions of Americans with NVIDIA exposure through 401(k)s and pension funds: this isn't just a GPU company anymore. It's becoming the picks-and-shovels play for an intelligence revolution. The question isn't whether to have AI exposure - it's whether your allocation reflects the scale of what's coming.

The crane operator who masters the new machinery doesn't fear the crane.

**Sources:**
- CNBC: Nvidia takes $2 billion stake in Synopsys
- DW: Germany's industrial titans embrace the AI age
- Mark Chen (OpenAI) interview with Ashlee Vance`,
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
