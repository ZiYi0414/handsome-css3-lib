import {
  getTokenFormGithub,
  getTokenFormGithubInServer
} from 'lib/api-github/api-github';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React, { useEffect, useState } from 'react';

export default function github_login(props) {
  const { query } = useRouter();

  useEffect(() => {
    if (typeof query?.code === 'string' && !!query?.code?.length) {
      fetchToken(query?.code);
    }
  }, [query]);

  const fetchToken = async (code: string) => {
    try {
      const res = await getTokenFormGithubInServer(code);
      console.log(res, 'res');
      // copy res
      //   {
      //     "access_token": "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",
      //     "token_type": "bearer",
      //     "scope": "public_repo"
      // }
      // copy err
      //   {
      //     "error": "bad_verification_code",
      //     "error_description": "The code passed is incorrect or expired.",
      //     "error_uri": "https://docs.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code"
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { code } = query;
  let props = {};
  if (typeof code === 'string') {
    // props = await getTokenFormGithubInServer(code);
    // console.log(await getTokenFormGithubInServer(code));
  }
  return {
    props: { props }
  };
};
