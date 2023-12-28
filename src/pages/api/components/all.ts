// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllComponetsFormGithubInServer } from 'lib/api-github/api-github';
import { getCache, getKeys, hasCache, setCache } from 'lib/node-cache';
import type { NextApiRequest, NextApiResponse } from 'next';
import { resBody } from 'types/api';
import { GitHubIssuesComponent } from 'types/github';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resBody<GitHubIssuesComponent[] | any>>
) {
  // const { query } = req;
  const all_components = hasCache('all-components');
  if (!all_components) {
    console.log('%c [all_components] 缓存中没有数据，正在请求数据');

    const componets_res = await getAllComponetsFormGithubInServer();
    if (componets_res) {
      const list = componets_res;
      const data = list.map((e: GitHubIssuesComponent) => {
        // const { data, content } = matter(e.body_text);
        // 提取数据部分
        const dataStr = e.body.split('---')[1].trim();

        // 将数据字符串转换为对象
        const dataObj: { [key: string]: string } = {};
        dataStr.split('\n').forEach(line => {
          const [key, value] = line.split(':').map(item => item.trim());
          dataObj[key] = value;
        });

        const result = {
          body: e.body,
          html: '',
          css: '',
          title: dataObj?.title || e.title,
          slug: e.number.toString(),
          made_by: dataObj?.made_by || e.user.login,
          theme: dataObj?.theme || 'default',
          user: e.user,
          url: e.user.url
        };
        const format = e.body.split('```');
        format.forEach(e => {
          if (e.indexOf('html') != -1) {
            result.html = e.replace('html', '');
          } else if (e.indexOf('css') != -1) {
            result.css = e.replace('css', '');
          }
        });
        return result;
      });
      if (data.length > 0) {
        setCache('all-components', data);
      }
      res.status(200).json({ code: 200, msg: 'success', data: data });
    } else {
      res.status(500).json({ code: 500, msg: 'error', data: [] });
    }
  } else {
    const data = getCache('all-components');
    console.log('%c [all_components] 缓存中有数据，缓存命中！');

    res.status(200).json({ code: 200, msg: 'success', data: data });
  }
}
