import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) {
    return new Response('API only available in development mode', { status: 403 });
  }

  try {
    const formData = await request.formData();
    // Support both 'pdf' (from CvComposer) and 'cv' (legacy)
    const cvFile = (formData.get('pdf') || formData.get('cv')) as File | null;

    if (!cvFile) {
      return new Response('No CV file provided', { status: 400 });
    }

    const buffer = Buffer.from(await cvFile.arrayBuffer());
    
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const publicPdfDir = path.resolve(__dirname, '../../../public/pdf');
    
    if (!fs.existsSync(publicPdfDir)) {
      fs.mkdirSync(publicPdfDir, { recursive: true });
    }

    // Use the file's name if provided, otherwise default
    const filename = cvFile.name || 'cv-arief.pdf';
    const destPath = path.join(publicPdfDir, filename);
    fs.writeFileSync(destPath, buffer);

    // Also support saving HTML source if provided from legacy component
    const htmlCode = formData.get('html') as string | null;
    const cssCode = formData.get('css') as string | null;
    
    if (htmlCode || cssCode) {
      const cvSourceDir = path.resolve(__dirname, '../../../src/data/cv');
      if (!fs.existsSync(cvSourceDir)) {
        fs.mkdirSync(cvSourceDir, { recursive: true });
      }
      if (htmlCode) fs.writeFileSync(path.join(cvSourceDir, 'source.html'), htmlCode);
      if (cssCode) fs.writeFileSync(path.join(cvSourceDir, 'source.css'), cssCode);
    }

    return new Response(JSON.stringify({ success: true, path: destPath }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error uploading CV:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
