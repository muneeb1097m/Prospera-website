'use client';

import { useState } from 'react';
import {
  Layout,
  BarChart3,
  CheckSquare,
  Briefcase,
  Layers,
  MessageSquareQuote,
  Megaphone,
  PhoneCall,
  Save,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  Trash2,
  FileText,
  UserCheck,
  HelpCircle,
} from 'lucide-react';
import { saveSectionContentAction } from '../actions';
import { defaultSiteContent, SiteContent } from '@/lib/content/defaults';

type SiteContentState = SiteContent;

interface Props {
  initialContent: SiteContentState;
}

type TabKey = keyof SiteContentState;

interface SectionItem {
  id: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
}

interface SectionGroup {
  group: string;
  items: SectionItem[];
}

const SECTIONS: SectionGroup[] = [
  {
    group: 'Homepage Content',
    items: [
      { id: 'home_hero', label: 'Hero Header', icon: Layout, desc: 'Headlines, intro text, and CTA buttons' },
      { id: 'home_stats', label: 'Stats & Trust', icon: BarChart3, desc: 'Key metrics and 4 trust pillars' },
      { id: 'home_what_we_help_with', label: 'What We Help With', icon: CheckSquare, desc: 'Advantage copy & 5 core services' },
      { id: 'home_tailored_services', label: 'Tailored Services', icon: Briefcase, desc: 'Industry-specific service cards' },
      { id: 'home_how_it_works', label: 'How It Works', icon: Layers, desc: '3 process steps & onboarding note' },
      { id: 'home_testimonials', label: 'Client Testimonials', icon: MessageSquareQuote, desc: 'Review quote cards & pink banner' },
      { id: 'home_final_cta', label: 'Bottom Banner CTA', icon: Megaphone, desc: 'Pre-footer conversion banner' },
    ],
  },
  {
    group: 'About Page',
    items: [
      { id: 'about_hero', label: 'About Hero', icon: Layout, desc: 'Header badge and main headline' },
      { id: 'about_opening', label: 'Opening Manifesto', icon: FileText, desc: 'Core philosophy & mission paragraph' },
      { id: 'about_founder', label: 'Founder & EA Led', icon: UserCheck, desc: 'IRS Enrolled Agent badge & narrative' },
      { id: 'about_why_different', label: 'Why We Are Different', icon: Layers, desc: '5 distinct value cards & descriptions' },
      { id: 'about_final_cta', label: 'Bottom Banner CTA', icon: Megaphone, desc: 'Pre-footer conversion banner for About' },
    ],
  },
  {
    group: 'Services Page',
    items: [
      { id: 'services_hero', label: 'Services Hero', icon: Layout, desc: 'Headline, badge, and intro copy' },
      { id: 'services_opening', label: 'Opening Callout', icon: FileText, desc: 'Two-column perspective statement' },
      { id: 'services_monthly_bookkeeping', label: 'Monthly Foundation', icon: BarChart3, desc: 'Bookkeeping scope & tax-ready support' },
      { id: 'services_financial_insights', label: 'Reporting & Visibility', icon: Briefcase, desc: 'Operational decision support services' },
      { id: 'services_cleanup', label: 'Cleanup & Catch-Up', icon: Layers, desc: 'Catch-up support description & items' },
      { id: 'services_who_is_it_for', label: 'Who This Is For', icon: CheckSquare, desc: 'Target business traits & scope note' },
      { id: 'services_final_cta', label: 'Bottom Banner CTA', icon: Megaphone, desc: 'Pre-footer conversion banner for Services' },
    ],
  },
  {
    group: 'How It Works Page',
    items: [
      { id: 'how_it_works_hero', label: 'Process Hero', icon: Layout, desc: 'Page headline and intro paragraph' },
      { id: 'how_it_works_steps', label: '4-Step Process', icon: Layers, desc: 'Diagnostic, scope, monthly & tax-ready' },
      { id: 'how_it_works_final_cta', label: 'Bottom Banner CTA', icon: Megaphone, desc: 'Pre-footer conversion banner' },
    ],
  },
  {
    group: 'Contact Page',
    items: [
      { id: 'contact_hero', label: 'Contact Hero', icon: Layout, desc: 'Contact page title and badge' },
      { id: 'contact_form_info', label: 'Form Copy & Guidance', icon: HelpCircle, desc: 'Form headline, intro, and checklist' },
      { id: 'contact_alternative', label: 'Alternative Options', icon: PhoneCall, desc: 'Email, phone, and business hours' },
    ],
  },
  {
    group: 'Site-wide Settings',
    items: [
      { id: 'contact_info', label: 'Company & Footer', icon: PhoneCall, desc: 'Global email, phone, address, and footer copy' },
    ],
  },
];

