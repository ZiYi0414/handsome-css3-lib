import { getTokenFormGithub, loadUserInfo } from 'lib/api-github/api-github';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function github_login() {
  const { query } = useRouter();
  const router = useRouter();

  useEffect(() => {
    if (typeof query?.code === 'string' && !!query?.code?.length) {
      fetchToken(query?.code);
    }
  }, [query]);

  const fetchToken = async (code: string) => {
    try {
      // 后面再改另一条直接存的接口吧！
      getTokenFormGithub(code, () => {
        loadUserInfo();
        router.push('/');
      });
    } catch (err) {
      console.error(err);
      router.push('/');
    }
  };

  return <div></div>;
}
