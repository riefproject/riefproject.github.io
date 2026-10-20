import contactData from '../content/singletons/contact.json'
import type { Contact } from '../types/profile.types'

/**
 * Synchronous contact data for layout-level components.
 * The content collection remains the single source of truth.
 */
export const contact = contactData as Contact
