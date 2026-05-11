import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { deskStructure } from './deskStructure';
import { muxInput } from 'sanity-plugin-mux-input';

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['settings', 'home', 'terms', 'privacy', 'projectsPage', 'about', 'contact', 'shop', ]);


// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['settings', 'home', 'terms', 'privacy', 'projectsPage', 'about', 'contact', 'shop', ]);


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
