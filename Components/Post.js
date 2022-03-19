import React from "react";
import Image from "next/image";
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/outline";

function Post({ key, name, message, email, timestamp, userImage, postImage }) {
  return (
    <div className="flex flex-col ">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
        <div className="flex items-center space-x-2">
           {/* This image needs to take image */}
         
          <img className="rounded-full" src={userImage} width={40} height={40} />
          <div>
            <p className="font-medium">{name}</p>

            <p className="test-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="pt-4">{message}</p>
      </div>
      {/* Change this image && to postImage too  */}
      {postImage && (
        <div className="relative h-56 md:h-96 bg-white">
          {/* This image needs to take postImage */}
          <Image src={postImage} objectFit="cover" layout="fill" />
        </div>
      )}
      <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
        <div className="inputIcon rounded-none ">
          <ThumbUpIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div className="inputIcon rounded-none">
          <ChatAltIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div className="inputIcon rounded-none">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
