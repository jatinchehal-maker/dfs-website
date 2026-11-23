import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No R2 incremental cache: the site is static content, so the free plan is enough.
export default defineCloudflareConfig({});
