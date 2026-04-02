import { useEffect, useState } from 'react';
import { getPosts } from './getPosts';
import { PostData } from './types';
import { PostList } from './PostList';

export function PostsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    let cancel = false; // sync event
    getPosts().then((data) => {
      // async event
      if (!cancel) {
        setPosts(data); //
        setIsLoading(false);
      }
    });

    return () => {
      // clearing function (optional) // async event
      cancel = true; //
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Posts:</h2>
      <PostList posts={posts} />
    </div>
  );
}
