// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import matter from 'gray-matter';
import {
  getAllComponetsFormGithubInServer,
  getComponentDetailFormGithubInServer
} from 'lib/api-github/api-github';
import { getCache, getKeys, hasCache, setCache } from 'lib/node-cache';
import { bundleMDX } from 'mdx-bundler';
import type { NextApiRequest, NextApiResponse } from 'next';
import rehypePrism from 'rehype-prism-plus';
import { resBody } from 'types/api';
import { ContentType } from 'types/component';
import { GitHubIssuesComponent } from 'types/github';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resBody<GitHubIssuesComponent[] | any>>
) {
  const { query } = req;
  const { slug } = query;

  if (typeof slug === 'string' && !!slug?.length) {
    const cacheKey = `detail-${slug}`;
    if (hasCache(cacheKey)) {
      // 直接搜索缓存空间
      res.status(200).json({
        code: 200,
        msg: 'cache hit success',
        data: getCache(cacheKey)
      });
      console.log(`%c [detail-${slug}] 缓存中有数据，缓存命中`);
      return;
    }
    const data = await getComponentDetailFormGithubInServer(Number(slug));
    if (data) {
      // const { data, content } = matter(e.body_text);
      // 提取数据部分

      const { code } = await bundleMDX({
        source: data.body,
        mdxOptions(options, _) {
          options.rehypePlugins = [
            ...(options.rehypePlugins ?? []),
            [rehypePrism, { showLineNumbers: true }]
          ];
          return options;
        }
      });
      const dataStr = data.body.split('---')[1].trim();

      // 将数据字符串转换为对象
      const dataObj: { [key: string]: string } = {};
      dataStr.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(item => item.trim());
        dataObj[key] = value;
      });

      const result = {
        code: code,
        body: data.body,
        html: '',
        css: '',
        title: dataObj?.title || data.title,
        slug: data.number.toString(),
        made_by: dataObj?.made_by || data.user.login,
        theme: dataObj?.theme || 'default',
        label: data.labels,
        user: data.user,
        url: data.user.url
      };
      const format = data.body.split('```');
      format.forEach(e => {
        if (e.indexOf('html') != -1) {
          result.html = e.replace('html', '');
        } else if (e.indexOf('css') != -1) {
          result.css = e.replace('css', '');
        }
      });

      setCache(cacheKey, result);
      res.status(200).json({ code: 200, msg: 'success', data: result });
      return;
    }
  } else {
    res.status(500).json({ code: 500, msg: 'error', data: {} });
  }
}
