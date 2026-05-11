import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { deskStructure } from './deskStructure';
import { muxInput } from 'sanity-plugin-mux-input';

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['settings', 'archive', 'homePage',]);


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
		templates: (templates) =>
			templates.filter(({ schemaType }) => {
				console.log(schemaType)
				return !singletonTypes.has(schemaType) || schemaType === 'mux.videoAsset'
			}),
  },

	document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
