import { getCollection, getEntry } from 'astro:content';
import { getContentSlug, sortByOrder } from '../../utils/content';
import { jsonResponse } from '../../utils/http';

export async function GET() {
  const profileEntry = await getEntry('singletons', 'profile');
  const contactEntry = await getEntry('singletons', 'contact');
  const layoutEntry = await getEntry('singletons', 'layout');
  const layout = layoutEntry?.data || { projectsOrder: [], experiencesOrder: [], achievementsOrder: [] };

  const projectsCollection = await getCollection('projects');
  const projects = sortByOrder(
    projectsCollection
      .map(p => ({ ...p.data, id: p.id }))
      .sort((a, b) => b.year - a.year),
    layout.projectsOrder || [],
    getContentSlug,
  );

  const expsCollection = await getCollection('experiences');
  const experiences = sortByOrder(
    expsCollection.map(e => ({ ...e.data, id: e.id })),
    layout.experiencesOrder || [],
    getContentSlug,
  );

  const achievementsCollection = await getCollection('achievements');
  const achievements = sortByOrder(
    achievementsCollection.map(a => ({ ...a.data, id: a.id })),
    layout.achievementsOrder || [],
    getContentSlug,
  );

  const eduCollection = await getCollection('education');
  const education = eduCollection.map(e => ({ ...e.data, id: e.id }));

  return jsonResponse({ profile: profileEntry?.data, contact: contactEntry?.data, education, experiences, projects, achievements });
}
