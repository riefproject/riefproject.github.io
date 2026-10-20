import profileData from '../content/singletons/profile.json'
import type { Profile } from '../types/profile.types'

/**
 * Layout, footer, and head tags need a synchronous profile object.
 * Keep the content collection as the single source of truth and re-export it
 * here instead of maintaining a second copy of the profile fields.
 */
export const profile = profileData as Profile
