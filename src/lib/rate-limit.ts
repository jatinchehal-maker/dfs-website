import { getCloudflareContext } from "@opennextjs/cloudflare";

type Limiter = { limit: (options: { key: string }) => Promise<{ success: boolean }> };

/**
 * True when this visitor may submit a form now. Uses the Cloudflare rate-limit binding
 * FORM_LIMITER from wrangler.jsonc. Allows the request when the binding is missing (local `next dev`).
 */
export async function allowFormSubmit(request: Request): Promise<boolean> {
  const ip = request.headers.get("cf-connecting-ip");
  let limiter: Limiter | undefined;
  try {
    limiter = (getCloudflareContext().env as { FORM_LIMITER?: Limiter }).FORM_LIMITER;
  } catch {
    return true; // Not running on Cloudflare.
  }
  if (!limiter || !ip) return true;
  try {
    const { success } = await limiter.limit({ key: ip });
    return success;
  } catch (err) {
    console.error("[form] rate limiter failed; allowing request", err);
    return true;
  }
}
