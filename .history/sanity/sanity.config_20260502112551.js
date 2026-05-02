import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { deskStructure } from './deskStructure'
import { muxInput } from 'sanity-plugin-mux-input'

export default defineConfig({
  name: 'default',
  title: 'rif.ke',

  projectId: '5hal0fpp',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    muxInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
