// Mock data for sales calls - MVP purposes only

export interface SalesCall {
  id: string;
  repName: string;
  prospectName: string;
  prospectCompany: string;
  date: string;
  duration: string;
  status: "completed" | "in-progress" | "scheduled";
  transcript: string;
  analysis?: {
    summary: string[];
    score: number;
    coachingNote: string;
  };
}

export const mockCalls: SalesCall[] = [
  {
    id: "1",
    repName: "Sarah Chen",
    prospectName: "Michael Roberts",
    prospectCompany: "TechFlow Inc",
    date: "2024-12-22T14:30:00Z",
    duration: "18:45",
    status: "completed",
    transcript: `Rep: Hi Michael, this is Sarah from SalesForce Solutions. How are you doing today?

Prospect: Hey Sarah, I'm doing well thanks. Pretty busy week but good overall.

Rep: I appreciate you taking the time. I know you're busy. I wanted to reach out because I saw on LinkedIn that TechFlow just raised Series B funding - congrats on that! I'm curious, with that growth, what are your biggest challenges around managing your sales team right now?

Prospect: Thanks! Yeah it's exciting times. Honestly, our biggest issue is scaling our coaching. We went from 10 reps to 40 in six months and our managers are completely underwater trying to review calls and provide feedback.

Rep: That's a common pain point at your stage. When you say underwater, what does that look like day-to-day for your managers?

Prospect: Well, they're supposed to review at least 3 calls per rep per week, but they're lucky if they get through one. And when they do, the feedback is pretty generic. They just don't have time to do deep analysis.

Rep: Got it. And what impact is that having on your team's performance?

Prospect: Our conversion rates have been slipping. We're seeing inconsistency across reps - some are crushing it, others are struggling, and we can't figure out why fast enough.

Rep: That must be frustrating, especially after raising capital with specific growth targets. Have you looked at any solutions for this?

Prospect: We tried recording everything with Gong, but that's just more data to sift through. Our managers still don't have time. What exactly does your platform do differently?`,
    analysis: {
      summary: [
        "Strong opening with personalized research (mentioned Series B funding)",
        "Excellent discovery - uncovered pain around scaling coaching from 10 to 40 reps",
        "Good follow-up questions to quantify impact (conversion rates slipping, inconsistent performance)"
      ],
      score: 87,
      coachingNote: "Great discovery phase! One improvement: After Michael mentioned Gong isn't solving the problem, you could have asked 'What would the ideal solution look like?' before pitching. This would have given you even more ammunition for your demo. Overall excellent call though!"
    }
  },
  {
    id: "2",
    repName: "Marcus Williams",
    prospectName: "Jennifer Patel",
    prospectCompany: "CloudScale Systems",
    date: "2024-12-22T10:15:00Z",
    duration: "22:30",
    status: "completed",
    transcript: `Rep: Hi Jennifer, Marcus here from DataDrive Analytics. Thanks for taking my call.

Prospect: Sure, I have about 15 minutes. What's this about?

Rep: I wanted to talk to you about our new data analytics platform. We've helped companies like yours increase their data processing speed by up to 300%. 

Prospect: Okay... we already use Snowflake though.

Rep: Right, but our solution is different because we use AI and machine learning to optimize queries automatically. Plus we're 40% cheaper than Snowflake.

Prospect: I'm not really looking to switch right now. We just migrated to Snowflake six months ago.

Rep: I understand, but have you considered the cost savings? Over a year, you could save hundreds of thousands of dollars.

Prospect: Maybe, but switching costs would be high too. And our team just got trained on Snowflake.

Rep: What if I could get you a free trial for 30 days? No commitment, just see how it works.

Prospect: I appreciate it, but I don't have time to evaluate new tools right now. We're in the middle of our year-end push.

Rep: Could I send over some case studies at least? Just so you have them for future reference?

Prospect: Sure, you can email those over. But I really need to jump to another meeting.

Rep: Understood. I'll follow up in the new year. Thanks Jennifer!`,
  },
  {
    id: "3",
    repName: "Sarah Chen",
    prospectName: "David Kumar",
    prospectCompany: "RetailNext",
    date: "2024-12-21T15:00:00Z",
    duration: "16:20",
    status: "completed",
    transcript: `Rep: Hi David, Sarah Chen from SalesForce Solutions calling. How's your day going?

Prospect: Busy as usual! What can I do for you Sarah?

Rep: I'll keep this brief. I saw RetailNext is expanding into the European market next quarter. That's exciting! I'm wondering - as you scale your sales team internationally, how are you thinking about maintaining quality coaching across time zones?

Prospect: You did your homework! Yeah, that's actually been a topic in our leadership meetings. We're hiring 15 reps in London and 10 in Berlin, but our sales managers are all US-based.

Rep: And how are you planning to handle the coaching gap? Different time zones make live call reviews pretty challenging.

Prospect: Honestly, we haven't figured it out yet. We're thinking about hiring regional managers, but that's expensive and we'd need to train them first on our methodology.

Rep: Right, and even then you'd want consistency in coaching standards across regions. What if you could get AI-powered call analysis that works 24/7, gives you consistent coaching feedback based on your methodology, and flags the calls that need human manager review?

Prospect: That could be interesting. How does it learn our methodology though? Every sales org is different.

Rep: Great question. We have two approaches. First, you can feed it examples of your best calls and it learns patterns. Second, you can explicitly define your scoring criteria - like if you care about certain discovery questions or specific objection handling techniques.

Prospect: And what's the false positive rate? I don't want my reps getting robo-feedback that's off-base.

Rep: Smart concern. We're seeing about 93% accuracy, and more importantly, managers can review and approve feedback before it goes to reps, or use it as their starting point for their own review. Think of it as a 10x multiplier on manager productivity, not a replacement.

Prospect: Okay, now you have my attention. What does implementation look like?`,
    analysis: {
      summary: [
        "Exceptional opening with timely, specific research about European expansion",
        "Uncovered real business problem: scaling coaching across time zones with 25 new international reps",
        "Handled objection expertly with specific data (93% accuracy) and positioning as manager multiplier"
      ],
      score: 94,
      coachingNote: "Outstanding call! You've mastered the art of research-based discovery and earned the right to present by uncovering urgent needs. The way you preemptively addressed the 'methodology customization' concern shows you understand buyer psychology. Keep this up!"
    }
  },
  {
    id: "4",
    repName: "Alex Thompson",
    prospectName: "Lisa Morrison",
    prospectCompany: "FinTech Solutions",
    date: "2024-12-21T11:30:00Z",
    duration: "14:55",
    status: "completed",
    transcript: `Rep: Good morning Lisa, Alex from CloudComm here. Do you have a few minutes?

Prospect: I have about 10 minutes before my next meeting.

Rep: Perfect. I wanted to discuss our cloud communication platform. Are you the right person to talk to about your phone systems?

Prospect: We use Microsoft Teams for that. It works fine for us.

Rep: I see. Well, our platform integrates with Teams but adds advanced analytics and call routing AI.

Prospect: We're pretty happy with Teams as is. What's your pricing like?

Rep: It starts at $25 per user per month, but we can negotiate for larger deployments. How many users do you have?

Prospect: About 200. But like I said, we're not really in the market right now.

Rep: I understand. What if I could offer you a 20% discount if you commit today?

Prospect: Today? No, I'd need to see a demo, talk to our IT team, get budget approval... That's months away even if we were interested.

Rep: Right, of course. Could we schedule a demo for next week then?

Prospect: Let me check with our IT director first and I'll get back to you if there's interest.

Rep: Sounds good. I'll email you our brochure. Thanks for your time Lisa!`,
  },
  {
    id: "5",
    repName: "Marcus Williams",
    prospectName: "Tom Anderson",
    prospectCompany: "Enterprise Logistics Co",
    date: "2024-12-20T16:45:00Z",
    duration: "25:10",
    status: "completed",
    transcript: `Rep: Hi Tom, this is Marcus Williams from DataDrive Analytics. I appreciate you taking my call.

Prospect: No problem Marcus. What's on your mind?

Rep: I've been following Enterprise Logistics in the news - saw you just acquired Regional Transport Systems. That's a big move. I imagine integrating their data with yours is top of mind?

Prospect: It is actually. We're trying to unify data from three different TMS systems now. It's a nightmare.

Rep: I bet. When you say nightmare, what's the biggest headache you're dealing with?

Prospect: Honestly? We can't get a single view of our capacity utilization. Each system reports differently, different metrics, different time stamps. Our ops team is basically doing manual reconciliation in spreadsheets.

Rep: Wow. And how is that impacting your business right now?

Prospect: We're leaving money on the table. We probably have empty trucks running routes while other divisions are paying for spot market capacity. But we can't see it in real-time because the data's fragmented.

Rep: That's got to be painful, especially with fuel costs where they are. Have you quantified what this inefficiency might be costing you?

Prospect: Our CFO estimates we're wasting about 2 million a month in excess capacity costs. Hence why I'm talking to vendors like you.

Rep: Makes sense. What have you looked at so far?

Prospect: We talked to Tableau and Power BI, but they're just visualization layers. They don't solve the underlying data integration problem. We'd still need to build all the ETL pipelines ourselves.

Rep: Right, and that's time and engineering resources you probably don't have dedicated to this project. What's your timeline to get this solved?

Prospect: Ideally within the quarter. The board is watching our post-acquisition synergies closely.`,
    analysis: {
      summary: [
        "Excellent research-based opener about recent acquisition",
        "Strong discovery uncovering $2M/month inefficiency with good quantifying questions",
        "Effective competitive intelligence gathering (already looked at Tableau and Power BI)"
      ],
      score: 91,
      coachingNote: "Fantastic discovery! You're asking all the right questions and uncovering both pain and urgency. Next step: Before jumping to your solution, ask 'If you could wave a magic wand, what would the perfect solution look like?' This will help you tailor your pitch perfectly. Great work!"
    }
  },
  {
    id: "6",
    repName: "Sarah Chen",
    prospectName: "Rachel Foster",
    prospectCompany: "HealthTech Innovations",
    date: "2024-12-20T13:20:00Z",
    duration: "19:35",
    status: "completed",
    transcript: `Rep: Hi Rachel, this is Sarah Chen from SalesForce Solutions. Thanks for accepting my LinkedIn invitation last week!

Prospect: Of course! I saw you work with other healthcare companies, so I was curious.

Rep: Absolutely, and I noticed HealthTech just got HIPAA compliance certified - that must have been a journey! I'm curious, now that you're compliant and can work with larger health systems, what's your growth plan looking like?

Prospect: Thanks! Yeah it took us 18 months but we finally got there. We're targeting enterprise hospitals now instead of just clinics. Our sales team is going to need to level up fast though.

Rep: When you say level up, what specifically needs to change?

Prospect: Well, selling to a hospital system is completely different than selling to a small clinic. The sales cycles are longer, more stakeholders, bigger deals. Our reps are used to quick wins. Now they need to be much more consultative.

Rep: And how are you planning to train them on this new approach?

Prospect: We brought in a sales consultant to do a 2-day workshop next month. But honestly, I'm worried that won't be enough. They need ongoing coaching, not just a one-time training.

Rep: That's a really good point. What happens after the workshop when they're in the field and need guidance on a specific deal or call?

Prospect: Exactly! Our VP of Sales tries to help but she's only one person for 20 reps. She can't be on every call or review every recording.

Rep: Right. And with these longer enterprise cycles, you probably can't afford to let reps figure it out through trial and error over 6 months. Each deal is too valuable.

Prospect: Exactly. We need to compress their learning curve somehow. Is that what your platform does?`,
    analysis: {
      summary: [
        "Personalized opener referencing LinkedIn connection and HIPAA certification",
        "Identified critical timing: company transitioning from SMB to enterprise sales",
        "Uncovered constraint: 1 VP trying to coach 20 reps through complex new sales motion"
      ],
      score: 89,
      coachingNote: "Strong call with excellent discovery and timing! You identified a company in transition, which creates urgency. One tip: When Rachel said 'Is that what your platform does?' - that's a buying signal. You could have said 'Let me ask you one more question first - if you could solve this coaching gap, what would that be worth to you in terms of deal velocity or win rate?' Get them to sell themselves even more before pitching."
    }
  },
  {
    id: "7",
    repName: "Alex Thompson",
    prospectName: "James Park",
    prospectCompany: "SaaS Startup Inc",
    date: "2024-12-19T10:00:00Z",
    duration: "12:40",
    status: "completed",
    transcript: `Rep: Hey James, Alex Thompson from CloudComm. How are you?

Prospect: I'm good, what's this about?

Rep: I wanted to tell you about our cloud phone system. We have great features like call recording, voicemail transcription, and mobile apps.

Prospect: We already have a phone system.

Rep: What are you using now?

Prospect: RingCentral. It does everything we need.

Rep: Interesting. Are you happy with your pricing?

Prospect: It's fine.

Rep: What if I told you we could save you 30% on your monthly bill?

Prospect: I'd say we just signed a 3-year contract with them last month.

Rep: Oh. Well, when that's up, maybe we could be an option?

Prospect: Maybe. Can you just email me your info?

Rep: Sure. Do you want to schedule a quick demo for when your contract is closer to renewal?

Prospect: Just send the email and I'll reach out if we're interested later.

Rep: Okay, will do. Thanks James.`,
  },
  {
    id: "8",
    repName: "Marcus Williams",
    prospectName: "Patricia Hughes",
    prospectCompany: "Global Manufacturing Ltd",
    date: "2024-12-19T14:45:00Z",
    duration: "21:15",
    status: "completed",
    transcript: `Rep: Good afternoon Patricia, Marcus Williams from DataDrive Analytics. I appreciate you taking my call.

Prospect: Sure Marcus, I have about 20 minutes. What can I help you with?

Rep: I'll make good use of your time. I saw Global Manufacturing announced plans to open three new facilities in Southeast Asia. That's a significant expansion. I'm curious - as you scale operations internationally, how are you thinking about maintaining data visibility across all your plants?

Prospect: That's actually keeping me up at night! We already struggle with data consistency across our five US facilities. Adding three more in different countries with different regulations is going to be complex.

Rep: When you say struggle with data consistency, what does that look like operationally?

Prospect: Each plant manager has their own way of reporting production metrics, downtime, quality issues. We try to standardize it, but by the time data gets rolled up to corporate, we're making decisions on information that's days old and formatted differently.

Rep: And what impact does that have on your decision-making?

Prospect: Huge. Last quarter we missed our production targets because we didn't catch a quality issue at our Ohio plant until it had been going on for two weeks. By the time we knew about it, we had already shipped defective parts to customers.

Rep: That's costly on multiple levels - the rework, the customer relationships, the brand impact. Have you calculated what that specific issue cost you?

Prospect: The Ohio situation? About $800,000 in direct costs, plus we nearly lost a major automotive customer. It was a wake-up call that we need better real-time visibility.

Rep: I imagine with the Southeast Asia expansion, the stakes get even higher with time zones and language barriers. What's your deadline to get this sorted out?

Prospect: We break ground on the first facility in Vietnam in March, so we need a solution in place before then. Otherwise we're just going to multiply our current problems by three.

Rep: Makes sense. What solutions have you evaluated so far?`,
    analysis: {
      summary: [
        "Excellent opener tying to recent expansion announcement",
        "Uncovered critical $800K quality issue and at-risk major customer",
        "Identified clear deadline (March) and urgency around international expansion"
      ],
      score: 92,
      coachingNote: "Exceptional discovery work! You uncovered a quantified pain point ($800K loss), business impact (nearly lost major customer), and clear timeline (March deadline). Your questioning flow was logical and built momentum. One enhancement: After Patricia mentioned the March deadline, you could add 'And what happens if you don't have this solved by March?' to increase urgency even more. Excellent call overall!"
    }
  },
  {
    id: "9",
    repName: "Sarah Chen",
    prospectName: "Kevin Martinez",
    prospectCompany: "InsureTech Pro",
    date: "2024-12-18T11:30:00Z",
    duration: "17:50",
    status: "completed",
    transcript: `Rep: Hi Kevin, Sarah Chen from SalesForce Solutions. How's your morning going?

Prospect: Pretty good, thanks. What's this regarding?

Rep: I wanted to reach out because I noticed InsureTech Pro is hiring a lot of sales reps - looks like you've posted for 8 positions in the last month. That's exciting growth! As you scale the team that fast, what's your strategy for getting new reps productive quickly?

Prospect: Yeah, we're growing fast. Honestly, our strategy is basically throw them in the deep end and see who swims. It's not ideal.

Rep: What does that look like practically? How long does it take for a new rep to ramp up currently?

Prospect: We give them a week of product training, then they start making calls. But it takes about 3-4 months before they're consistently hitting quota. Some never get there and we have to let them go.

Rep: That's got to be expensive - recruiting costs, training time, lost opportunity costs. What's your current attrition rate in the first six months?

Prospect: About 40%. It's killing us. We hire 10 people and only 6 are still here six months later.

Rep: Wow. Have you identified what separates the ones who make it from those who don't?

Prospect: The successful ones figure out how to handle objections and build rapport quickly. The ones who struggle just keep pitching features and wonder why no one buys. But we don't have a good way to coach them through that.

Rep: How many sales managers do you have for the team?

Prospect: Three managers for 30 reps. So 1:10 ratio. They try to listen to calls and give feedback but they're overwhelmed.

Rep: Right, and with 8 new reps coming in, that ratio is going to get worse. Have you looked at any tools to help scale your coaching?

Prospect: We use Zoom for recordings, but that doesn't help with the analysis part. Our managers still have to manually review everything.`,
  },
  {
    id: "10",
    repName: "Alex Thompson",
    prospectName: "Diana Lewis",
    prospectCompany: "MarketingPro Agency",
    date: "2024-12-18T15:15:00Z",
    duration: "13:25",
    status: "completed",
    transcript: `Rep: Hi Diana, Alex from CloudComm here. I wanted to talk to you about upgrading your phone system.

Prospect: We don't really have any issues with our current system.

Rep: That's great! But did you know our system has AI-powered call routing?

Prospect: What does that mean?

Rep: It uses artificial intelligence to route calls to the right person automatically.

Prospect: Don't most modern phone systems do that already?

Rep: Well, ours is more advanced. Plus we have analytics dashboards.

Prospect: We don't really look at call analytics. We're a small agency, we just need phones that work.

Rep: I understand, but what if you could increase your team's efficiency by 20%?

Prospect: How would a phone system do that?

Rep: Through better call routing and reduced missed calls.

Prospect: We don't really miss calls. They go to voicemail if we're busy and we call back.

Rep: Right, but wouldn't it be better if calls never went to voicemail?

Prospect: Not really - sometimes we need focused work time. Look, I appreciate the call but we're really not interested right now.

Rep: Could I at least send you some information for future reference?

Prospect: Sure, you can email it. Thanks.`,
  }
];

