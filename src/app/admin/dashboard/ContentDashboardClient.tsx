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
} from 'lucide-react';
import { saveSectionContentAction } from '../actions';
import { defaultSiteContent } from '@/lib/content/defaults';

type SiteContentState = typeof defaultSiteContent;

interface Props {
  initialContent: SiteContentState;
}

interface SectionItem {
  id: keyof SiteContentState;
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
    group: 'Site-wide Settings',
    items: [
      { id: 'contact_info', label: 'Contact & Company', icon: PhoneCall, desc: 'Email, phone, office address, & footer' },
    ],
  },
];

export default function ContentDashboardClient({ initialContent }: Props) {
  const [activeTab, setActiveTab] = useState<
    | 'home_hero'
    | 'home_stats'
    | 'home_what_we_help_with'
    | 'home_tailored_services'
    | 'home_how_it_works'
    | 'home_testimonials'
    | 'home_final_cta'
    | 'contact_info'
  >('home_hero');

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
    const category = activeTab === 'contact_info' ? 'global' : 'home';

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

  // Find active section meta
  const activeMeta = SECTIONS.flatMap((g) => g.items).find((i) => i.id === activeTab);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-medium border backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            toast.type === 'success'
              ? 'bg-emerald-900/90 text-white border-emerald-700 shadow-emerald-950/20'
              : 'bg-red-900/90 text-white border-red-700 shadow-red-950/20'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/70 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-serif text-gray-900 font-semibold tracking-tight">
              Website Content Manager
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Connected
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Modify text content across your site. All layouts, responsiveness, and styles remain safely locked.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 px-3.5 py-2.5 rounded-xl border border-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset active tab to original website text"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSaveActiveSection}
            disabled={isSaving}
            className="bg-[#111315] hover:bg-black text-white font-medium text-xs tracking-wide px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm active:scale-[0.98]"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Publishing...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar + Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Modern Sidebar Navigation (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {SECTIONS.map((group, gIdx) => (
            <div key={gIdx} className="bg-white rounded-2xl border border-gray-200/70 p-3 shadow-xs">
              <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {group.group}
              </div>
              <div className="space-y-1 mt-1">
                {group.items.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`w-full text-left px-3.5 py-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#111315] text-white font-medium shadow-sm'
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

          {/* Section 1: Hero */}
          {activeTab === 'home_hero' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Headline Line 1 (Prefix)
                  </label>
                  <input
                    type="text"
                    value={content.home_hero.line1Prefix}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home_hero: { ...content.home_hero, line1Prefix: e.target.value },
                      })
                    }
                    className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Line 1 (Pink Emphasis)
                    </label>
                    <span className="text-[10px] font-semibold text-[#cf587d] bg-[#fcecf1] px-2 py-0.5 rounded-full">
                      Italic Highlight
                    </span>
                  </div>
                  <input
                    type="text"
                    value={content.home_hero.line1Emphasis}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home_hero: { ...content.home_hero, line1Emphasis: e.target.value },
                      })
                    }
                    className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Headline Line 2
                </label>
                <input
                  type="text"
                  value={content.home_hero.line2}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_hero: { ...content.home_hero, line2: e.target.value },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Hero Subtitle / Description Paragraph
                </label>
                <textarea
                  rows={3}
                  value={content.home_hero.subtitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_hero: { ...content.home_hero, subtitle: e.target.value },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Primary Button Label
                  </label>
                  <input
                    type="text"
                    value={content.home_hero.ctaPrimaryText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home_hero: { ...content.home_hero, ctaPrimaryText: e.target.value },
                      })
                    }
                    className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Secondary Button Label
                  </label>
                  <input
                    type="text"
                    value={content.home_hero.ctaSecondaryText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home_hero: { ...content.home_hero, ctaSecondaryText: e.target.value },
                      })
                    }
                    className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Local / Trust Note (Small Footer Copy in Hero)
                </label>
                <textarea
                  rows={2}
                  value={content.home_hero.trustText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_hero: { ...content.home_hero, trustText: e.target.value },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Section 2: Stats & Trust */}
          {activeTab === 'home_stats' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Main Statement Heading
                </label>
                <input
                  type="text"
                  value={content.home_stats.heading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_stats: { ...content.home_stats, heading: e.target.value },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Subtext Description
                </label>
                <textarea
                  rows={3}
                  value={content.home_stats.subtext}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_stats: { ...content.home_stats, subtext: e.target.value },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Right Card Heading
                </label>
                <input
                  type="text"
                  value={content.home_stats.whyTrustTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_stats: { ...content.home_stats, whyTrustTitle: e.target.value },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>

              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                  Trust Points (4 Blocks)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.home_stats.trustPoints.map((point, index) => (
                    <div
                      key={index}
                      className="bg-[#fbfbfb] border border-gray-200/80 rounded-xl p-4 space-y-2.5"
                    >
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Pillar 0{index + 1}
                      </div>
                      <input
                        type="text"
                        value={point.title}
                        onChange={(e) => {
                          const newPoints = [...content.home_stats.trustPoints];
                          newPoints[index].title = e.target.value;
                          setContent({
                            ...content,
                            home_stats: { ...content.home_stats, trustPoints: newPoints },
                          });
                        }}
                        placeholder="Title"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-gray-900"
                      />
                      <textarea
                        rows={2}
                        value={point.desc}
                        onChange={(e) => {
                          const newPoints = [...content.home_stats.trustPoints];
                          newPoints[index].desc = e.target.value;
                          setContent({
                            ...content,
                            home_stats: { ...content.home_stats, trustPoints: newPoints },
                          });
                        }}
                        placeholder="Description"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-gray-900 leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 3: What We Help With */}
          {activeTab === 'home_what_we_help_with' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={content.home_what_we_help_with.heading}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home_what_we_help_with: {
                          ...content.home_what_we_help_with,
                          heading: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Tagline (Upper Badge)
                  </label>
                  <input
                    type="text"
                    value={content.home_what_we_help_with.tagline}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home_what_we_help_with: {
                          ...content.home_what_we_help_with,
                          tagline: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Advantage Paragraph 1
                </label>
                <textarea
                  rows={2}
                  value={content.home_what_we_help_with.description1}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_what_we_help_with: {
                        ...content.home_what_we_help_with,
                        description1: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Advantage Paragraph 2
                </label>
                <textarea
                  rows={2}
                  value={content.home_what_we_help_with.description2}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_what_we_help_with: {
                        ...content.home_what_we_help_with,
                        description2: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                  Services List (5 Items)
                </h3>
                <div className="space-y-3">
                  {content.home_what_we_help_with.services.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#fbfbfb] border border-gray-200/80 rounded-xl p-4 space-y-2.5"
                    >
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Service 0{index + 1}
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const newServices = [...content.home_what_we_help_with.services];
                          newServices[index].title = e.target.value;
                          setContent({
                            ...content,
                            home_what_we_help_with: {
                              ...content.home_what_we_help_with,
                              services: newServices,
                            },
                          });
                        }}
                        placeholder="Title"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-gray-900"
                      />
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const newServices = [...content.home_what_we_help_with.services];
                          newServices[index].description = e.target.value;
                          setContent({
                            ...content,
                            home_what_we_help_with: {
                              ...content.home_what_we_help_with,
                              services: newServices,
                            },
                          });
                        }}
                        placeholder="Description"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-gray-900 leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Tailored Services */}
          {activeTab === 'home_tailored_services' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={content.home_tailored_services.heading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_tailored_services: {
                        ...content.home_tailored_services,
                        heading: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>

              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                  Industry Cards (5 Cards)
                </h3>
                <div className="space-y-3">
                  {content.home_tailored_services.services.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#fbfbfb] border border-gray-200/80 rounded-xl p-4 space-y-2.5"
                    >
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Industry Card 0{index + 1}
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const newServices = [...content.home_tailored_services.services];
                          newServices[index].title = e.target.value;
                          setContent({
                            ...content,
                            home_tailored_services: {
                              ...content.home_tailored_services,
                              services: newServices,
                            },
                          });
                        }}
                        placeholder="Industry Title"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-gray-900"
                      />
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const newServices = [...content.home_tailored_services.services];
                          newServices[index].description = e.target.value;
                          setContent({
                            ...content,
                            home_tailored_services: {
                              ...content.home_tailored_services,
                              services: newServices,
                            },
                          });
                        }}
                        placeholder="Description"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-gray-900 leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 5: How It Works */}
          {activeTab === 'home_how_it_works' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={content.home_how_it_works.heading}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_how_it_works: {
                        ...content.home_how_it_works,
                        heading: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Note Badge Title
                  </label>
                  <input
                    type="text"
                    value={content.home_how_it_works.noteTitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home_how_it_works: {
                          ...content.home_how_it_works,
                          noteTitle: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Note Disclaimer Text
                  </label>
                  <input
                    type="text"
                    value={content.home_how_it_works.noteText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home_how_it_works: {
                          ...content.home_how_it_works,
                          noteText: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                  Process Steps (3 Steps)
                </h3>
                <div className="space-y-3">
                  {content.home_how_it_works.steps.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#fbfbfb] border border-gray-200/80 rounded-xl p-4 space-y-2.5"
                    >
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Step 0{index + 1}
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const newSteps = [...content.home_how_it_works.steps];
                          newSteps[index].title = e.target.value;
                          setContent({
                            ...content,
                            home_how_it_works: {
                              ...content.home_how_it_works,
                              steps: newSteps,
                            },
                          });
                        }}
                        placeholder="Step Title"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-gray-900"
                      />
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const newSteps = [...content.home_how_it_works.steps];
                          newSteps[index].description = e.target.value;
                          setContent({
                            ...content,
                            home_how_it_works: {
                              ...content.home_how_it_works,
                              steps: newSteps,
                            },
                          });
                        }}
                        placeholder="Step Description"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-gray-900 leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Testimonials */}
          {activeTab === 'home_testimonials' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Banner Label Prefix
                  </label>
                  <input
                    type="text"
                    value={content.home_testimonials.bannerPrefix}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home_testimonials: {
                          ...content.home_testimonials,
                          bannerPrefix: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Banner Highlighted Words
                  </label>
                  <input
                    type="text"
                    value={content.home_testimonials.bannerHighlight}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        home_testimonials: {
                          ...content.home_testimonials,
                          bannerHighlight: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors font-medium"
                  />
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                      Testimonial Quotes ({content.home_testimonials.testimonials.length} Total)
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Add, edit, or remove client reviews shown on the website.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newTestimonials = [
                        ...content.home_testimonials.testimonials,
                        {
                          quote: "Working with Prospera has given me complete financial clarity and peace of mind.",
                          author: "New Client",
                          role: "Business Owner",
                        },
                      ];
                      setContent({
                        ...content,
                        home_testimonials: {
                          ...content.home_testimonials,
                          testimonials: newTestimonials,
                        },
                      });
                      showToast('success', 'New testimonial added! Remember to click "Save Changes".');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#111315] hover:bg-black text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Testimonial</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {content.home_testimonials.testimonials.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#fbfbfb] border border-gray-200/80 rounded-xl p-4 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Review 0{index + 1}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Remove testimonial #${index + 1} (${item.author || 'Review'})?`)) {
                              const newTestimonials = content.home_testimonials.testimonials.filter((_, idx) => idx !== index);
                              setContent({
                                ...content,
                                home_testimonials: {
                                  ...content.home_testimonials,
                                  testimonials: newTestimonials,
                                },
                              });
                              showToast('success', 'Testimonial removed. Click "Save Changes" to publish.');
                            }
                          }}
                          className="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete this testimonial"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={3}
                        value={item.quote}
                        onChange={(e) => {
                          const newTestimonials = [...content.home_testimonials.testimonials];
                          newTestimonials[index].quote = e.target.value;
                          setContent({
                            ...content,
                            home_testimonials: {
                              ...content.home_testimonials,
                              testimonials: newTestimonials,
                            },
                          });
                        }}
                        placeholder="Quote"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-gray-900 leading-relaxed italic"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={item.author}
                          onChange={(e) => {
                            const newTestimonials = [...content.home_testimonials.testimonials];
                            newTestimonials[index].author = e.target.value;
                            setContent({
                              ...content,
                              home_testimonials: {
                                ...content.home_testimonials,
                                testimonials: newTestimonials,
                              },
                            });
                          }}
                          placeholder="Client Name"
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:border-gray-900"
                        />
                        <input
                          type="text"
                          value={item.role}
                          onChange={(e) => {
                            const newTestimonials = [...content.home_testimonials.testimonials];
                            newTestimonials[index].role = e.target.value;
                            setContent({
                              ...content,
                              home_testimonials: {
                                ...content.home_testimonials,
                                testimonials: newTestimonials,
                              },
                            });
                          }}
                          placeholder="Role / Company"
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-gray-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 7: Final CTA */}
          {activeTab === 'home_final_cta' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Headline
                </label>
                <input
                  type="text"
                  value={content.home_final_cta.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_final_cta: { ...content.home_final_cta, headline: e.target.value },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Body Paragraph
                </label>
                <textarea
                  rows={3}
                  value={content.home_final_cta.body}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_final_cta: { ...content.home_final_cta, body: e.target.value },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={content.home_final_cta.buttonText}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home_final_cta: { ...content.home_final_cta, buttonText: e.target.value },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Section 8: Contact & Company Info */}
          {activeTab === 'contact_info' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={content.contact_info.email}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact_info: { ...content.contact_info, email: e.target.value },
                      })
                    }
                    className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={content.contact_info.phone}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact_info: { ...content.contact_info, phone: e.target.value },
                      })
                    }
                    className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Office Physical Address
                </label>
                <input
                  type="text"
                  value={content.contact_info.address}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact_info: { ...content.contact_info, address: e.target.value },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Footer Brand Summary Tagline
                </label>
                <textarea
                  rows={2}
                  value={content.contact_info.tagline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact_info: { ...content.contact_info, tagline: e.target.value },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                  Footer Geographic Subtext
                </label>
                <input
                  type="text"
                  value={content.contact_info.subtext}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact_info: { ...content.contact_info, subtext: e.target.value },
                    })
                  }
                  className="w-full bg-[#fdfdfd] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Editing: <strong className="text-gray-900 font-semibold">{activeMeta?.label}</strong>
            </span>
            <button
              type="button"
              onClick={handleSaveActiveSection}
              disabled={isSaving}
              className="bg-[#111315] hover:bg-black text-white font-medium text-xs tracking-wide px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm active:scale-[0.98]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Publishing...' : 'Save Changes'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
