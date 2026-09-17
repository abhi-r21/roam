# Roam — Agency Mode: Core Build Plan

A tightened, high-impact implementation blueprint for Roam Agency Mode. Based on real agency feedback, the product is stripped of secondary bloat and hyper-focused on the three core operational bottlenecks travel agencies face every day:

1. **Leads** — Omnichannel lead capture, AI qualification, package matching, and CRM pipeline with human takeover.
2. **Agency-Styled Itinerary Builder** — Generating day-by-day itineraries styled and formatted strictly to the agency's custom configuration in Roam.
3. **Agency Ops & Bookings Automation** — Automatically extracting all required bookings (hotels, cabs, flights, activities), tracking booking status, supplier dispatch, and fulfillment vouchers.

---

## The 3 Core Pillars

```
+-----------------------------------------------------------------------------------+
|                                  ROAM AGENCY MODE                                 |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [1. LEADS ENGINE]                                                                |
|  WhatsApp / iMessage / Instagram Inquiries                                        |
|         |                                                                         |
|         v                                                                         |
|  Mastra Inquiry Agent (Qualifies dates, pax, budget, vibe or matches package)    |
|         |                                                                         |
|         v                                                                         |
|  Agency CRM Pipeline (New -> Qualified -> Quoted -> Confirmed) + Human Takeover  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|  [2. AGENCY-STYLED ITINERARY BUILDER]                                             |
|                                                                                   |
|  Agency Style Config in Roam:                                                     |
|  - Branding, logo, contact, tagline                                               |
|  - Layout template (Morning/Afternoon/Evening, highlights, inclusions/exclusions)  |
|  - Tone of voice & markup %                                                       |
|         |                                                                         |
|         v                                                                         |
|  Browserbase + Mastra Research (Live hotel, activity & transport pricing)        |
|         |                                                                         |
|         v                                                                         |
|  Output: Formatted WhatsApp Itinerary + Branded Web Link (roam.travel/t/[slug])   |
|                                                                                   |
+-----------------------------------------------------------------------------------+
                                          |
                     Customer Approves / Pays Advance
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|  [3. AGENCY OPS & BOOKINGS AUTOMATION]                                            |
|                                                                                   |
|  Auto-Generated "Bookings Needed" Checklist:                                      |
|  - Hotels: Room types, check-in/out, nights, supplier rates                       |
|  - Transport: Cabs, transfers, trains, flights                                    |
|  - Activities & Guides: Slot bookings, ticket counts                              |
|         |                                                                         |
|         v                                                                         |
|  Ops Hub: To Book -> In Progress -> Confirmed -> Voucher Issued                   |
|  Auto-draft supplier messages / WhatsApp booking pings                            |
|  One-click customer voucher & confirmation generation                             |
+-----------------------------------------------------------------------------------+
```

---

## Pillar 1: Leads Engine (Capture, AI Qualification & CRM)

Agencies waste hours answering repetitive inquiries on WhatsApp and Instagram, asking the same questions over and over ("When are you planning?", "How many people?", "What is your budget?").

### 1.1 Multi-Channel Ingestion
- **WhatsApp & iMessage** powered by **Photon.codes Spectrum SDK**.
- Messages route to a unified Hono webhook endpoint `/api/messaging/webhook`.
- Incoming contact is resolved: existing customer record retrieved or a new contact created.
- Thread history is loaded into **Mastra Memory** to ensure context awareness across multiple days.

### 1.2 AI Qualification & Package Matching
The **Inquiry Agent** (Mastra):
- **Adopts the Agency Persona:** Uses the agency's configured greeting, tone, and brand identity.
- **Natural Extraction:** Conversations extract:
  - Destination(s)
  - Travel dates or month/season
  - Number of travelers (Adults, Children)
  - Budget preference (Budget, Moderate, Luxury)
  - Travel style (Relaxed, Adventure, Honeymoon, Family, Cultural)
- **Package Matching:** The agent checks the agency's catalog of pre-built packages and fixed-departure group trips. If the customer inquiry matches an active package (e.g. "Got anything for Ladakh in July?"), the agent instantly pitches the package, shares key highlights, dates, and pricing.
- **Auto-Lead Creation:** When minimum qualification data is gathered (Destination + Dates + Pax), a structured Lead is created/updated in the CRM automatically.

