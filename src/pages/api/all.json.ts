import { getSingleton, getSortedProjects, getSortedExperiences, getSortedAchievements, getEducation } from '../../utils/content-collections'
import { jsonResponse } from '../../utils/http'

export async function GET() {
  const [profile, contact, education, experiences, projects, achievements] = await Promise.all([
    getSingleton('profile'),
    getSingleton('contact'),
    getEducation(),
    getSortedExperiences(),
    getSortedProjects(),
    getSortedAchievements(),
  ])

  return jsonResponse({ profile, contact, education, experiences, projects, achievements })
}
