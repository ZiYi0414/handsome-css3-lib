import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { ContentType, PickContentProps } from 'types/component';

export async function getFiles(type: ContentType) {
  return readdirSync(join(process.cwd(), 'src', 'contents', type));
}

export async function getFileBySlug(type: ContentType, slug: string) {
  const source = slug
    ? readFileSync(
        join(process.cwd(), 'src', 'contents', type, `${slug}.mdx`),
        'utf8'
      )
    : readFileSync(
        join(process.cwd(), 'src', 'contents', `${type}.mdx`),
        'utf8'
      );

  return {
    frontmatter: {
      slug: slug || null
    }
  };
}

export async function getAllFilesFrontmatter<T extends ContentType>(type: T) {
  const files = readdirSync(join(process.cwd(), 'src', 'contents', type));

  return files.reduce((allPosts: Array<PickContentProps<T>>, postSlug) => {
    const source = readFileSync(
      join(process.cwd(), 'src', 'contents', type, postSlug),
      'utf8'
    );
    const { data, content } = matter(source);
    const result = {
      html: '',
      css: ''
    };
    const format = content.split('```');
    format.forEach(e => {
      if (e.indexOf('html') != -1) {
        result.html = e.replace('html', '');
      } else if (e.indexOf('css') != -1) {
        result.css = e.replace('css', '');
      }
    });

    const res = [
      {
        ...(data as any),
        content,
        ...result,
        slug: postSlug.replace('.mdx', '')
      },
      ...allPosts
    ];
    return res;
  }, []);
}
