import { useCollection } from "react-firebase-hooks/firestore";
import Post from "./Post";
import React from "react";
import { db } from "../firebase";
import { collection, doc, setDoc, query, orderBy } from "firebase/firestore";

function Posts() {
  const postsRef = collection(db, "posts");
  const [realtimePosts] = useCollection( query(postsRef, orderBy("timestamp", "desc")));

  return (
    <div>
      {realtimePosts &&
        realtimePosts.docs.map((post) => {
          
          return (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().email}
              timestamp={post.data().timestamp}
              userImage={post.data().image}
              postImage={post.data().postImage}
            />
          );
        })}
    </div>
  );
}

export default Posts;
