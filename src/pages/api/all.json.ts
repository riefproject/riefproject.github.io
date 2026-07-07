import { getCollection, getEntry } from 'astro:content';

const sortByOrder = (collection: any[], orderSlugs: string[]) => {
  return collection.sort((a, b) => {
    const slugA = a.id.replace('.json', '');
    const slugB = b.id.replace('.json', '');
    const idxA = orderSlugs.indexOf(slugA);
    const idxB = orderSlugs.indexOf(slugB);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return 0;
  });
};

export async function GET() {
  const profileEntry = await getEntry('singletons', 'profile');
  const contactEntry = await getEntry('singletons', 'contact');
  const layoutEntry = await getEntry('singletons', 'layout');
  const layout = layoutEntry?.data || { projectsOrder: [], experiencesOrder: [], achievementsOrder: [] };

  const projectsCollection = await getCollection('projects');
  const projects = sortByOrder(projectsCollection.map(p => ({ ...p.data, id: p.id })).sort((a, b) => b.year - a.year), layout.projectsOrder || []);

  const expsCollection = await getCollection('experiences');
  const experiences = sortByOrder(expsCollection.map(e => ({ ...e.data, id: e.id })), layout.experiencesOrder || []);

  const achievementsCollection = await getCollection('achievements');
  const achievements = sortByOrder(achievementsCollection.map(a => ({ ...a.data, id: a.id })), layout.achievementsOrder || []);

  const eduCollection = await getCollection('education');
  const education = eduCollection.map(e => ({ ...e.data, id: e.id }));

  return new Response(JSON.stringify({ profile: profileEntry?.data, contact: contactEntry?.data, education, experiences, projects, achievements }, null, 2), {
    status: 200, headers: { 'Content-Type': 'application/json' }
  });
}
