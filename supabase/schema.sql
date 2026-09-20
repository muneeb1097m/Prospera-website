-- 1. Create site_content table
create table if not exists public.site_content (
  id text primary key,
  section text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.site_content enable row level security;

-- 3. Policy: Everyone can read content (Public read-only)
drop policy if exists "Allow public read access" on public.site_content;
create policy "Allow public read access"
  on public.site_content
  for select
  using (true);

-- 4. Policy: Authenticated users can insert/update content
drop policy if exists "Allow authenticated update access" on public.site_content;
create policy "Allow authenticated update access"
  on public.site_content
  for update
  using (auth.role() = 'authenticated');

drop policy if exists "Allow authenticated insert access" on public.site_content;
create policy "Allow authenticated insert access"
  on public.site_content
  for insert
  with check (auth.role() = 'authenticated');

-- 5. Seed initial data matching current hardcoded website copy
insert into public.site_content (id, section, data)
values
(
  'home_hero',
  'home',
  '{
    "line1Prefix": "Your Revenue ",
    "line1Emphasis": "Is Growing.",
    "line2": "Your Numbers Should Keep Up.",
    "subtitle": "When your books are done but your reports still do not make sense, financial decisions get harder than they should be. Prospera helps build the clarity and organization that changes that. No more guesswork.",
    "ctaPrimaryText": "Schedule a Financial Structure Review",
    "ctaSecondaryText": "See How the Process Works",
    "trustText": "Based in Greensboro, North Carolina, Prospera supports businesses across the U.S. that need cleaner bookkeeping, clearer financial reporting, and stronger tax-ready organization throughout the year."
  }'::jsonb
),
(
  'home_stats',
  'home',
  '{
    "heading": "Monthly Financial Clarity & Bookkeeping Support",
    "subtext": "Accurate bookkeeping, clear financial reporting, and tax-ready organization that help growing businesses understand their numbers and maintain control.",
    "whyTrustTitle": "Why Business Owners Trust Prospera",
    "trustPoints": [
      {
        "title": "Better Financial Visibility",
        "desc": "You can see what is happening before payroll, taxes, or cash flow problems become stressful."
      },
      {
        "title": "Tax-Ready Organization",
        "desc": "Your records are maintained throughout the year with tax season in mind."
      },
      {
        "title": "Clearer Reporting",
        "desc": "Your financial reports are easier to understand and use."
      },
      {
        "title": "Cleaner Records",
        "desc": "Your books are organized, reconciled, and maintained consistently."
      }
    ]
  }'::jsonb
),
(
  'home_what_we_help_with',
  'home',
  '{
    "heading": "What Prospera Helps You Gain",
    "tagline": "THE PROSPERA ADVANTAGE",
    "description1": "Unlike standalone bookkeepers, our structured monthly system is designed with tax preparation in mind.",
    "description2": "Because we understand both financial organization and tax compliance, your records are structured properly throughout the year—not just at filing time.",
    "services": [
      {
        "title": "Monthly Bookkeeping & Reconciliation",
        "description": "Transactions, bank accounts, and credit cards are organized and reconciled consistently."
      },
      {
        "title": "Financial Reporting & Visibility",
        "description": "Monthly reports help you understand revenue, expenses, profitability, and cash flow."
      },
      {
        "title": "Tax-Ready Bookkeeping Support",
        "description": "Your records are maintained throughout the year with tax preparation and compliance in mind."
      },
      {
        "title": "Cleanup & Catch-Up Support",
        "description": "If your books are behind, messy, or unclear, we help define what needs to be corrected before ongoing support begins."
      },
      {
        "title": "Financial Visibility for Operational Decisions",
        "description": "We help business owners use their financial information to make more informed decisions around payroll, pricing, hiring, taxes, and growth."
      }
    ]
  }'::jsonb
),
(
  'home_tailored_services',
  'home',
  '{
    "heading": "Built for Businesses With More Financial Moving Parts",
    "services": [
      {
        "title": "Service-Based Businesses",
        "description": "Businesses that need clean monthly bookkeeping, reporting, and tax-ready financial records."
      },
      {
        "title": "Trades & Field-Service Companies",
        "description": "Contractors and field-service businesses managing jobs, crews, vendors, equipment, payroll timing, and cash flow pressure."
      },
      {
        "title": "Inventory or Unit-Based Businesses",
        "description": "Businesses such as auto dealers, equipment companies, and other inventory-heavy operations where costs, assets, loans, or inventory need closer tracking."
      },
      {
        "title": "Retail, Restaurant & Salon Businesses",
        "description": "Businesses with daily sales activity, deposits, merchant fees, tips, payouts, and sales tax considerations."
      },
      {
        "title": "Businesses Across the U.S.",
        "description": "Owners who need clearer financial visibility before making operational decisions."
      }
    ]
  }'::jsonb
),
(
  'home_how_it_works',
  'home',
  '{
    "heading": "How It Works",
    "noteTitle": "Note",
    "noteText": "Recurring services begin after onboarding. Historical cleanup or \"catch-up\" work for past months is assessed and quoted separately.",
    "steps": [
      {
        "title": "Financial Structure Review",
        "description": "A comprehensive diagnostic review to identify structural gaps in your books."
      },
      {
        "title": "Structured Onboarding",
        "description": "Secure tool connection, account cleanup, and clean structure alignment."
      },
      {
        "title": "Practical Support",
        "description": "Consistent monthly reconciliation, clean reports, and tax-ready structure."
      }
    ]
  }'::jsonb
),
(
  'home_testimonials',
  'home',
  '{
    "bannerPrefix": "WE BELIEVE BOOKKEEPING SHOULD FEEL:",
    "bannerHighlight": "Structured. Transparent. Predictable. Reliable.",
    "testimonials": [
      {
        "quote": "Working with Jenna has been an absolute game changer for my business. Following her bookkeeping and accounting processes has saved me a tremendous amount of time and money. She has a clear, organized system that makes everything so much easier and more efficient.",
        "author": "Sami Maaliki",
        "role": "Business Owner"
      },
      {
        "quote": "Jenna is not only a skilled tax preparer, but she also acts as a mentor, a dedicated and responsible partner. Since Jenna started helping me with my taxes, everything has become much more organized and clearer. Working with her always gives me peace of mind.",
        "author": "Kate Tran",
        "role": "Small Business Owner"
      },
      {
        "quote": "Jenna is extremely knowledgeable, organized and has completely helped me with my Business strategies. I know I''m in good hands with her and I put my complete trust in her to look out for my best interest. She eliminates my stress in dealing with taxes.",
        "author": "Renee Bell",
        "role": "Managing Director"
      },
      {
        "quote": "Working with her has been amazing. She''s incredibly organized, always on top of things, and somehow always has a solution whenever something comes up. Her expertise has saved me so much time and made running my business a lot easier.",
        "author": "The Morgan Collective",
        "role": "Creative Agency"
      },
      {
        "quote": "Jenna is knowledgeable, efficient, and responsive to all my bookkeeping and tax needs. I highly recommend her services to my peers in service-based industries!",
        "author": "Moniqucia Varner",
        "role": "Service Provider"
      },
      {
        "quote": "I always have a great experience working with Jenna. She is always professional, organized, and on time. I never have to worry about delays or missed details because she stays on top of everything. She explains things clearly and makes the process simple.",
        "author": "Alysia Wake",
        "role": "Entrepreneur"
      },
      {
        "quote": "Jenna is great! I''ve been with her over a year now for both personal and business accounting/taxes and she''s always very responsive, professional, and invested! Highly recommend.",
        "author": "Emily",
        "role": "Business Client"
      },
      {
        "quote": "If you''re looking for someone who is professional, reliable, and truly amazing at what she does, I can''t recommend her enough. She genuinely cares about helping her clients succeed.",
        "author": "Nguyen Vu",
        "role": "Founder"
      }
    ]
  }'::jsonb
),
(
  'home_final_cta',
  'home',
  '{
    "headline": "Ready for Clearer Numbers and Better Financial Organization?",
    "body": "If your business has reached the point where your numbers should be working harder for you, Prospera can help you understand exactly where things stand and what needs to change.",
    "buttonText": "Schedule a Financial Structure Review"
  }'::jsonb
),
(
  'contact_info',
  'global',
  '{
    "email": "admin@prosperagroup.us",
    "phone": "+1 (336) 860-7529",
    "address": "3300 Battleground Ave Suite 310 Greensboro, NC 27410",
    "tagline": "Prospera Group USA LLC helps growing businesses gain cleaner bookkeeping, clearer financial reporting, tax-ready organization, and better financial visibility for decision-making.",
    "subtext": "Based in Greensboro, North Carolina. Supporting businesses across the U.S."
  }'::jsonb
),
-- ABOUT PAGE
(
  'about_hero',
  'about',
  '{
    "badge": "ABOUT PROSPERA",
    "line1": "Financial Clarity, Tax Readiness,",
    "line2": "and Practical Support"
  }'::jsonb
),
(
  'about_opening',
  'about',
  '{
    "headline": "Most bookkeeping services treat financial records as a data-entry problem. Prospera was built around a different idea: clean books only matter if they help a business owner understand what is actually happening.",
    "paragraph": "We help businesses create cleaner records, clearer reporting, and stronger tax-ready organization so decisions are made with better information throughout the year."
  }'::jsonb
),
(
  'about_founder',
  'about',
  '{
    "badge": "IRS Enrolled Agent",
    "heading": "IRS Enrolled Agent-Led Support",
    "paragraphs": [
      "Prospera is led by an IRS Enrolled Agent, a federally authorized tax professional. Prospera’s Enrolled Agent can represent taxpayers before the IRS in federal tax matters, including audits, collection matters, and appeals. Representation before state tax agencies may also be available where permitted and properly authorized.",
      "That matters because financial records should not only be organized. They should also be maintained with tax readiness in mind throughout the year.",
      "That perspective helps Prospera support business owners with cleaner books, clearer reporting, tax-ready records, and practical financial organization before tax deadlines or major decisions create pressure.",
      "As businesses grow, we also help identify when financial processes, reporting structure, payroll handling, or tax-related obligations may need to evolve alongside the business."
    ],
    "ctaText": "Schedule a Financial Structure Review"
  }'::jsonb
),
(
  'about_why_different',
  'about',
  '{
    "heading": "Why Prospera Is Different",
    "items": [
      {
        "title": "Clarity First",
        "description": "We help business owners understand what their numbers are showing, not just receive reports."
      },
      {
        "title": "Structured Monthly Support",
        "description": "We maintain clean records, reconciled accounts, and organized financial information throughout the year."
      },
      {
        "title": "Built for More Complexity",
        "description": "We support owners whose businesses have more financial moving parts than basic bookkeeping can handle."
      },
      {
        "title": "Tax-Ready Focus",
        "description": "Your records are organized with tax season and compliance in mind."
      },
      {
        "title": "Practical Financial Visibility",
        "description": "We help connect financial information to real business decisions around payroll, pricing, hiring, cash flow, and growth."
      }
    ]
  }'::jsonb
),
(
  'about_final_cta',
  'about',
  '{
    "headline": "If Your Business Has Outgrown Basic Bookkeeping, We Can Help.",
    "body": "Prospera helps businesses create cleaner records, clearer reporting, tax-ready organization, and better financial visibility.",
    "buttonText": "Schedule a Financial Structure Review"
  }'::jsonb
),
-- SERVICES PAGE
(
  'services_hero',
  'services',
  '{
    "badge": "SERVICES",
    "heading": "Monthly Financial Clarity & Bookkeeping Support",
    "description": "When your business has more moving parts, basic bookkeeping stops being enough. Prospera provides monthly financial support for businesses that need cleaner records, clearer reporting, tax-ready organization, and better visibility before decisions are made."
  }'::jsonb
),
(
  'services_opening',
  'services',
  '{
    "headingLine1": "Clean books matter.",
    "headingLine2": "But businesses with more complexity need more than completed books.",
    "paragraph1": "Many businesses have bookkeeping in place, but still lack clarity. The reports may be generated. The accounts may be reconciled. The transactions may be categorized. But the owner may still be unsure about cash flow, profitability, tax exposure, payroll pressure, or what the numbers actually mean.",
    "paragraph2": "That is where Prospera comes in. We provide bookkeeping, reporting, cleanup support, and tax-ready financial organization designed to help business owners understand their numbers with more confidence."
  }'::jsonb
),
(
  'services_monthly_bookkeeping',
  'services',
  '{
    "heading": "Monthly & Tax-Ready Foundation",
    "subtext": "Clean books are the foundation of your business''s financial clarity. We keep your accounts structured, reconciled, and ready for tax season.",
    "card1Title": "Monthly Bookkeeping & Account Reconciliation",
    "card1Desc": "Clean books are the foundation, but they are not the finish line. Prospera helps maintain the financial foundation of your business through consistent monthly bookkeeping, account reconciliation, and organized records.",
    "card1Bullets": [
      "Categorizing income and expenses",
      "Reconciling bank and credit card accounts",
      "Reviewing account activity",
      "Preparing monthly financial statements",
      "Organizing records for tax preparation"
    ],
    "card2Title": "Tax-Ready Bookkeeping Support",
    "card2Desc": "Tax stress often starts long before the filing deadline. Prospera helps maintain your books throughout the year with tax readiness in mind, so your financial records are cleaner, better organized, and easier to work with when tax deadlines approach.",
    "card2Note": "* Tax preparation, tax strategy, and complex advisory work may be scoped separately depending on the engagement."
  }'::jsonb
),
(
  'services_financial_insights',
  'services',
  '{
    "heading": "Reporting & Operational Visibility",
    "services": [
      {
        "title": "Financial Reporting & Visibility",
        "description": "Financial reports should help you understand what is happening in your business. Prospera provides monthly financial reporting support designed to give owners clearer visibility into revenue, expenses, profitability, cash flow, account balances, trends, and areas that may need attention. Reports should not just exist. They should be useful."
      },
      {
        "title": "Visibility for Operational Decisions",
        "description": "As a business becomes more complex, financial questions become more important. Prospera helps owners understand what their numbers are showing so decisions around payroll, pricing, hiring, taxes, cash flow, expenses, financing, and owner compensation are made with more visibility and less guesswork."
      }
    ]
  }'::jsonb
),
(
  'services_cleanup',
  'services',
  '{
    "heading": "Cleanup & Catch-Up Support",
    "description": "If your books are behind, messy, or unclear, ongoing monthly support may not be the first step. Prospera can review your current financial records and identify what needs to be cleaned up before a monthly process begins.",
    "boxTitle": "What Cleanup Work May Include",
    "bullets": [
      "Reviewing prior transactions",
      "Correcting categorization issues",
      "Reconciling bank & credit card accounts",
      "Organizing missing records",
      "Reviewing balance sheet issues",
      "Preparing the books for ongoing monthly support"
    ]
  }'::jsonb
),
(
  'services_who_is_it_for',
  'services',
  '{
    "heading": "Who This Is For",
    "intro": "Prospera is designed for businesses where:",
    "items": [
      "You have outgrown DIY bookkeeping.",
      "Your books are current, but your reports are not useful.",
      "Revenue is growing, but cash flow still feels unclear.",
      "Tax season keeps creating stress or surprises.",
      "Your business has more accounts, systems, or moving parts than before.",
      "You need more organization around financial reporting and decision-making."
    ],
    "scopeTitle": "Scope Clarification",
    "scopeItems": [
      "Bookkeeping, reporting, and financial organization services do not constitute formal audit or assurance services.",
      "Tax preparation, tax advisory, or taxpayer representation services may be subject to separate engagement terms."
    ]
  }'::jsonb
),
(
  'services_final_cta',
  'services',
  '{
    "headline": "Ready for Cleaner Records and Clearer Financial Visibility?",
    "body": "If your business needs bookkeeping, reporting, tax-ready support, or cleanup before monthly support begins, Prospera can help identify the right next step.",
    "buttonText": "Schedule a Financial Structure Review"
  }'::jsonb
),
-- HOW IT WORKS PAGE
(
  'how_it_works_hero',
  'how-it-works',
  '{
    "badge": "HOW IT WORKS",
    "heading": "How Prospera Builds Financial Clarity",
    "description": "Prospera’s process is designed to help business owners move from unclear records and reactive decisions to cleaner books, clearer reporting, and stronger tax-ready organization."
  }'::jsonb
),
(
  'how_it_works_steps',
  'how-it-works',
  '{
    "heading": "The Process",
    "steps": [
      {
        "number": "1",
        "title": "Financial Structure Review",
        "description": "We start by reviewing where your business stands today. This includes your current bookkeeping setup, accounting system, accounts, reporting needs, tax concerns, and any cleanup or catch-up issues. We may also identify situations where payroll processes, entity elections, sales tax responsibilities, estimated tax requirements, or other financial compliance obligations should be reviewed more closely as the business grows."
      },
      {
        "number": "2",
        "title": "Scope & Setup",
        "description": "Once we understand the current situation, we define the scope of support. This may include monthly bookkeeping, account reconciliation, financial reporting, cleanup, tax-ready organization, or additional support based on the complexity of your business. We clarify expectations before work begins so the partnership is structured properly from the start."
      },
      {
        "number": "3",
        "title": "Monthly Financial Clarity & Bookkeeping Support",
        "description": "Each month, Prospera helps maintain your financial records, reconcile accounts, organize transactions, and prepare financial reports. The goal is to give you a clearer view of what is happening in the business instead of waiting until tax season, payroll week, or a major decision to find out there is a problem."
      },
      {
        "number": "4",
        "title": "Reporting & Tax-Ready Coordination",
        "description": "Your reports should not just be created. They should be understandable. Throughout the year, we also help keep records organized with tax readiness in mind so tax season is less reactive."
      }
    ]
  }'::jsonb
),
(
  'how_it_works_final_cta',
  'how-it-works',
  '{
    "headline": "Start With a Clearer Picture of Where Your Business Stands",
    "body": "If your business needs cleaner records, stronger reporting, tax-ready organization, or cleanup before monthly support begins, start with a Financial Structure Review.",
    "buttonText": "Schedule a Financial Structure Review"
  }'::jsonb
),
-- CONTACT PAGE
(
  'contact_hero',
  'contact',
  '{
    "badge": "CONTACT PROSPERA",
    "line1": "Request a Financial",
    "line2": "Structure Review"
  }'::jsonb
),
(
  'contact_form_info',
  'contact',
  '{
    "headingLine1": "Request a Financial",
    "headingLine2": "Structure Review",
    "description": "If your business needs cleaner books, clearer reporting, better tax readiness, or clearer visibility into financial decisions, Prospera can help you identify the next right step. Use this form to tell us where your business stands today and what type of support you are looking for.",
    "infoBoxTitle": "We are especially interested in understanding:",
    "infoBoxBullets": [
      "Whether your books are current",
      "What accounting system you use",
      "Whether cleanup or catch-up work is needed",
      "What financial questions feel unclear",
      "Whether you need monthly bookkeeping, reporting, tax-ready support, cleanup, or operational visibility support"
    ],
    "companyNote": "Prospera Group USA LLC is based in Greensboro, North Carolina, and supports businesses across the U.S."
  }'::jsonb
),
(
  'contact_alternative',
  'contact',
  '{
    "heading": "Alternative Contact Options",
    "emailLabel": "Email Address",
    "emailValue": "admin@prosperagroup.us",
    "phoneLabel": "Phone Number",
    "phoneValue": "+1 (336) 860-7529",
    "hoursLabel": "Hours",
    "hoursValue": "Monday–Friday | 9:00 AM – 5:00 PM EST"
  }'::jsonb
)
on conflict (id) do update set
  data = excluded.data,
  updated_at = timezone('utc'::text, now());
