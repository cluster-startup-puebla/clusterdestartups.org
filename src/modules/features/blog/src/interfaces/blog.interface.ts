export interface BlogPostImage {
  src: string;
  alt: string;
  /** Pie visible bajo la foto. Si no viene, la imagen solo usa el alt. */
  caption?: string;
}

export interface BlogPost {
  slug: string;
  locale: string;
  /** "sala-de-prensa" (institucional, aparece en /prensa) o "comunidad" (workshops, convocatorias; /blog) */
  category: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  /** Slugs del padrón (`companies.ts`) que esta nota vincula. */
  companies?: string[];
  image?: BlogPostImage;
  /** Fotos extra, además de la portada. También se pueden insertar en el markdown. */
  images?: BlogPostImage[];
  readingMinutes: number;
  contentHtml: string;
}

export type PostMeta = Omit<BlogPost, "contentHtml">;
