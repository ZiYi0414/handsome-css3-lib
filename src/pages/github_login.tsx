import { getTokenFormGithub, getTokenFormGithubInServer } from 'lib/api-github/api-github';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React, { useEffect } from 'react';

export default function github_login(props) {
  console.log(props);

  // const router = useRouter();
  // const { code } = router.query;
  // useEffect(() => {
  //   if (typeof code === 'string') {
  //     getTokenFormGithub(code);
  //   }
  // }, [code]);
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
