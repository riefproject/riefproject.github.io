import { getCollection, getEntry } from 'astro:content';
import { getContentSlug, sortByOrder } from '../../utils/content';
import { jsonResponse } from '../../utils/http';

export async function GET() {
  const layoutEntry = await getEntry('singletons', 'layout');
  const layout = layoutEntry?.data || { experiencesOrder: [] };

  const expsCollection = await getCollection('experiences');
  const experiences = sortByOrder(
    expsCollection.map(e => ({ ...e.data, id: e.id })),
    layout.experiencesOrder || [],
    getContentSlug,
  );

  return jsonResponse(experiences);
}
