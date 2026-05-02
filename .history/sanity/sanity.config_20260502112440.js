import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { deskStructure } from './deskStructure'
import { muxInput } from 'sanity-plugin-mux-input'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

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
    muxInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
