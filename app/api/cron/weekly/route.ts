import { NextResponse } from 'next/server';

// Weekly Vercel Cron Job. Triggers a fresh rebuild of the site so the sitemap
// lastmod stays current and any new blog content goes live automatically.
// Visible in the Vercel dashboard under Settings -> Cron Jobs.
export async function GET() {
  const hook = process.env.DEPLOY_HOOK_URL;
  let rebuild = 'skipped (no DEPLOY_HOOK_URL)';

  if (hook) {
    try {
      await fetch(hook, { method: 'POST' });
      rebuild = 'triggered';
    } catch (e) {
      rebuild = 'error: ' + String(e).slice(0, 120);
    }
  }

  return NextResponse.json({
    ok: true,
    job: 'weekly-site-refresh',
    rebuild,
    ranAt: new Date().toISOString(),
  });
}
