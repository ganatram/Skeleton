import { PostData } from './types';

export async function getPosts() {
  const response = await fetch(process.env.REACT_APP_API_URL!);
  const body = await response.json(); // string to json
  assertIsPosts(body); // strongly typing response data from server
  return body;
}

export function assertIsPosts(postsData: unknown): asserts postsData is PostData[] {
  if (!Array.isArray(postsData)) {
    throw new Error('posts is not an array');
  }
  if (postsData.length === 0) {
    return;
  }

  postsData.forEach((post) => {
    if (!('id' in post)) {
      throw new Error('post does not contain an id');
    }
    // if (typeof post.id !== 'number') {
    //   throw new Error('id is not a number');
    // }

    if (!('title' in post)) {
      throw new Error('post does not contain a title');
    }
    if (!('description' in post)) {
      throw new Error('post does not contain a description');
    }
    if (typeof post.description !== 'string') {
      throw new Error('description is not a string');
    }
  });
}