### 1.3 CRM Pipeline & Human Takeover
- **Kanban Stages:** `New` -> `Qualified` -> `Quoted` -> `Confirmed` -> `Traveling` -> `Completed` -> `Lost`.
- **Human Handoff:**
  - If a customer asks for a human, expresses frustration, or has an intricate custom multi-country route, the AI toggles status to `human_handling` and raises an alert.
  - The agency owner can review the live chat from the Roam dashboard (`/conversations/[id]`), type a response directly, or click **"Take Over"**.
  - When resolved, the agent can click **"Hand Back to AI"**.

---

## Pillar 2: Building Itinerary as per Agency Style

Travel agencies have distinct proposal styles. Some use clean bullet points, others use narrative storytelling; some highlight morning/afternoon/evening breakdowns, while others focus on resort stays and inclusions. If an AI generates generic output, agencies will reject it. Roam solves this by making the styling fully configurable in the agency backoffice.

### 2.1 Agency Style Configuration (In Roam Settings)
The agency configures their signature itinerary format under `/settings/itinerary-style`:
- **Branding Assets:** Agency name, logo URL, contact numbers, official website, WhatsApp handle.
- **Layout Structure:**
  - Day breakdown style: `Day-by-Day (Morning / Afternoon / Evening)` vs `Narrative Summary` vs `Activity Highlights`.
  - Inclusions & Exclusions boilerplate (standard items included/excluded in their packages).
  - Important notes & cancellation policy presets.
- **Tone & Voice:**
  - Preset options: Luxury Concierge, Friendly Local Expert, Adventurous & Energetic, Professional & Direct.
- **Pricing & Markup Rules:**
  - Default markup percentage (e.g., 15% or 20%).
  - Currency display: `INR (₹)`, `USD ($)`, `EUR (€)`, `AED (AED)`.
  - Price presentation: Per Person (`₹14,999/person`) or Total Package (`₹59,996 total for 4`).

### 2.2 Itinerary Builder Agent (Mastra + Browserbase)
- **Inputs:** Lead requirements (from Pillar 1) or manual agency inputs (destination, duration, pax, budget tier, custom requests).
- **Web Intelligence (Browserbase + Stagehand):**
  - Searches Google Flights / MakeMyTrip / Booking.com for live hotel availability, realistic travel times, and recommended local attractions.
- **Style Compilation:**
  - The agent synthesizes researched options into the agency's configured JSON structure and Markdown format.
  - Applies the agency's configured markup percentage to calculate quoted prices.
  - Ensures inclusions/exclusions and formatting strictly adhere to the agency's template.

### 2.3 Delivery Formats
1. **WhatsApp-Optimized Text:** Clean, emoji-structured WhatsApp message that fits message limits, easy to read on mobile.
2. **Branded Web Link (`/trip/[slug]`):** A fast, responsive, mobile-first web page featuring the agency's branding, day-by-day photo cards, interactive map links, pricing breakdown, and a direct "Confirm via WhatsApp" action button.
3. **One-Click Regenerate / Edit:** Agency staff can tweak any hotel, swap an activity, or adjust the price in the dashboard with real-time recalculation.

---

## Pillar 3: Automating Agency Ops & Bookings Needed

Once a client says "Yes" and pays an advance, the hardest manual work begins. Today, agency owners maintain messy spreadsheets or paper diaries to track what needs to be booked, which cab driver is assigned, whether the hotel has confirmed, and what balance remains. Roam automates this entire operations pipeline.

### 3.1 "Bookings Needed" Auto-Extraction
When a lead moves to `Confirmed` (or a customer joins a package departure), Roam automatically parses the approved itinerary and generates a **Bookings Needed Checklist**:
- **Hotels:**
  - Property name & location
  - Check-in & Check-out dates
  - Room type, number of rooms, meal plan (EP, CP, MAP)
  - Estimated supplier cost vs client billed cost
- **Transport & Transfers:**
  - Airport/Station pick-up & drop-off
  - Intercity transit (e.g. Delhi -> Agra cab, train tickets, private vehicle for 5 days)
  - Vehicle type (Sedan, SUV, Tempo Traveller)
- **Activities & Sightseeing:**
  - Entry tickets, permits (e.g. Rohtang Pass, scuba slot, safari booking)
  - Date, time slot, traveler headcount

