import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const POST: APIRoute = async ({ request }) => {
  // Security check: Only allow this in dev mode
  if (!import.meta.env.DEV) {
    return new Response('API only available in development mode', { status: 403 });
  }

  try {
    const formData = await request.formData();
    const cvFile = formData.get('cv') as File | null;

    if (!cvFile) {
      return new Response('No CV file provided', { status: 400 });
    }

    const buffer = Buffer.from(await cvFile.arrayBuffer());
    
    // Determine the path to the public directory
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // Path resolution: src/pages/api -> ../../../public/pdf
    const publicPdfDir = path.resolve(__dirname, '../../../public/pdf');
    
    // Ensure directory exists
    if (!fs.existsSync(publicPdfDir)) {
      fs.mkdirSync(publicPdfDir, { recursive: true });
    }

    // Write the PDF file
    const destPath = path.join(publicPdfDir, 'cv-arief-in.pdf');
    fs.writeFileSync(destPath, buffer);

    // Save the HTML and CSS sources
    const htmlCode = formData.get('html') as string | null;
    const cssCode = formData.get('css') as string | null;
    
    const cvSourceDir = path.resolve(__dirname, '../../../src/data/cv');
    if (!fs.existsSync(cvSourceDir)) {
      fs.mkdirSync(cvSourceDir, { recursive: true });
    }
    
    if (htmlCode) {
      fs.writeFileSync(path.join(cvSourceDir, 'source.html'), htmlCode);
    }
    if (cssCode) {
      fs.writeFileSync(path.join(cvSourceDir, 'source.css'), cssCode);
    }

    return new Response(JSON.stringify({ success: true, path: destPath }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error uploading CV:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
