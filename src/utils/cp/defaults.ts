import fallback from '../../data/cp-fallback.json'

/**
 * Single source of truth for CP fallback values.
 *
 * These numbers are only used when live data is unavailable (initial render,
 * missing JSON fields, or standalone component usage). `cp-fallback.json` is
 * generated from the synced CP snapshot by `npm run sync:cp-fallback`, and
 * `npm run validate:data` fails if the two files drift.
 */
export const CP_FALLBACK = fallback