### 3.2 Operations Hub (`/bookings/[id]`)
- **Status Per Item:**
  - `To Book` (Action required)
  - `Supplier Contacted`
  - `Confirmed` (Supplier confirmation reference recorded)
  - `Canceled / Replaced`
- **Supplier Directory:**
  - Quick-link booking items to preferred suppliers (Hotel sales manager, local cab fleet vendor, activity operator).
  - Stores vendor phone, WhatsApp, negotiated rates, and payment details.
- **Supplier Dispatch Automation:**
  - One-click "Send Booking Request via WhatsApp" with a pre-filled message template containing guest names, dates, and required room/vehicle specs.
- **Financial Tracking:**
  - Advance collected from customer vs Balance due.
  - Advances paid to suppliers vs Pending supplier balances.
  - Real-time gross margin calculation (`Customer Total - Supplier Costs = Agency Profit`).

### 3.3 Travel Documents & Voucher Generation
- Once booking items are marked `Confirmed`, Roam produces:
  - **Travel Voucher:** A professional, agency-branded voucher PDF/web link for the customer showing confirmation IDs, hotel addresses, driver contact details, and emergency helpline.
  - **Booking Summary Sheet:** An internal run-sheet for the agency operations team.

---

## Tightened 20-Day Implementation Schedule

```
+-----------+-------------------------------------------------------------------------+
| PHASE     | FOCUS & DELIVERABLES                                                    |
+-----------+-------------------------------------------------------------------------+
| Days 1-4  | FOUNDATION & LEADS PIPELINE (Pillar 1)                                  |
|           | - Database Schema: agencies, leads, customers, conversations, bookings   |
|           | - Photon Spectrum: WhatsApp & iMessage webhook integration               |
|           | - Mastra Inquiry Agent: Conversational qualification & package matching   |
|           | - Leads CRM Kanban & Conversation Inbox with Human Takeover              |
+-----------+-------------------------------------------------------------------------+
| Days 5-10 | AGENCY-STYLED ITINERARY BUILDER (Pillar 2)                              |
|           | - Agency Style Config UI (Branding, layout, inclusions, tone, markup)    |
|           | - Browserbase + Stagehand travel research tool                          |
|           | - Mastra Itinerary Builder: Generates output matching agency style config|
|           | - Delivery outputs: Formatted WhatsApp snippet + Shareable Web Itinerary |
+-----------+-------------------------------------------------------------------------+
| Days 11-16| AGENCY OPS & BOOKINGS AUTOMATION (Pillar 3)                             |
|           | - Auto-extraction of "Bookings Needed" from confirmed itineraries        |
|           | - Operations Hub: Checklist table (Hotels, Cabs, Activities)            |
|           | - Supplier contact linking & one-click WhatsApp dispatch templates       |
|           | - Payment tracking (Customer advance/balance & Supplier disbursements)   |
|           | - One-click Customer Voucher generator                                  |
+-----------+-------------------------------------------------------------------------+
| Days 17-20| POLISH, MOBILE RESPONSIVENESS & PILOT ROLLOUT                           |
|           | - Mobile web testing (agency owners use their phones on the go)         |
|           | - Deployment on Railway/Fly.io (API) + Vercel (Dashboard)                |
|           | - Onboard 3-5 pilot agencies; tune prompts & operational flow           |
+-----------+-------------------------------------------------------------------------+
```

---

## Database Schema (Tightened for Core Features)

