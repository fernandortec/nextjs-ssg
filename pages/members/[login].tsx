import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { UserTypes } from '../index';

export default function Member({ user }: UserTypes) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <img
        src={user.avatar_url}
        alt="Some"
        width="80"
        style={{ borderRadius: 40 }}
      />
      <h1>{user.name}</h1>
      <p>{user.bio ?? 'No bio available'}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apiRequest = await axios.get(`https://api.github.com/users`);

  const data: UserTypes['user'][] = apiRequest.data;

  const paths = data.map((member) => {
    return { params: { login: member.login } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { login } = context.params;

  const apiRequest = await axios.get(`https://api.github.com/users/${login}`);

  const data: UserTypes['user'] = apiRequest.data;

  return {
    props: {
      user: data,
    },

    revalidate: 10,
  };
};
