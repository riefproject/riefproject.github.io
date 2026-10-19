import { getCollection, getEntry } from 'astro:content';
import { getContentSlug, sortByOrder } from '../../utils/content';
import { jsonResponse } from '../../utils/http';

export async function GET() {
  const layoutEntry = await getEntry('singletons', 'layout');
  const layout = layoutEntry?.data || { achievementsOrder: [] };

  const achievementsCollection = await getCollection('achievements');
  const achievements = sortByOrder(
    achievementsCollection.map(a => ({ ...a.data, id: a.id })),
    layout.achievementsOrder || [],
    getContentSlug,
  );

  return jsonResponse(achievements);
}
