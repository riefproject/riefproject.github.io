import { getSortedExperiences } from '../../utils/content-collections'
import { jsonResponse } from '../../utils/http'

export async function GET() {
  return jsonResponse(await getSortedExperiences())
}
