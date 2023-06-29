import {
  getTokenFormGithub,
  getTokenFormGithubInServer,
  setAccessToken,
  loadUserInfo
} from 'lib/api-github/api-github';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React, { useEffect, useState } from 'react';
import { LS_ACCESS_TOKEN_KEY } from 'lib/api-github/constants';

export default function github_login(props) {
  const { query } = useRouter();

  useEffect(() => {
    if (typeof query?.code === 'string' && !!query?.code?.length) {
      fetchToken(query?.code);
    }
  }, [query]);

  const fetchToken = async (code: string) => {
    try {
      // 后面再改另一条直接存的接口吧！
      const { access_token } = await getTokenFormGithubInServer(code);
      if (!access_token) return;
      setAccessToken(access_token);
      const res = await loadUserInfo();
    } catch (err) {
      console.error(err);
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
