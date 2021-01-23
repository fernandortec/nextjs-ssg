import axios from 'axios';
import { GetStaticProps } from 'next';

export interface UserTypes {
  user: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: false;
    name: string;
    company: null;
    blog: string;
    location: string;
    email: null;
    hireable: null;
    bio: string;
    twitter_username: null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
  }
}

export default function Home({ user }: UserTypes) {
  return (
    <div>
      <h1>{user.login}</h1>

      <h3>{user.bio}</h3>

      <p>
        Site: <a href={user.url}>{user.login}</a>
      </p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apiRequest = await axios.get(
    'https://api.github.com/users/fernandortec'
  );

  const data: UserTypes["user"] = await apiRequest.data;

  return {
    props: {
      user: data,
    },

    revalidate: 10,
  };
};
