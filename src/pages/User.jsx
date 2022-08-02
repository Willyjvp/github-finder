import { useContext, useEffect } from 'react';
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import GithubContext from '../components/context/github/GithubContext';
import RepoList from '../components/repos/RepoList';
import { getUserAndRepos } from '../components/context/github/GithubActions';

const User = () => {
  const { user, repos, loading, dispatch } = useContext(GithubContext);
  const { userid } = useParams();

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  useEffect(() => {
    const getUserData = async () => {
      dispatch({ type: 'SET_LOADING' });

      const { user, repos } = await getUserAndRepos(userid);

      dispatch({ type: 'GET_USER_AND_REPOS', payload: { user, repos } });
    };

    getUserData();
  }, [dispatch, userid]);

  if (loading) return <div className='loader' />;
  return (
    <div className='w-fill mx-auto w-10/12'>
      <div className='mb-4'>
        <Link to='/' className='btn btn-outline text-white'>
          Back to Search
        </Link>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
        <div className='custom-card-image mb-6 md:mb-0'>
          <div className='rounded-lg shadow-xl card image-full'>
            <figure>
              <img src={avatar_url} alt='' />
            </figure>
            <div className='card-body justify-end'>
              <h2 className='card-title mb-0 text-white'>{name}</h2>
              <p className='flex-grow-0 text-slate-200'>{login}</p>
            </div>
          </div>
        </div>

        <div className='col-span-2'>
          <div className='mb-6'>
            <h1 className='text-3xl card-title text-white'>
              {name}
              <div className='ml-2 mr-1 badge badge-success'>{type}</div>
              {hireable && (
                <div className='mx-1 badge badge-info'>Hireable</div>
              )}
            </h1>
            <p>{bio}</p>
            <div className='mt-4 card-actions'>
              <a
                href={html_url}
                target='_blank'
                rel='noreferrer'
                className='btn btn-outline text-white'
              >
                Visit GitHib Profile
              </a>
            </div>
          </div>

          <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
            {location && (
              <div className='stat'>
                <div className='stat-title text-md'>Location</div>
                <div className='text-lg stat-value text-white'>{location}</div>
              </div>
            )}
            {blog && (
              <div className='stat'>
                <div className='stat-title text-md'>Website</div>
                <a
                  href={`https://${blog}`}
                  target='_blank'
                  rel='noreferrer'
                  className='text-lg stat-value text-white'
                >
                  {blog}
                </a>
              </div>
            )}
            {twitter_username && (
              <div className='stat'>
                <div className='stat-title text-md'>Twitter</div>
                <a
                  href={`https://twitter.com/${twitter_username}`}
                  target='_blank'
                  rel='noreferrer'
                  className='text-lg stat-value text-white'
                >
                  {twitter_username}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <FaUsers className='text-3xl md:text-5xl' />
          </div>
          <div className='stat-title pr-5'>Followers</div>
          <div className='stat-value pr-5 text-3xl md:text-3xl text-white'>
            {followers}
          </div>
        </div>

        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <FaUserFriends className='text-3xl md:text-5xl' />
          </div>
          <div className='stat-title pr-5'>Following</div>
          <div className='stat-value pr-5 text-3xl md:text-3xl text-white'>
            {following}
          </div>
        </div>

        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <FaCodepen className='text-3xl md:text-5xl' />
          </div>
          <div className='stat-title pr-5'>Public Repos</div>
          <div className='stat-value pr-5 text-3xl md:text-3xl text-white'>
            {public_repos}
          </div>
        </div>

        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <FaStore className='text-3xl md:text-5xl' />
          </div>
          <div className='stat-title pr-5'>Public Gists</div>
          <div className='stat-value pr-5 text-3xl md:text-3xl text-white'>
            {public_gists}
          </div>
        </div>
      </div>
      <RepoList repos={repos} />
    </div>
  );
};

export default User;
