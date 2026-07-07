import { getEntry } from 'astro:content';

export async function GET() {
  const profileEntry = await getEntry('singletons', 'profile');
  const contactEntry = await getEntry('singletons', 'contact');

  return new Response(JSON.stringify({
    profile: profileEntry?.data,
    contact: contactEntry?.data
  }, null, 2), {
    status: 200, headers: { 'Content-Type': 'application/json' }
  });
}
