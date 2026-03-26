import { groq } from 'next-sanity'

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  seo {
    metaTitle,
    metaDescription,
    shareImage {
      asset-> {
        _id,
        url
      }
    }
  },
  sections[]{
    _type == "hero" => {
      _type,
      titleLine1,
      titleLine2Italic,
      titleLine2Normal,
      titleLine3,
      subtitle,
      ctaText,
      image
    },
    _type == "stats" => {
      _type,
      heading,
      subtext,
      statsList
    },
    _type == "whatWeHelpWith" => {
      _type,
      heading,
      tagline,
      description1,
      description2,
      services
    },
    _type == "tailoredServices" => {
      _type,
      heading,
      services[]{
        title,
        image
      }
    },
    _type == "howItWorks" => {
      _type,
      heading,
      steps[]{
        title,
        description,
        iconName
      },
      noteTitle,
      noteText
    }
  }
}`

export const SETTINGS_QUERY = groq`*[_type == "settings"][0]{
  footerDescription,
  contactEmail,
  contactPhone,
  contactAddress,
  socialLinks
}`
