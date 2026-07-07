import { getCollection, getEntry } from 'astro:content';

export async function GET() {
  const layoutEntry = await getEntry('singletons', 'layout');
  const layout = layoutEntry?.data || { achievementsOrder: [] };

  const achievementsCollection = await getCollection('achievements');
  let achievements = achievementsCollection.map(a => ({ ...a.data, id: a.id }));
  
  const orderSlugs = layout.achievementsOrder || [];
  achievements = achievements.sort((a, b) => {
    const idxA = orderSlugs.indexOf(a.id.replace('.json', ''));
    const idxB = orderSlugs.indexOf(b.id.replace('.json', ''));
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return 0;
  });

  return new Response(JSON.stringify(achievements, null, 2), {
    status: 200, headers: { 'Content-Type': 'application/json' }
  });
}
