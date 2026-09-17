# Roam — Product Roadmap

Roam is an AI travel agent that operates as the backoffice for travel agencies today, expands into corporate travel management for companies, and ultimately becomes the travel infrastructure layer that any AI agent can call through MCP.

---

## Agency Mode

### The Problem

There are over 60,000 travel agencies in India, and the vast majority of them run their entire business through personal WhatsApp. A customer messages asking about a Goa trip at 10 PM — nobody responds until the next morning, and by then the lead has booked on MakeMyTrip. When an agent does respond, they spend 45 to 90 minutes manually drafting an itinerary in a Google Doc or WhatsApp message. Every lead, quote, conversation, and payment lives scattered across individual WhatsApp threads. There is no CRM, no pipeline, no analytics. Most agencies have no idea what their conversion rate is or how much revenue they made last month.

The tools that exist — Trevion CRM, TeleCRM — are either not travel-specific or have no AI capabilities. Nobody combines an AI agent that can handle WhatsApp inquiries with an agency backoffice that manages the pipeline end to end.

### What Roam Does

Roam gives travel agencies an AI employee that handles WhatsApp and iMessage inquiries 24/7, qualifies leads through natural conversation, and generates complete itineraries using real data from the web. Behind the scenes, it provides a backoffice dashboard where the agency owner sees every conversation, every lead, and every booking in one place.

### How It Works

When a customer messages the agency's WhatsApp number, Photon Spectrum routes the message to Roam's backend. A Mastra-powered Inquiry Agent picks up the conversation, speaking in the agency's brand voice — their name, their greeting, their tone. The agent extracts key details through natural conversation: where do you want to go, how many people, what dates, what's your budget.

Once the lead is qualified, the Itinerary Builder Agent takes over. Instead of calling travel APIs (which require expensive contracts and have poor coverage for Indian suppliers), Roam uses Browserbase with Stagehand to browse real travel websites — Google, Booking.com, TripAdvisor, MakeMyTrip, OYO. The agent researches hotels, activities, transport options, and assembles a day-by-day itinerary with real prices. The agency's configured markup percentage is applied automatically. The itinerary is sent back to the customer on WhatsApp within 60 seconds.

If the AI detects the customer is ready to book, frustrated, or has a request too complex to handle, it flags the conversation for human handoff. The agency owner gets notified and can take over the conversation from the backoffice dashboard with one click.

### The Backoffice

The agency dashboard is where the agency owner runs their business. It has:

- A conversation view showing every WhatsApp and iMessage thread, with clear indicators of which conversations are being handled by the AI and which have been taken over by a human agent.
- A lead view showing every qualified inquiry with extracted details — destination, dates, group size, budget, preferences — and a status that moves from New to Qualified to Quoted to Booked to Completed.
- An itinerary view where generated itineraries can be reviewed, edited, regenerated, and shared with customers via a link.
- A settings page where the agency configures their brand voice, default greeting, frequently asked questions, markup percentage, and WhatsApp connection.

In Phase 2 (Month 3-5), the backoffice expands to include a Kanban pipeline for drag-and-drop lead management, a payment tracker for recording installments and calculating margins per booking, PDF itinerary export with the agency's branding, shareable customer-facing trip pages, basic analytics showing conversion rates and revenue trends, and multi-user support for agencies with 2-5 team members.

### Technical Architecture

The API runs on Hono with Bun. Mastra provides the agent framework — the existing weather agent pattern (agent, tools, workflows, memory) maps directly to the Inquiry Agent and Itinerary Builder Agent. Browserbase with Stagehand handles all travel website interactions. Photon Spectrum SDK provides the unified messaging layer for WhatsApp and iMessage from a single codebase. The dashboard is the existing Next.js 16 app, rebuilt with agency backoffice pages. Data lives in LibSQL/Turso, which is already configured in the Mastra setup. Auth uses Clerk, already integrated.

