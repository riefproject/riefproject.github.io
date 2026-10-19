import { getCollection, getEntry } from 'astro:content';
import { getContentSlug, sortByOrder } from '../../utils/content';
import { jsonResponse } from '../../utils/http';

export async function GET() {
  const layoutEntry = await getEntry('singletons', 'layout');
  const layout = layoutEntry?.data || { projectsOrder: [] };

  const projectsCollection = await getCollection('projects');
  const projects = sortByOrder(
    projectsCollection
      .map(p => ({ ...p.data, id: p.id }))
      .sort((a, b) => b.year - a.year),
    layout.projectsOrder || [],
    getContentSlug,
  );

  return jsonResponse(projects);
}
