import { type SchemaTypeDefinition, defineField, defineType } from 'sanity'

import { heroType } from './hero'
import { statsType } from './stats'
import { whatWeHelpWithType } from './whatWeHelpWith'
import { tailoredServicesType } from './tailoredServices'
import { howItWorksType } from './howItWorks'
import { pageType } from './page'
import { settingsType } from './settings'
import { seoType } from './seo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType, statsType, whatWeHelpWithType, tailoredServicesType, howItWorksType, pageType, settingsType, seoType],
}
