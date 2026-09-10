export interface BlogPostImage {
  src: string;
  alt: string;
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
  image?: BlogPostImage;
  readingMinutes: number;
  contentHtml: string;
}

export type PostMeta = Omit<BlogPost, "contentHtml">;
