import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="es">
      <body>
        <main style={{ fontFamily: "sans-serif", padding: "4rem 1.5rem", textAlign: "center" }}>
          <h1>404</h1>
          <p>Esa página no está en el clúster.</p>
          <p>
            <Link href="/es/">Ir al inicio</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