The Browserbase approach is a deliberate choice. Travel APIs like Amadeus and Duffel require weeks of integration, contracts, and certification. They have poor coverage for Indian-specific suppliers like IRCTC, RedBus, and OYO. Browserbase lets Roam point an agent at any travel website in the world and extract structured data in minutes instead of weeks. The trade-off is speed — browser sessions take 5-15 seconds compared to sub-second API calls — but for travel search, this is acceptable. Users expect travel searches to take time. If speed becomes a bottleneck at scale, Duffel can be layered in as a fast path for flights while Browserbase remains the fallback for everything else.

### Revenue

| Plan | Price | Includes |
|:---|:---|:---|
| Starter | 1,999 INR/month | 500 AI conversations, 1 WhatsApp number, itinerary builder |
| Growth | 4,999 INR/month | 2,000 conversations, flight and hotel search, PDF export, analytics |
| Pro | 9,999 INR/month | Unlimited conversations, custom AI training, multi-user, priority support |

### Build Timeline

| Week | What Gets Built |
|:---|:---|
| 1-2 | Inquiry Agent and Itinerary Builder Agent in Mastra. Browserbase travel search tool. Test end-to-end in terminal. |
| 2-3 | Photon Spectrum integration. Webhook handler in Hono. WhatsApp sandbox testing. End-to-end: WhatsApp message in, AI response out. |
| 3-5 | Dashboard pages: conversations, leads, settings. Wire to API. |
| 5-6 | Deploy. Connect 3-5 pilot agencies. Monitor, fix, iterate. |

### What Not to Build Yet

Do not build a CRM Kanban pipeline, payment gateway integration, PDF export, mobile app, email channel, or multi-user team management in Phase 1. Agencies run on WhatsApp. A responsive web dashboard with conversations, leads, and settings is enough to validate. Everything else is Phase 2.

### Database Schema

```sql
agencies (id, name, logo_url, whatsapp_number, ai_greeting, ai_tone, ai_faqs, default_markup_pct, created_at)

agency_members (id, agency_id, clerk_user_id, role, created_at)

customers (id, agency_id, name, phone, email, source, created_at)

leads (id, agency_id, customer_id, destination, travel_dates, pax, budget, preferences, status, assigned_to, created_at)

itineraries (id, lead_id, agency_id, destination, days, content_json, base_cost, markup_pct, quoted_price, share_slug, created_at)

conversations (id, agency_id, customer_id, lead_id, channel, status, created_at, last_message_at)

messages (id, conversation_id, sender, content, media_url, created_at)
```

### Success Metrics

| Metric | Target by Week 6 |
|:---|:---|
| Pilot agencies connected | 3-5 |
| AI conversations handled | 100+ |
| Average response time | Under 20 seconds |
| Itinerary quality rating from agencies | Above 7 out of 10 |

| Metric | Target by Month 5 |
|:---|:---|
| Paying agencies | 10+ |
| Monthly recurring revenue | 30,000-50,000 INR |
| Monthly churn | Under 10% |
| Itineraries generated per month | 500+ |

---

## Company Mode

### The Problem

Companies with 20 to 500 employees spend significant money on travel every year, but the process is broken. An employee needs to fly to Bangalore for a client meeting. They email the admin, or message on Slack, or just book on MakeMyTrip and file an expense later. There is no travel policy enforcement. There is no visibility into spend. There is no approval workflow. The admin spends hours reconciling receipts against bank statements. Finance has no idea how much the company spent on travel last quarter, let alone which department overspent.

The tools that exist — Navan, Perk (formerly TravelPerk), SAP Concur — are designed for enterprises with 500+ employees and come with enterprise pricing. SMBs with 20 to 500 employees are massively underserved. They need something that works in Slack, enforces basic rules, and gives finance a dashboard. They do not need a six-month implementation with a dedicated account manager.

### What Roam Does

Roam gives companies an AI travel assistant that lives in Slack. An employee types "Book me a flight to Bangalore next Tuesday under 8,000 rupees" and Roam handles the rest — searches for flights, checks against the company's travel policy, routes for approval if needed, and books the ticket. The booking automatically creates an expense entry. Finance gets a dashboard showing total spend, per-department breakdowns, and policy compliance.

### How It Works

This reuses 80% of what was built in Agency Mode. The Browserbase travel search tools, Mastra agent framework, and conversation memory all carry forward. What is new:

