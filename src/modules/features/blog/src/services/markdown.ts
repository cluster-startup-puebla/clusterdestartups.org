import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { BlogPost, BlogPostImage } from "../interfaces/blog.interface";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

marked.use({ gfm: true, async: false });

interface Frontmatter {
  title: string;
  description: string;
  excerpt: string;
  date: string;
  author: string;
  category?: string;
  tags: string[];
  image?: BlogPostImage;
}

export const CATEGORIES = {
  press: "sala-de-prensa",
  community: "comunidad",
} as const;

function parseFile(fileName: string): BlogPost {
  const [slug, locale] = fileName.replace(/\.md$/, "").split(".");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf-8");
  const { data, content } = matter(raw);
  const meta = data as Frontmatter;
  const words = content.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    locale,
    category: meta.category ?? CATEGORIES.community,
    title: meta.title,
    description: meta.description,
    excerpt: meta.excerpt,
    date: meta.date,
    author: meta.author,
    tags: meta.tags ?? [],
    image: meta.image,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    contentHtml: marked.parse(content) as string,
  };
}

export function listPosts(locale: string, category?: string): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(`.${locale}.md`))
    .map(parseFile)
    .filter((post) => !category || post.category === category)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string, locale: string): BlogPost | undefined {
  const file = `${slug}.${locale}.md`;
  if (!fs.existsSync(path.join(CONTENT_DIR, file))) return undefined;
  return parseFile(file);
}

export function getPostSlugs(locale: string): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(`.${locale}.md`))
    .map((f) => f.replace(`.${locale}.md`, ""));
}
