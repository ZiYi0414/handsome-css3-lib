// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getTokenFormGithubInServer } from 'lib/api-github/api-github';
import type { NextApiRequest, NextApiResponse } from 'next';
import { resBody } from 'types/api';
import { GitHubTokenResponse } from 'types/github';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resBody<GitHubTokenResponse | any>>
) {
  const { query } = req;
  if (typeof query?.code === 'string' && !!query?.code?.length) {
    const token_res = await getTokenFormGithubInServer(query.code);
    if (token_res.access_token) {
      res.status(200).json({ code: 200, msg: 'success', data: token_res });
    } else {
      res.status(500).json({ code: 500, msg: 'error', data: token_res });
    }
  } else {
    res.status(500).json({ code: 500, msg: 'error', data: {} });
  }
}