A Policy Agent that stores and enforces company travel rules — maximum flight price, maximum hotel price per night, approved airlines, which bookings need manager approval. When an employee requests travel, the Policy Agent checks the request against the rules. If it is within policy, the Travel Agent searches for options via Browserbase and presents them in Slack. If it exceeds policy, the request is routed to the employee's manager via Slack DM for approval.

A Booking Agent that can complete the actual purchase on a travel website through Browserbase. This is the hardest technical challenge — navigating a checkout flow, entering passenger details, handling payment. This is where Stagehand's semantic navigation becomes critical.

An Expense Tracker that automatically creates an expense entry for every booking with amount, category, and receipt. This integrates into a company dashboard where the finance team sees total travel spend, per-employee and per-department breakdowns, and policy compliance rates.

Slack integration comes through Photon Spectrum — the same SDK used for WhatsApp and iMessage, just with a different channel provider.

### Revenue

| Plan | Price |
|:---|:---|
| Starter | 5 USD per employee per month, minimum 20 employees |
| Business | 10 USD per employee per month |
| Enterprise | 15 USD per employee per month |

### Build Timeline

Month 6 through 9. The breakdown:

- Month 6-7: Policy engine. Slack bot via Photon Spectrum. Travel search agent adapted for company context (policy-aware). Approval workflow.
- Month 7-8: Booking agent — the ability to actually complete a purchase on a travel website through Browserbase. Expense auto-filing.
- Month 8-9: Company dashboard. Deploy. Connect 5-10 pilot companies. Iterate.

### Success Metrics

| Metric | Target by Month 9 |
|:---|:---|
| Company pilots | 5-10 |
| Flights searched per month | 500+ |
| Booking success rate via Browserbase | Above 80% |
| Combined MRR (agency + company) | 200,000+ INR |

---

## MCP — Travel Infrastructure for AI Agents

### The Vision

Every major AI assistant today — Claude, Gemini, GPT, and thousands of custom agents — can talk about travel but cannot do anything about it. A user asks "book me a flight to Tokyo" and the AI responds with suggestions and links. The user still has to go book it themselves. This is because there is no standard, reliable infrastructure for AI agents to search, compare, and book travel.

Roam's MCP server changes this. By Month 10, Roam will have a working travel search and booking engine powered by Browserbase, battle-tested across hundreds of agency and company interactions. The MCP layer wraps this engine in the Model Context Protocol standard, making it callable by any AI agent.

### What the MCP Server Exposes

| Tool | What It Does |
|:---|:---|
| `roam/search_flights` | Search flights by route, dates, and budget constraints |
| `roam/search_hotels` | Search hotels by location, dates, and budget constraints |
| `roam/build_itinerary` | Generate a complete multi-day trip itinerary |
| `roam/book` | Book a specific flight or hotel |
| `roam/check_policy` | Validate a booking against a company's travel policy |
| `roam/get_trip` | Retrieve details of a booked trip |
| `roam/cancel` | Cancel a booking |

### Why This Becomes the Moat

Each layer of Roam feeds the next. Agency Mode forces the creation of reliable Browserbase tools for travel search and itinerary generation. Company Mode forces the creation of a booking engine and policy infrastructure. The MCP layer packages all of this into a standard protocol.

Every AI agent that integrates Roam's MCP becomes a distribution channel that Roam did not have to build or pay for. The more agents use it, the more booking data flows through Roam, which improves search quality and pricing intelligence, which attracts more agents. This is the network effect.

### Revenue

| Tier | Price |
|:---|:---|
| Free | 100 search calls per month, no booking |
| Developer | 49 USD per month — 10,000 searches, 100 bookings |
| Business | 299 USD per month — 100,000 searches, unlimited bookings |
| Enterprise | Custom volume pricing |

Transaction fees on top: 2-5 USD per flight booking, 1-3 USD per hotel night.

### Build Timeline

Month 10 through 14. The MCP server is a thin layer over infrastructure that already exists by this point. The work is packaging it — auth, rate limiting, billing, documentation, and developer experience.

### Success Metrics

| Metric | Target by Month 14 |
|:---|:---|
| AI applications integrated | 5+ |
| API calls per month | 10,000+ |
| Annual recurring revenue | 2,000,000+ INR |
