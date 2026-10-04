import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");

fs.writeFileSync(
  path.join(outDir, "index.html"),
  `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0;url=/es/">
    <link rel="canonical" href="/es/">
    <title>Clúster de Startups</title>
  </head>
  <body>
    <script>window.location.replace("/es/");</script>
    <a href="/es/">Ir al clúster</a>
  </body>
</html>
`,
);

function flattenMetadataFile(name) {
  const asFile = path.join(outDir, name);
  const asDir = asFile;
  if (!fs.existsSync(asDir) || !fs.statSync(asDir).isDirectory()) return;
  const nested = ["index.xml", "index.txt", "index.html"]
    .map((file) => path.join(asDir, file))
    .find((file) => fs.existsSync(file));
  if (!nested) return;
  const tmp = `${asFile}.tmp`;
  fs.renameSync(nested, tmp);
  fs.rmSync(asDir, { recursive: true, force: true });
  fs.renameSync(tmp, asFile);
}

flattenMetadataFile("sitemap.xml");
flattenMetadataFile("robots.txt");

fs.writeFileSync(
  path.join(outDir, ".htaccess"),
  `DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^sitemap\\.xml/$ /sitemap.xml [R=301,L]
  RewriteRule ^robots\\.txt/$ /robots.txt [R=301,L]
</IfModule>

<IfModule mod_headers.c>
  <Files "sitemap.xml">
    Header set Content-Type "application/xml; charset=utf-8"
  </Files>
  <Files "robots.txt">
    Header set Content-Type "text/plain; charset=utf-8"
  </Files>

  <FilesMatch "\\.(?:html|htm)$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>

  <FilesMatch "\\.(?:avif|webp|gif|jpe?g|png|svg|ico|woff2)$">
    Header set Cache-Control "public, max-age=604800"
  </FilesMatch>

  # <If> is merged after FilesMatch, so hashed /_next/static/ files (including woff2) stay immutable.
  <If "%{REQUEST_URI} =~ m#^/_next/static/#">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </If>
</IfModule>
`,
);

console.log("index.html redirect written to out/");
