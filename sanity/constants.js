

// Document ids which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_IDS = [ 'homePage', 'settings', 'info'];

// References to include in 'internal' links
export const PAGE_REFERENCES = [
  { type: 'homePage' },
]

// API version to use when using the Sanity client within the studio
// https://www.sanity.io/help/studio-client-specify-api-version
export const SANITY_API_VERSION = '2021-06-07'