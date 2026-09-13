# Reusable fashion theme foundation

This is an incremental extension of Shopify Horizon 4.1.5, not a replacement commerce engine. The existing theme uses Online Store 2.0 JSON templates, nested theme blocks, Liquid snippets, native custom elements and modular JavaScript. The original settings, template assignments, merchant content and brand-specific legacy section remain intact. No store was uploaded or published.

## Enable and configure

1. In Customize, open the new Framework layout, Framework buttons, Framework product cards, Framework variant selectors and Framework cart groups. Enable each shared styling switch to apply its controls. Existing Colors, Typography, Buttons, Inputs, Swatches, product image and cart controls continue to provide the underlying design system.
2. Preview the `product.framework` template. It uses the standard product information section, enables swatches, sets a 55% gallery split, enables sticky add to cart and adds blank-safe material/feature sections. Assign it to selected products only after storefront preview testing.
3. In Product details, configure the Size guide block with a Shopify page. The link opens an accessible native dialog and remains a normal page link without JavaScript. Add Product metafield blocks anywhere that accepts theme blocks.
4. Preview `collection.framework`. Configure Shopify storefront filters in Search & Discovery. The template enables native filtering and exact 4/3/2 desktop/tablet/mobile grid columns. The section controls only affect grid layout, preserving editorial layouts and the zoom-out view.
5. Enable free-shipping progress only after matching the threshold to actual Shopify shipping rates. It is promotional messaging, not a shipping eligibility calculation. The threshold is interpreted in the active presentment currency; a single threshold is unsuitable when markets need different amounts.

New labels are available in the language editor. Arabic translations are provided for the new storefront messages; other shipped languages currently use English for those new messages. Existing translations remain unchanged. Color and size option-name lists are comma separated and support translated names. Native Shopify swatches are detected independently of names. Turn on the existing variant-image setting when images should take precedence over native color swatches.

## Architecture and completed extensions

| Area | Implementation |
| --- | --- |
| Foundation | Namespaced global settings, `framework-tokens.liquid`, `framework.css`; opt-in layout, responsive gutters, button sizing/hover, card appearance, selector dimensions and drawer styling |
| Variants | Corrected dropdown detection; reset option-specific state each loop; translated color/size detection; native swatches, image fallback and visible text fallback; retained option-value section rendering |
| Product cards | Shared padding, border, background, radius, shadow, title limits, image ratios and fit; existing responsive media, card swatches, second image and AJAX quick add retained |
| Product page | Opt-in 40?70% gallery width; reusable size-guide and metafield blocks; blank-safe material/fit and four-feature sections; existing galleries, blocks, SKU/price updates and sticky cart retained |
| Collections | Exact responsive columns and named size-filter buttons added; existing sidebar/horizontal filters, mobile drawer, swatches, active chips, sorting and AJAX history retained |
| Cart | Configurable drawer width/padding/radius and server-rendered shipping progress inside the existing cart refresh region; existing quantity, removal, discounts, notes and checkout preserved |
| RTL | Document direction based on language; logical positioning for variant dropdown icons; new components use logical spacing |

The file names intentionally follow Horizon rather than creating duplicate main-product or main-collection sections. Retained APIs include `product_option_value.id`, option availability and native section rendering. There is no all-variant JSON array and no client-side product filtering.

## Metafield setup

Create product definitions in Shopify Settings > Custom data > Products, under the `custom` namespace:

- `fabric_material`, `fit`, `model_height`, `model_size`: single-line text.
- `care_instructions`: multiline or rich text.
- `feature_1_title` through `feature_4_title`: single-line text.
- `feature_1_text` through `feature_4_text`: multiline or rich text.

The optional Product metafield block accepts a text/rich-text key from this namespace. Empty fields and empty sections produce no storefront content. The theme does not create Admin definitions or metaobjects. Metaobject-based content needs a separately designed definition and is not implemented in this foundation.

## Validation and remaining work

Local checks: all section/block schema JSON parses; global IDs are unique; new ranges satisfy bounds, increments and step counts; new JavaScript passes `node --check`; `git diff --check` passes. Shopify CLI Theme Check reported the same six errors and five warnings as the untouched baseline, with no new findings. Existing errors are repeated static block IDs in product-list, main-cart, collection-links and header. They were not suppressed or changed as part of this work.

Responsive layout arithmetic was reviewed at 320, 375, 430, 768, 1024, 1440 and 1920px. This is not a browser rendering test. Live Shopify preview, Theme Editor interaction, accessibility and commerce integration tests have not been run. Before release verify:

- One/default variant, native color/image swatches, translated option names, unavailable combinations, sold-out products, many variants and quick-add modal selection.
- Price, compare-at, media, SKU, add-to-cart and sticky-cart updates; rapid selection and request failures.
- Drawer quantity/removal, shipping progress, cart notes/discounts and Shopify checkout handoff.
- Native filtering, price/currency inputs, zero results, sort, back/forward navigation and pagination.
- Product without media or metafields; long titles/prices; guide keyboard focus, Escape and no-JavaScript link fallback.
- Mobile and desktop widths listed above, Arabic RTL, reduced motion and storefront theme-editor section reloads.

The wider 61-part specification is not entirely implemented. This delivery completes the foundation and adds extensions in the requested priority order. Further work includes additional filter layouts/placement and sidebar sizing, full-theme RTL audit, wishlist integration, recent-product storefront section, extended badges, feature icons/metaobjects, additional gallery modes, market-aware shipping rules, cart recommendations and the remaining section-level/mobile controls. Existing Horizon header, predictive search and homepage section library are retained rather than represented as newly built custom features. A brand-neutral distributable export also requires replacing existing merchant settings and content in an isolated copy; the current export intentionally retains them.

## Next implementation phases

1. Run Shopify preview acceptance cases for variants, quick add, cards and product blocks; resolve any integration failures.
2. Extend filter layout controls and drawer presentation while retaining native rendering/history.
3. Add cart recommendations and market-specific shipping configuration.
4. Complete reusable homepage controls, gallery additions and content integrations.
5. Audit every inherited component for RTL, keyboard behavior, responsiveness and performance before producing a clean client starter export.