export default function ContentDashboardClient({ initialContent }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('home_hero');
  const [content, setContent] = useState<SiteContentState>(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSaveActiveSection = async () => {
    setIsSaving(true);
    const sectionData = content[activeTab];
    
    let category = 'home';
    if (activeTab.startsWith('about_')) category = 'about';
    else if (activeTab.startsWith('services_')) category = 'services';
    else if (activeTab.startsWith('how_it_works_')) category = 'how-it-works';
    else if (activeTab.startsWith('contact_')) category = 'contact';
    else if (activeTab === 'contact_info') category = 'global';

    const res = await saveSectionContentAction(activeTab, category, sectionData as unknown as Record<string, unknown>);
    setIsSaving(false);

    if (res.success) {
      showToast('success', 'Changes published! The live website is updated.');
    } else {
      showToast('error', res.error || 'Failed to save changes');
    }
  };

  const handleResetToDefault = () => {
    if (confirm('Reset this section back to its original website copy? Any unsaved edits will be cleared.')) {
      setContent((prev) => ({
        ...prev,
        [activeTab]: defaultSiteContent[activeTab],
      }));
      showToast('success', 'Reset to defaults. Click "Save Changes" to publish.');
    }
  };

  // Find active section metadata
  let activeMeta: SectionItem | undefined;
  for (const group of SECTIONS) {
    const found = group.items.find((i) => i.id === activeTab);
    if (found) {
      activeMeta = found;
      break;
    }
  }

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium transition-all animate-in fade-in slide-in-from-bottom-5 border ${
            toast.type === 'success'
              ? 'bg-white text-emerald-900 border-emerald-200'
              : 'bg-white text-red-900 border-red-200'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Welcome Card */}
      <div className="bg-white border border-gray-200/70 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEACC6]/20 text-[#111315] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#111315]" />
            <span>Complete Website CMS Portal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-normal text-gray-900 tracking-tight">
            Site-Wide Content Editor
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl font-light leading-relaxed">
            Modify text copy for any page on your website directly. Changes are deployed to your live site immediately without altering layouts or styles.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="bg-gray-100 hover:bg-gray-200/80 text-gray-700 font-medium text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Section</span>
          </button>
          <button
            type="button"
            onClick={handleSaveActiveSection}
            disabled={isSaving}
            className="bg-[#111315] hover:bg-black text-white font-medium text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-black/10 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Publishing...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar + Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar (4 cols) */}
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-gray-200/70 p-4 md:p-5 shadow-xs space-y-6">
          {SECTIONS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                {group.group}
              </div>
              <div className="space-y-1">
                {group.items.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#111315] text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FEACC6]' : 'text-gray-400'}`} />
                        <div>
                          <div className="font-medium text-[13px]">{tab.label}</div>
                          <div className={`text-[11px] truncate max-w-[190px] ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>
                            {tab.desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-gray-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* Content Editor Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200/70 p-8 md:p-10 shadow-xs space-y-8">
          
          {/* Section Header */}
          <div className="border-b border-gray-100 pb-6 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-[#FEACC6]/20 text-[#111315]">
                  {activeMeta?.icon && <activeMeta.icon className="w-4 h-4" />}
                </span>
                <h2 className="text-xl font-serif font-semibold text-gray-900">
                  {activeMeta?.label}
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 ml-8">
                {activeMeta?.desc}
              </p>
            </div>

            <button
              type="button"
              onClick={handleSaveActiveSection}
              disabled={isSaving}
              className="bg-[#111315] hover:bg-black text-white font-medium text-xs px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>

          {/* ======================================================= */}
          {/* HOMEPAGE SECTIONS */}
          {/* ======================================================= */}

          {/* Home Hero */}
          {activeTab === 'home_hero' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Line 1 Prefix
                  </label>
                  <input
                    type="text"
                    value={content.home_hero.line1Prefix}
                    onChange={(e) =>
                      setContent({ ...content, home_hero: { ...content.home_hero, line1Prefix: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Line 1 Highlight (Italic Didot)
                  </label>
                  <input
                    type="text"
                    value={content.home_hero.line1Emphasis}
                    onChange={(e) =>
                      setContent({ ...content, home_hero: { ...content.home_hero, line1Emphasis: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Line 2 Main Headline
                </label>
                <input
                  type="text"
                  value={content.home_hero.line2}
                  onChange={(e) =>
                    setContent({ ...content, home_hero: { ...content.home_hero, line2: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={content.home_hero.subtitle}
                  onChange={(e) =>
                    setContent({ ...content, home_hero: { ...content.home_hero, subtitle: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={content.home_hero.ctaPrimaryText}
                    onChange={(e) =>
                      setContent({ ...content, home_hero: { ...content.home_hero, ctaPrimaryText: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Secondary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={content.home_hero.ctaSecondaryText}
                    onChange={(e) =>
                      setContent({ ...content, home_hero: { ...content.home_hero, ctaSecondaryText: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Trust & Location Statement
                </label>
                <textarea
                  rows={2}
                  value={content.home_hero.trustText}
                  onChange={(e) =>
                    setContent({ ...content, home_hero: { ...content.home_hero, trustText: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                />
              </div>
            </div>
          )}

          {/* Home Stats */}
          {activeTab === 'home_stats' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={content.home_stats.heading}
                  onChange={(e) =>
                    setContent({ ...content, home_stats: { ...content.home_stats, heading: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Section Subtitle
                </label>
                <textarea
                  rows={2}
                  value={content.home_stats.subtext}
                  onChange={(e) =>
                    setContent({ ...content, home_stats: { ...content.home_stats, subtext: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Trust Pillars Title
                </label>
                <input
                  type="text"
                  value={content.home_stats.whyTrustTitle}
                  onChange={(e) =>
                    setContent({ ...content, home_stats: { ...content.home_stats, whyTrustTitle: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-4">
                  Trust Pillars (4 Points)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.home_stats.trustPoints.map((point, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase">Pillar {idx + 1} Title</span>
                        <input
                          type="text"
                          value={point.title}
                          onChange={(e) => {
                            const next = [...content.home_stats.trustPoints];
                            next[idx].title = e.target.value;
                            setContent({ ...content, home_stats: { ...content.home_stats, trustPoints: next } });
                          }}
                          className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase">Pillar {idx + 1} Description</span>
                        <textarea
                          rows={2}
                          value={point.desc}
                          onChange={(e) => {
                            const next = [...content.home_stats.trustPoints];
                            next[idx].desc = e.target.value;
                            setContent({ ...content, home_stats: { ...content.home_stats, trustPoints: next } });
                          }}
                          className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Home What We Help With */}
          {activeTab === 'home_what_we_help_with' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={content.home_what_we_help_with.heading}
                  onChange={(e) =>
                    setContent({ ...content, home_what_we_help_with: { ...content.home_what_we_help_with, heading: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Tagline Statement
                </label>
                <input
                  type="text"
                  value={content.home_what_we_help_with.tagline}
                  onChange={(e) =>
                    setContent({ ...content, home_what_we_help_with: { ...content.home_what_we_help_with, tagline: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Description Paragraph 1
                  </label>
                  <textarea
                    rows={3}
                    value={content.home_what_we_help_with.description1}
                    onChange={(e) =>
                      setContent({ ...content, home_what_we_help_with: { ...content.home_what_we_help_with, description1: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Description Paragraph 2
                  </label>
                  <textarea
                    rows={3}
                    value={content.home_what_we_help_with.description2}
                    onChange={(e) =>
                      setContent({ ...content, home_what_we_help_with: { ...content.home_what_we_help_with, description2: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-4">
                  Services List (5 Services)
                </label>
                <div className="space-y-3">
                  {content.home_what_we_help_with.services.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-1/3">
                        <span className="text-[11px] font-bold text-gray-500 uppercase">Service {idx + 1}</span>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const next = [...content.home_what_we_help_with.services];
                            next[idx].title = e.target.value;
                            setContent({ ...content, home_what_we_help_with: { ...content.home_what_we_help_with, services: next } });
                          }}
                          className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900"
                        />
                      </div>
                      <div className="sm:w-2/3">
                        <span className="text-[11px] font-bold text-gray-500 uppercase">Description</span>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => {
                            const next = [...content.home_what_we_help_with.services];
                            next[idx].description = e.target.value;
                            setContent({ ...content, home_what_we_help_with: { ...content.home_what_we_help_with, services: next } });
                          }}
                          className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Home Tailored Services */}
          {activeTab === 'home_tailored_services' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={content.home_tailored_services.heading}
                  onChange={(e) =>
                    setContent({ ...content, home_tailored_services: { ...content.home_tailored_services, heading: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-4">
                  Industry Cards (4 Categories)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.home_tailored_services.services.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase">Card {idx + 1} Title</span>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const next = [...content.home_tailored_services.services];
                            next[idx].title = e.target.value;
                            setContent({ ...content, home_tailored_services: { ...content.home_tailored_services, services: next } });
                          }}
                          className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase">Card {idx + 1} Description</span>
                        <textarea
                          rows={3}
                          value={item.description}
                          onChange={(e) => {
                            const next = [...content.home_tailored_services.services];
                            next[idx].description = e.target.value;
                            setContent({ ...content, home_tailored_services: { ...content.home_tailored_services, services: next } });
                          }}
                          className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Home How It Works */}
          {activeTab === 'home_how_it_works' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={content.home_how_it_works.heading}
                  onChange={(e) =>
                    setContent({ ...content, home_how_it_works: { ...content.home_how_it_works, heading: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Note Badge Title
                  </label>
                  <input
                    type="text"
                    value={content.home_how_it_works.noteTitle}
                    onChange={(e) =>
                      setContent({ ...content, home_how_it_works: { ...content.home_how_it_works, noteTitle: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Note Explanation Text
                  </label>
                  <textarea
                    rows={2}
                    value={content.home_how_it_works.noteText}
                    onChange={(e) =>
                      setContent({ ...content, home_how_it_works: { ...content.home_how_it_works, noteText: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-4">
                  3 Process Steps
                </label>
                <div className="space-y-3">
                  {content.home_how_it_works.steps.map((step, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-1/3">
                        <span className="text-[11px] font-bold text-gray-500 uppercase">Step {idx + 1} Title</span>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const next = [...content.home_how_it_works.steps];
                            next[idx].title = e.target.value;
                            setContent({ ...content, home_how_it_works: { ...content.home_how_it_works, steps: next } });
                          }}
                          className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900"
                        />
                      </div>
                      <div className="sm:w-2/3">
                        <span className="text-[11px] font-bold text-gray-500 uppercase">Step {idx + 1} Description</span>
                        <textarea
                          rows={2}
                          value={step.description}
                          onChange={(e) => {
                            const next = [...content.home_how_it_works.steps];
                            next[idx].description = e.target.value;
                            setContent({ ...content, home_how_it_works: { ...content.home_how_it_works, steps: next } });
                          }}
                          className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Home Testimonials */}
          {activeTab === 'home_testimonials' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Banner Prefix
                  </label>
                  <input
                    type="text"
                    value={content.home_testimonials.bannerPrefix}
                    onChange={(e) =>
                      setContent({ ...content, home_testimonials: { ...content.home_testimonials, bannerPrefix: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Banner Highlight Words
                  </label>
                  <input
                    type="text"
                    value={content.home_testimonials.bannerHighlight}
                    onChange={(e) =>
                      setContent({ ...content, home_testimonials: { ...content.home_testimonials, bannerHighlight: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase text-gray-600">
                    Testimonials ({content.home_testimonials.testimonials.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const next = [
                        ...content.home_testimonials.testimonials,
                        { quote: 'New client review...', author: 'Client Name', role: 'Business Owner' },
                      ];
                      setContent({ ...content, home_testimonials: { ...content.home_testimonials, testimonials: next } });
                    }}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Testimonial</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {content.home_testimonials.testimonials.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-gray-400 uppercase">Card #{idx + 1}</span>
                        {content.home_testimonials.testimonials.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const next = content.home_testimonials.testimonials.filter((_, i) => i !== idx);
                              setContent({ ...content, home_testimonials: { ...content.home_testimonials, testimonials: next } });
                            }}
                            className="text-red-500 hover:text-red-700 p-1 rounded-md transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={3}
                        value={item.quote}
                        onChange={(e) => {
                          const next = [...content.home_testimonials.testimonials];
                          next[idx].quote = e.target.value;
                          setContent({ ...content, home_testimonials: { ...content.home_testimonials, testimonials: next } });
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={item.author}
                          onChange={(e) => {
                            const next = [...content.home_testimonials.testimonials];
                            next[idx].author = e.target.value;
                            setContent({ ...content, home_testimonials: { ...content.home_testimonials, testimonials: next } });
                          }}
                          className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                        />
                        <input
                          type="text"
                          value={item.role}
                          onChange={(e) => {
                            const next = [...content.home_testimonials.testimonials];
                            next[idx].role = e.target.value;
                            setContent({ ...content, home_testimonials: { ...content.home_testimonials, testimonials: next } });
                          }}
                          className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Home Final CTA */}
          {activeTab === 'home_final_cta' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Headline Text
                </label>
                <input
                  type="text"
                  value={content.home_final_cta.headline}
                  onChange={(e) =>
                    setContent({ ...content, home_final_cta: { ...content.home_final_cta, headline: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Body Description
                </label>
                <textarea
                  rows={3}
                  value={content.home_final_cta.body}
                  onChange={(e) =>
                    setContent({ ...content, home_final_cta: { ...content.home_final_cta, body: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Button Label
                </label>
                <input
                  type="text"
                  value={content.home_final_cta.buttonText}
                  onChange={(e) =>
                    setContent({ ...content, home_final_cta: { ...content.home_final_cta, buttonText: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* ABOUT PAGE SECTIONS */}
          {/* ======================================================= */}

          {/* About Hero */}
          {activeTab === 'about_hero' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={content.about_hero.badge}
                  onChange={(e) =>
                    setContent({ ...content, about_hero: { ...content.about_hero, badge: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Headline Line 1
                  </label>
                  <input
                    type="text"
                    value={content.about_hero.line1}
                    onChange={(e) =>
                      setContent({ ...content, about_hero: { ...content.about_hero, line1: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Headline Line 2
                  </label>
                  <input
                    type="text"
                    value={content.about_hero.line2}
                    onChange={(e) =>
                      setContent({ ...content, about_hero: { ...content.about_hero, line2: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* About Opening */}
          {activeTab === 'about_opening' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Large Manifesto Headline
                </label>
                <textarea
                  rows={4}
                  value={content.about_opening.headline}
                  onChange={(e) =>
                    setContent({ ...content, about_opening: { ...content.about_opening, headline: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Body Paragraph
                </label>
                <textarea
                  rows={3}
                  value={content.about_opening.paragraph}
                  onChange={(e) =>
                    setContent({ ...content, about_opening: { ...content.about_opening, paragraph: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
            </div>
          )}

          {/* About Founder */}
          {activeTab === 'about_founder' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Credential Badge
                  </label>
                  <input
                    type="text"
                    value={content.about_founder.badge}
                    onChange={(e) =>
                      setContent({ ...content, about_founder: { ...content.about_founder, badge: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={content.about_founder.heading}
                    onChange={(e) =>
                      setContent({ ...content, about_founder: { ...content.about_founder, heading: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Founder Narrative Paragraphs ({content.about_founder.paragraphs.length})
                </label>
                <div className="space-y-3">
                  {content.about_founder.paragraphs.map((p, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="text-[11px] font-bold text-gray-400 uppercase">Paragraph {idx + 1}</span>
                      <textarea
                        rows={3}
                        value={p}
                        onChange={(e) => {
                          const next = [...content.about_founder.paragraphs];
                          next[idx] = e.target.value;
                          setContent({ ...content, about_founder: { ...content.about_founder, paragraphs: next } });
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-900"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={content.about_founder.ctaText}
                  onChange={(e) =>
                    setContent({ ...content, about_founder: { ...content.about_founder, ctaText: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
            </div>
          )}

          {/* About Why Different */}
          {activeTab === 'about_why_different' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={content.about_why_different.heading}
                  onChange={(e) =>
                    setContent({ ...content, about_why_different: { ...content.about_why_different, heading: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-4">
                  Value Cards (5 Pillars)
                </label>
                <div className="space-y-3">
                  {content.about_why_different.items.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-1/3">
                        <span className="text-[11px] font-bold text-gray-500 uppercase">Pillar {idx + 1} Title</span>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const next = [...content.about_why_different.items];
                            next[idx].title = e.target.value;
                            setContent({ ...content, about_why_different: { ...content.about_why_different, items: next } });
                          }}
                          className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900"
                        />
                      </div>
                      <div className="sm:w-2/3">
                        <span className="text-[11px] font-bold text-gray-500 uppercase">Pillar {idx + 1} Description</span>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => {
                            const next = [...content.about_why_different.items];
                            next[idx].description = e.target.value;
                            setContent({ ...content, about_why_different: { ...content.about_why_different, items: next } });
                          }}
                          className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* About Final CTA */}
          {activeTab === 'about_final_cta' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Headline Text
                </label>
                <input
                  type="text"
                  value={content.about_final_cta.headline}
                  onChange={(e) =>
                    setContent({ ...content, about_final_cta: { ...content.about_final_cta, headline: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Body Description
                </label>
                <textarea
                  rows={3}
                  value={content.about_final_cta.body}
                  onChange={(e) =>
                    setContent({ ...content, about_final_cta: { ...content.about_final_cta, body: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Button Label
                </label>
                <input
                  type="text"
                  value={content.about_final_cta.buttonText}
                  onChange={(e) =>
                    setContent({ ...content, about_final_cta: { ...content.about_final_cta, buttonText: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* SERVICES PAGE SECTIONS */}
          {/* ======================================================= */}

          {/* Services Hero */}
          {activeTab === 'services_hero' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Badge
                </label>
                <input
                  type="text"
                  value={content.services_hero.badge}
                  onChange={(e) =>
                    setContent({ ...content, services_hero: { ...content.services_hero, badge: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={content.services_hero.heading}
                  onChange={(e) =>
                    setContent({ ...content, services_hero: { ...content.services_hero, heading: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Hero Description
                </label>
                <textarea
                  rows={3}
                  value={content.services_hero.description}
                  onChange={(e) =>
                    setContent({ ...content, services_hero: { ...content.services_hero, description: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
            </div>
          )}

          {/* Services Opening */}
          {activeTab === 'services_opening' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Callout Line 1
                  </label>
                  <input
                    type="text"
                    value={content.services_opening.headingLine1}
                    onChange={(e) =>
                      setContent({ ...content, services_opening: { ...content.services_opening, headingLine1: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Callout Line 2
                  </label>
                  <input
                    type="text"
                    value={content.services_opening.headingLine2}
                    onChange={(e) =>
                      setContent({ ...content, services_opening: { ...content.services_opening, headingLine2: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Narrative Paragraph 1
                </label>
                <textarea
                  rows={3}
                  value={content.services_opening.paragraph1}
                  onChange={(e) =>
                    setContent({ ...content, services_opening: { ...content.services_opening, paragraph1: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Narrative Paragraph 2
                </label>
                <textarea
                  rows={3}
                  value={content.services_opening.paragraph2}
                  onChange={(e) =>
                    setContent({ ...content, services_opening: { ...content.services_opening, paragraph2: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
            </div>
          )}

          {/* Services Monthly Bookkeeping */}
          {activeTab === 'services_monthly_bookkeeping' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={content.services_monthly_bookkeeping.heading}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        services_monthly_bookkeeping: { ...content.services_monthly_bookkeeping, heading: e.target.value },
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Section Subtext
                  </label>
                  <input
                    type="text"
                    value={content.services_monthly_bookkeeping.subtext}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        services_monthly_bookkeeping: { ...content.services_monthly_bookkeeping, subtext: e.target.value },
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
              </div>

              {/* Card 1 */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-4">
                <span className="text-xs font-bold text-gray-700 uppercase">Card 1: Monthly Reconciliation</span>
                <input
                  type="text"
                  value={content.services_monthly_bookkeeping.card1Title}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      services_monthly_bookkeeping: { ...content.services_monthly_bookkeeping, card1Title: e.target.value },
                    })
                  }
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium"
                />
                <textarea
                  rows={2}
                  value={content.services_monthly_bookkeeping.card1Desc}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      services_monthly_bookkeeping: { ...content.services_monthly_bookkeeping, card1Desc: e.target.value },
                    })
                  }
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900"
                />
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Card 1 Checklist Bullets</span>
                  <div className="space-y-2 mt-2">
                    {content.services_monthly_bookkeeping.card1Bullets.map((bullet, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const next = [...content.services_monthly_bookkeeping.card1Bullets];
                          next[idx] = e.target.value;
                          setContent({
                            ...content,
                            services_monthly_bookkeeping: { ...content.services_monthly_bookkeeping, card1Bullets: next },
                          });
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-4">
                <span className="text-xs font-bold text-gray-700 uppercase">Card 2: Tax-Ready Support</span>
                <input
                  type="text"
                  value={content.services_monthly_bookkeeping.card2Title}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      services_monthly_bookkeeping: { ...content.services_monthly_bookkeeping, card2Title: e.target.value },
                    })
                  }
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium"
                />
                <textarea
                  rows={2}
                  value={content.services_monthly_bookkeeping.card2Desc}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      services_monthly_bookkeeping: { ...content.services_monthly_bookkeeping, card2Desc: e.target.value },
                    })
                  }
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900"
                />
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Card 2 Footnote Note</span>
                  <input
                    type="text"
                    value={content.services_monthly_bookkeeping.card2Note}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        services_monthly_bookkeeping: { ...content.services_monthly_bookkeeping, card2Note: e.target.value },
                      })
                    }
                    className="w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Services Financial Insights */}
          {activeTab === 'services_financial_insights' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={content.services_financial_insights.heading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      services_financial_insights: { ...content.services_financial_insights, heading: e.target.value },
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-4">
                <label className="block text-xs font-semibold uppercase text-gray-600">
                  Deliverable Services (2 Items)
                </label>
                {content.services_financial_insights.services.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Service {idx + 1} Title</span>
                    <input
                      type="text"
                      value={s.title}
                      onChange={(e) => {
                        const next = [...content.services_financial_insights.services];
                        next[idx].title = e.target.value;
                        setContent({
                          ...content,
                          services_financial_insights: { ...content.services_financial_insights, services: next },
                        });
                      }}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900"
                    />
                    <span className="text-[11px] font-bold text-gray-500 uppercase block pt-2">Description</span>
                    <textarea
                      rows={3}
                      value={s.description}
                      onChange={(e) => {
                        const next = [...content.services_financial_insights.services];
                        next[idx].description = e.target.value;
                        setContent({
                          ...content,
                          services_financial_insights: { ...content.services_financial_insights, services: next },
                        });
                      }}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Cleanup */}
          {activeTab === 'services_cleanup' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={content.services_cleanup.heading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      services_cleanup: { ...content.services_cleanup, heading: e.target.value },
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Section Description
                </label>
                <textarea
                  rows={3}
                  value={content.services_cleanup.description}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      services_cleanup: { ...content.services_cleanup, description: e.target.value },
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Callout Box Title
                </label>
                <input
                  type="text"
                  value={content.services_cleanup.boxTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      services_cleanup: { ...content.services_cleanup, boxTitle: e.target.value },
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <label className="block text-xs font-semibold uppercase text-gray-600">
                  Cleanup Scope Bullets ({content.services_cleanup.bullets.length})
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.services_cleanup.bullets.map((b, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={b}
                      onChange={(e) => {
                        const next = [...content.services_cleanup.bullets];
                        next[idx] = e.target.value;
                        setContent({
                          ...content,
                          services_cleanup: { ...content.services_cleanup, bullets: next },
                        });
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Services Who Is It For */}
          {activeTab === 'services_who_is_it_for' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={content.services_who_is_it_for.heading}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        services_who_is_it_for: { ...content.services_who_is_it_for, heading: e.target.value },
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Intro Sentence
                  </label>
                  <input
                    type="text"
                    value={content.services_who_is_it_for.intro}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        services_who_is_it_for: { ...content.services_who_is_it_for, intro: e.target.value },
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <label className="block text-xs font-semibold uppercase text-gray-600">
                  Target Business Criteria ({content.services_who_is_it_for.items.length})
                </label>
                <div className="space-y-2">
                  {content.services_who_is_it_for.items.map((item, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const next = [...content.services_who_is_it_for.items];
                        next[idx] = e.target.value;
                        setContent({
                          ...content,
                          services_who_is_it_for: { ...content.services_who_is_it_for, items: next },
                        });
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900"
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <label className="block text-xs font-semibold uppercase text-gray-600">
                  Right-Side Scope Clarification
                </label>
                <input
                  type="text"
                  value={content.services_who_is_it_for.scopeTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      services_who_is_it_for: { ...content.services_who_is_it_for, scopeTitle: e.target.value },
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium"
                />
                <div className="space-y-2">
                  {content.services_who_is_it_for.scopeItems.map((item, idx) => (
                    <textarea
                      key={idx}
                      rows={2}
                      value={item}
                      onChange={(e) => {
                        const next = [...content.services_who_is_it_for.scopeItems];
                        next[idx] = e.target.value;
                        setContent({
                          ...content,
                          services_who_is_it_for: { ...content.services_who_is_it_for, scopeItems: next },
                        });
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Services Final CTA */}
          {activeTab === 'services_final_cta' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Headline Text
                </label>
                <input
                  type="text"
                  value={content.services_final_cta.headline}
                  onChange={(e) =>
                    setContent({ ...content, services_final_cta: { ...content.services_final_cta, headline: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Body Description
                </label>
                <textarea
                  rows={3}
                  value={content.services_final_cta.body}
                  onChange={(e) =>
                    setContent({ ...content, services_final_cta: { ...content.services_final_cta, body: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Button Label
                </label>
                <input
                  type="text"
                  value={content.services_final_cta.buttonText}
                  onChange={(e) =>
                    setContent({ ...content, services_final_cta: { ...content.services_final_cta, buttonText: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* HOW IT WORKS PAGE SECTIONS */}
          {/* ======================================================= */}

          {/* How It Works Hero */}
          {activeTab === 'how_it_works_hero' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={content.how_it_works_hero.badge}
                  onChange={(e) =>
                    setContent({ ...content, how_it_works_hero: { ...content.how_it_works_hero, badge: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={content.how_it_works_hero.heading}
                  onChange={(e) =>
                    setContent({ ...content, how_it_works_hero: { ...content.how_it_works_hero, heading: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Description Paragraph
                </label>
                <textarea
                  rows={3}
                  value={content.how_it_works_hero.description}
                  onChange={(e) =>
                    setContent({ ...content, how_it_works_hero: { ...content.how_it_works_hero, description: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
            </div>
          )}

          {/* How It Works Steps */}
          {activeTab === 'how_it_works_steps' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={content.how_it_works_steps.heading}
                  onChange={(e) =>
                    setContent({ ...content, how_it_works_steps: { ...content.how_it_works_steps, heading: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-4">
                <label className="block text-xs font-semibold uppercase text-gray-600">
                  4 Timeline Steps
                </label>
                {content.how_it_works_steps.steps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#111315] text-[#FEACC6] text-xs font-bold flex items-center justify-center shrink-0">
                        {step.number}
                      </span>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const next = [...content.how_it_works_steps.steps];
                          next[idx].title = e.target.value;
                          setContent({ ...content, how_it_works_steps: { ...content.how_it_works_steps, steps: next } });
                        }}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-900 font-medium"
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={step.description}
                      onChange={(e) => {
                        const next = [...content.how_it_works_steps.steps];
                        next[idx].description = e.target.value;
                        setContent({ ...content, how_it_works_steps: { ...content.how_it_works_steps, steps: next } });
                      }}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How It Works Final CTA */}
          {activeTab === 'how_it_works_final_cta' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Headline Text
                </label>
                <input
                  type="text"
                  value={content.how_it_works_final_cta.headline}
                  onChange={(e) =>
                    setContent({ ...content, how_it_works_final_cta: { ...content.how_it_works_final_cta, headline: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Body Description
                </label>
                <textarea
                  rows={3}
                  value={content.how_it_works_final_cta.body}
                  onChange={(e) =>
                    setContent({ ...content, how_it_works_final_cta: { ...content.how_it_works_final_cta, body: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Button Label
                </label>
                <input
                  type="text"
                  value={content.how_it_works_final_cta.buttonText}
                  onChange={(e) =>
                    setContent({ ...content, how_it_works_final_cta: { ...content.how_it_works_final_cta, buttonText: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* CONTACT PAGE SECTIONS */}
          {/* ======================================================= */}

          {/* Contact Hero */}
          {activeTab === 'contact_hero' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Badge
                </label>
                <input
                  type="text"
                  value={content.contact_hero.badge}
                  onChange={(e) =>
                    setContent({ ...content, contact_hero: { ...content.contact_hero, badge: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Line 1
                  </label>
                  <input
                    type="text"
                    value={content.contact_hero.line1}
                    onChange={(e) =>
                      setContent({ ...content, contact_hero: { ...content.contact_hero, line1: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Line 2
                  </label>
                  <input
                    type="text"
                    value={content.contact_hero.line2}
                    onChange={(e) =>
                      setContent({ ...content, contact_hero: { ...content.contact_hero, line2: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Form Info */}
          {activeTab === 'contact_form_info' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Form Title Line 1
                  </label>
                  <input
                    type="text"
                    value={content.contact_form_info.headingLine1}
                    onChange={(e) =>
                      setContent({ ...content, contact_form_info: { ...content.contact_form_info, headingLine1: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Form Title Line 2
                  </label>
                  <input
                    type="text"
                    value={content.contact_form_info.headingLine2}
                    onChange={(e) =>
                      setContent({ ...content, contact_form_info: { ...content.contact_form_info, headingLine2: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Form Intro Paragraph
                </label>
                <textarea
                  rows={3}
                  value={content.contact_form_info.description}
                  onChange={(e) =>
                    setContent({ ...content, contact_form_info: { ...content.contact_form_info, description: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <label className="block text-xs font-semibold uppercase text-gray-600">
                  Left-Side Guidance Box Title
                </label>
                <input
                  type="text"
                  value={content.contact_form_info.infoBoxTitle}
                  onChange={(e) =>
                    setContent({ ...content, contact_form_info: { ...content.contact_form_info, infoBoxTitle: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium"
                />

                <span className="text-[11px] font-bold text-gray-500 uppercase block pt-2">
                  Guidance Checklist Bullets ({content.contact_form_info.infoBoxBullets.length})
                </span>
                <div className="space-y-2">
                  {content.contact_form_info.infoBoxBullets.map((bullet, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={bullet}
                      onChange={(e) => {
                        const next = [...content.contact_form_info.infoBoxBullets];
                        next[idx] = e.target.value;
                        setContent({ ...content, contact_form_info: { ...content.contact_form_info, infoBoxBullets: next } });
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                    />
                  ))}
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1">Company Base Note</span>
                  <input
                    type="text"
                    value={content.contact_form_info.companyNote}
                    onChange={(e) =>
                      setContent({ ...content, contact_form_info: { ...content.contact_form_info, companyNote: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Alternative */}
          {activeTab === 'contact_alternative' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={content.contact_alternative.heading}
                  onChange={(e) =>
                    setContent({ ...content, contact_alternative: { ...content.contact_alternative, heading: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Email Label & Value</span>
                  <input
                    type="text"
                    value={content.contact_alternative.emailLabel}
                    onChange={(e) =>
                      setContent({ ...content, contact_alternative: { ...content.contact_alternative, emailLabel: e.target.value } })
                    }
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                  />
                  <input
                    type="email"
                    value={content.contact_alternative.emailValue}
                    onChange={(e) =>
                      setContent({ ...content, contact_alternative: { ...content.contact_alternative, emailValue: e.target.value } })
                    }
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 font-medium"
                  />
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Phone Label & Value</span>
                  <input
                    type="text"
                    value={content.contact_alternative.phoneLabel}
                    onChange={(e) =>
                      setContent({ ...content, contact_alternative: { ...content.contact_alternative, phoneLabel: e.target.value } })
                    }
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                  />
                  <input
                    type="text"
                    value={content.contact_alternative.phoneValue}
                    onChange={(e) =>
                      setContent({ ...content, contact_alternative: { ...content.contact_alternative, phoneValue: e.target.value } })
                    }
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 font-medium"
                  />
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Hours Label & Value</span>
                  <input
                    type="text"
                    value={content.contact_alternative.hoursLabel}
                    onChange={(e) =>
                      setContent({ ...content, contact_alternative: { ...content.contact_alternative, hoursLabel: e.target.value } })
                    }
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900"
                  />
                  <input
                    type="text"
                    value={content.contact_alternative.hoursValue}
                    onChange={(e) =>
                      setContent({ ...content, contact_alternative: { ...content.contact_alternative, hoursValue: e.target.value } })
                    }
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* SITE-WIDE SETTINGS (FOOTER & GLOBAL) */}
          {/* ======================================================= */}
          {activeTab === 'contact_info' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={content.contact_info.email}
                    onChange={(e) =>
                      setContent({ ...content, contact_info: { ...content.contact_info, email: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                    Official Phone
                  </label>
                  <input
                    type="text"
                    value={content.contact_info.phone}
                    onChange={(e) =>
                      setContent({ ...content, contact_info: { ...content.contact_info, phone: e.target.value } })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Headquarters Physical Address
                </label>
                <input
                  type="text"
                  value={content.contact_info.address}
                  onChange={(e) =>
                    setContent({ ...content, contact_info: { ...content.contact_info, address: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Footer Brand Tagline
                </label>
                <textarea
                  rows={2}
                  value={content.contact_info.tagline}
                  onChange={(e) =>
                    setContent({ ...content, contact_info: { ...content.contact_info, tagline: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                  Footer Subtext
                </label>
                <input
                  type="text"
                  value={content.contact_info.subtext}
                  onChange={(e) =>
                    setContent({ ...content, contact_info: { ...content.contact_info, subtext: e.target.value } })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900"
                />
              </div>
            </div>
          )}

          {/* Bottom Save Action Bar */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs text-gray-500 hover:text-gray-800 font-medium underline flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset this section to defaults</span>
            </button>

            <button
              type="button"
              onClick={handleSaveActiveSection}
              disabled={isSaving}
              className="bg-[#111315] hover:bg-black text-white font-medium text-xs px-6 py-2.5 rounded-xl transition-all shadow-md shadow-black/10 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Publishing Changes...' : 'Save & Publish Changes'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
