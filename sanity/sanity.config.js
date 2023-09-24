import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { deskStructure } from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'rif.ke',

  projectId: '5hal0fpp',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