export async function getCalls(): Promise<SalesCall[]> {
  // Import uploaded calls
  try {
    const { getUploadedCalls } = await import("@/app/actions/add-call");
    const uploadedCalls = await getUploadedCalls();
    
    // Convert uploaded calls to SalesCall format
    const uploadedCallsArray: SalesCall[] = Array.from(uploadedCalls.entries()).map(([id, data]) => ({
      id,
      repName: data.repName,
      prospectName: data.prospectName,
      prospectCompany: data.prospectCompany,
      date: data.date,
      duration: data.duration,
      status: "completed" as const,
      transcript: data.transcript,
      analysis: data.analysis,
    }));

    // Combine with mock calls, newest first
    return [...uploadedCallsArray, ...mockCalls].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error loading uploaded calls:", error);
    return mockCalls;
  }
}

export async function getCallById(id: string): Promise<SalesCall | undefined> {
  // Check uploaded calls first
  if (id.startsWith("uploaded-")) {
    try {
      const { getUploadedCallById } = await import("@/app/actions/add-call");
      const uploadedCall = await getUploadedCallById(id);
      
      if (uploadedCall) {
        return {
          id,
          repName: uploadedCall.repName,
          prospectName: uploadedCall.prospectName,
          prospectCompany: uploadedCall.prospectCompany,
          date: uploadedCall.date,
          duration: uploadedCall.duration,
          status: "completed" as const,
          transcript: uploadedCall.transcript,
          analysis: uploadedCall.analysis,
        };
      }
    } catch (error) {
      console.error("Error loading uploaded call:", error);
    }
  }
  
  // Fall back to mock calls
  return mockCalls.find(call => call.id === id);
}

