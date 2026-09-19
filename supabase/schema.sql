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
)
on conflict (id) do update set
  data = excluded.data,
  updated_at = timezone('utc'::text, now());
