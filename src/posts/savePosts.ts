import { NewPostsData, SavedPostData } from './types';

export async function savePost(newPostData: NewPostsData) {
  const response = await fetch(process.env.REACT_APP_API_URL!, {
    method: 'POST',
    body: JSON.stringify(newPostData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = (await response.json()) as unknown;
  assertIsSavedPost(body); // strongly type the response data;
  return { ...newPostData, ...body };
}

function assertIsSavedPost(post: any): asserts post is SavedPostData {
  if ('!id' in post) {
    throw new Error('post doesnt contain an id');
  }
  if (typeof post.id !== 'number') {
    throw new Error('id is not a number');
  }
}
