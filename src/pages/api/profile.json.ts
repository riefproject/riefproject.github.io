import { getSingleton } from '../../utils/content-collections'
import { jsonResponse } from '../../utils/http'

export async function GET() {
  const [profile, contact] = await Promise.all([getSingleton('profile'), getSingleton('contact')])

  return jsonResponse({ profile, contact })
}