export async function getTeamStats() {
  // Get all calls including uploaded ones
  const allCalls = await getCalls();
  const analyzedCalls = allCalls.filter(c => c.analysis);
  
  const totalCalls = allCalls.length;
  const avgScore = analyzedCalls.length > 0 
    ? Math.round(analyzedCalls.reduce((sum, c) => sum + (c.analysis?.score || 0), 0) / analyzedCalls.length)
    : 0;
  
  // Get rep performance - only include reps with analyzed calls
  const repScores = new Map<string, number[]>();
  analyzedCalls.forEach(call => {
    if (!repScores.has(call.repName)) {
      repScores.set(call.repName, []);
    }
    repScores.get(call.repName)?.push(call.analysis?.score || 0);
  });

  const repPerformance = Array.from(repScores.entries()).map(([name, scores]) => ({
    name,
    avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    callCount: scores.length
  })).sort((a, b) => b.avgScore - a.avgScore);

  const topPerformer = repPerformance[0]?.name || "N/A";
  
  // Get calls this week
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000));
  const callsThisWeek = allCalls.filter(c => new Date(c.date) > threeDaysAgo).length;

  return {
    totalCalls,
    avgScore,
    topPerformer,
    callsThisWeek,
    repPerformance
  };
}

export function getRecentCalls(limit: number = 5): SalesCall[] {
  return [...mockCalls]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

