export const prerender = false;

export const POST = async ({ request }: { request: Request }) => {
  if (!import.meta.env.DEV) {
    return new Response(JSON.stringify({ error: 'Only allowed in dev mode' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const { fileURLToPath } = await import('node:url');

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const cvSourceDir = path.resolve(__dirname, '../../../src/data/cv');
    
    if (!fs.existsSync(cvSourceDir)) {
      fs.mkdirSync(cvSourceDir, { recursive: true });
    }

    const formData = await request.formData();
    const htmlCode = formData.get('html') as string | null;
    const cssCode = formData.get('css') as string | null;

    if (htmlCode !== null) {
      fs.writeFileSync(path.join(cvSourceDir, 'source.html'), htmlCode);
    }
    
    if (cssCode !== null) {
      fs.writeFileSync(path.join(cvSourceDir, 'source.css'), cssCode);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