```sql
-- Agency Profile & Style Configuration
CREATE TABLE agencies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  whatsapp_number TEXT,
  currency TEXT DEFAULT 'INR',
  default_markup_pct REAL DEFAULT 15.0,
  -- Agency Style Config
  style_tone TEXT DEFAULT 'friendly',         -- 'luxury', 'friendly', 'adventurous', 'corporate'
  style_layout TEXT DEFAULT 'day_parts',       -- 'day_parts' (Morning/Afternoon/Evening), 'narrative', 'highlights'
  style_inclusions_template TEXT,             -- Default inclusions JSON or text
  style_exclusions_template TEXT,             -- Default exclusions JSON or text
  style_terms_conditions TEXT,                -- Standard policies / payment terms
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Customers & Contacts
CREATE TABLE customers (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL REFERENCES agencies(id),
  name TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Pillar 1: Leads & CRM
CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL REFERENCES agencies(id),
  customer_id TEXT NOT NULL REFERENCES customers(id),
  destination TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  adults_count INTEGER DEFAULT 1,
  children_count INTEGER DEFAULT 0,
  budget_estimate REAL,
  travel_style TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'qualified', 'quoted', 'confirmed', 'traveling', 'completed', 'lost'
  assigned_to TEXT,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL REFERENCES agencies(id),
  customer_id TEXT NOT NULL REFERENCES customers(id),
  lead_id TEXT REFERENCES leads(id),
  channel TEXT NOT NULL, -- 'whatsapp', 'imessage', 'instagram'
  status TEXT DEFAULT 'ai_handling', -- 'ai_handling', 'human_handling', 'closed'
  last_message_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id),
  sender_type TEXT NOT NULL, -- 'customer', 'ai', 'agent'
  content TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Pillar 2: Itineraries Styled to Agency Config
CREATE TABLE itineraries (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL REFERENCES agencies(id),
  lead_id TEXT REFERENCES leads(id),
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  days_count INTEGER NOT NULL,
  content_json TEXT NOT NULL,      -- Structured JSON conforming to agency style config
  whatsapp_text TEXT,              -- Pre-formatted WhatsApp text
  share_slug TEXT UNIQUE,          -- Public web preview slug (roam.travel/t/xyz)
  base_cost REAL DEFAULT 0,
  markup_pct REAL DEFAULT 15.0,
  quoted_price REAL DEFAULT 0,
  status TEXT DEFAULT 'draft',     -- 'draft', 'sent', 'approved', 'rejected'
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Pillar 3: Agency Ops, Bookings Needed & Suppliers
CREATE TABLE suppliers (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL REFERENCES agencies(id),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'hotel', 'cab_transport', 'activity', 'guide'
  phone TEXT,
  email TEXT,
  location TEXT,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  agency_id TEXT NOT NULL REFERENCES agencies(id),
  lead_id TEXT NOT NULL REFERENCES leads(id),
  itinerary_id TEXT NOT NULL REFERENCES itineraries(id),
  customer_id TEXT NOT NULL REFERENCES customers(id),
  total_quoted_price REAL NOT NULL,
  advance_received REAL DEFAULT 0,
  balance_due REAL DEFAULT 0,
  total_supplier_cost REAL DEFAULT 0,
  ops_status TEXT DEFAULT 'pending', -- 'pending', 'partially_booked', 'fully_confirmed', 'completed'
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE booking_items (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL REFERENCES bookings(id),
  supplier_id TEXT REFERENCES suppliers(id),
  type TEXT NOT NULL,               -- 'hotel', 'cab', 'train', 'flight', 'activity'
  title TEXT NOT NULL,              -- e.g. "Taj Fort Aguada - 2 Deluxe Rooms"
  service_start_date TEXT NOT NULL,
  service_end_date TEXT,
  details_json TEXT,                -- Specific fields: checkin/checkout, room_type, pickup/drop, slot
  supplier_cost REAL DEFAULT 0,
  client_billed_amount REAL DEFAULT 0,
  status TEXT DEFAULT 'to_book',    -- 'to_book', 'contacted', 'confirmed', 'canceled'
  supplier_confirmation_code TEXT,
  voucher_issued INTEGER DEFAULT 0, -- 0 or 1
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL REFERENCES bookings(id),
  agency_id TEXT NOT NULL REFERENCES agencies(id),
  type TEXT NOT NULL,      -- 'customer_advance', 'customer_balance', 'supplier_advance', 'supplier_settlement'
  amount REAL NOT NULL,
  payment_method TEXT,     -- 'upi', 'bank_transfer', 'cash', 'card'
  reference_id TEXT,
  payment_date TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

## Why This Wins With Travel Agencies

1. **Immediate Time Savings on Leads:** The agency stops losing leads during evenings and weekends. The AI qualifies them instantly on WhatsApp, recommends their packages, and tees them up for closing.
2. **Branded, Professional Output in Seconds:** Instead of spending an hour making an itinerary in Word or Canva, the agency generates an on-brand, styled itinerary in 60 seconds with live market data.
3. **No Dropped Balls on Bookings:** The operations team gets an automated checklist for every confirmed trip. They never forget to book a cab transfer, never miss a hotel confirmation, and know their exact gross profit margin on every booking.
