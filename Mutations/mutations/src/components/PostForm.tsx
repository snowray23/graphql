import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_POST,UPDATE_POST,DELETE_POST } from '../mutations/mutation';
import { GET_POSTS } from '../queries/Query';
import { FormEvent, useRef } from 'react';

interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
}

const PostForm: React.FC = () => {
  const { loading, data } = useQuery<{ posts: Post[] }>(GET_POSTS);
  const [createPost] = useMutation<{ createPost: Post }>(CREATE_POST);
  const [updatePost] = useMutation<{ updatePost: Post }>(UPDATE_POST);
  const [deletePost] = useMutation<{ deletePost: Post }>(DELETE_POST);

  const inputTitle = useRef<HTMLInputElement>(null);
  const inputBody = useRef<HTMLInputElement>(null);

  const handleCreatePost = (event: FormEvent) => {
    event.preventDefault();
    createPost({
      variables: {
        input: {
          title: inputTitle.current?.value || '',
          body: inputBody.current?.value || '',
          userId: '1', // Assuming userId is hardcoded for simplicity
        },
      },
      refetchQueries: [{ query: GET_POSTS }],
    });
    inputTitle.current!.value = '';
    inputBody.current!.value = '';
  };

  const handleUpdatePost = (event: FormEvent, postId: string) => {
    event.preventDefault();
    updatePost({
      variables: {
        id: postId,
        input: {
          title: inputTitle.current?.value || '',
          body: inputBody.current?.value || '',
          userId: '1', 
        },
      },
      refetchQueries: [{ query: GET_POSTS }],
    });
  };

  const handleDeletePost = (postId: string) => {
    deletePost({
      variables: {
        id: postId,
      },
      refetchQueries: [{ query: GET_POSTS }],
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        {data?.posts.map(post => (
          <li key={post.id}>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
            <p>User ID: {post.userId}</p>
            <button onClick={() => handleUpdatePost(post.id)}>Update</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Title"
          ref={inputTitle}
        />
        <input
          type="text"
          placeholder="Body"
          ref={inputBody}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;