/**
 * Desk structure overrides
 *
 * This file configure how documents are structured in the Studio's desk tool.
 * It works because
    {
      "name": "part:@sanity/desk-tool/structure",
      "path": "./deskStructure.js"
    },
  * is added to the `parts` array in `/sanity.json`.
  *
  * Sanity Studio automatically lists document types out of the box.
  * With this custom desk structure we achieve things like showing the `home`
  * and `settings` document types as singletons, and grouping product details
  * and variants for easy editorial access.
  *
  * You can customize this even further as your schemas progress.
  * To learn more info structure builder, visit our docs:
  * https://www.sanity.io/docs/overview-structure-builder
 */

export const deskStructure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .icon(() => '🏠')
        .title('Homepage')
        .child(
          S.document()
            .title('Homepage')
            .schemaType('homePage')
            .documentId('homePage'),
            ...S.documentTypeListItems().filter((listItem ) => !['homePage'].includes(listItem.getId()))
        ),
      S.listItem()
        .icon(() => '🗒️')
        .title('Items')
        .child(
          S.documentList()
            .title('Items')
            .filter('_type == "item"')
            .defaultOrdering([ { field: 'title', direction: 'asc' } ])
            .menuItems(S.documentTypeList('item').getMenuItems())
            .filter('_type == "item" && !(_id in path("drafts.**"))'),
      ),
      S.listItem()
        .icon(() => '⚙️')
        .title('Settings')
        .child(
          S.document()
            .title('Settings')
            .schemaType('settings')
            .documentId('settings'),
            ...S.documentTypeListItems().filter((listItem ) => !['settings'].includes(listItem.getId()))
        ),
    ]);

export const defaultDocumentNodeResolver = (S) =>
S.document().views([
  S.view.form()
]);
