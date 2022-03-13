import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { db } from "../firebase";
import { useState } from "react/cjs/react.development";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function InputBox() {
  const { data: session } = useSession();
  const [inputData, setInputData] = useState("");

  const sendPost = async (event) => {
    event.preventDefault();
    console.log("hello");

    const docRef = await addDoc(collection(db, "posts"), {
      message: inputData,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    });
    console.log("sfsdf", docRef.id);
    setInputData("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full "
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            onChange={(e) => {
              setInputData(e.target.value);
            }}
            value={inputData}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`what's on your mind, ${session.user.name}?`}
          ></input>
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div className="inputIcon">
          {" "}
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
