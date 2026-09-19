import { createClient } from '@/lib/supabase/server';
import { defaultSiteContent } from './defaults';

export type SiteContentKey = keyof typeof defaultSiteContent;

export async function getAllSiteContent(): Promise<typeof defaultSiteContent> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('site_content')
      .select('id, data');

    if (error || !data) {
      return defaultSiteContent;
    }

    const contentMap = { ...defaultSiteContent };

    data.forEach((row) => {
      const key = row.id as SiteContentKey;
      if (key in contentMap && row.data) {
        // Deep merge or object spread with fallback
        contentMap[key] = {
          ...contentMap[key],
          ...row.data,
        };
      }
    });

    return contentMap;
  } catch {
    return defaultSiteContent;
  }
}

export async function getSectionContent<K extends SiteContentKey>(
  key: K
): Promise<(typeof defaultSiteContent)[K]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('site_content')
      .select('data')
      .eq('id', key)
      .single();

    if (error || !data || !data.data) {
      return defaultSiteContent[key];
    }

    return {
      ...defaultSiteContent[key],
      ...data.data,
    };
  } catch {
    return defaultSiteContent[key];
  }
}
