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

fs.writeFileSync(path.join(outDir, ".htaccess"), `DirectoryIndex index.html\n`);

console.log("index.html redirect written to out/");
