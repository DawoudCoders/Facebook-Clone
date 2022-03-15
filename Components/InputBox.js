import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import { useState } from "react/cjs/react.development";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useRef } from "react";
import { getDownloadURL, uploadString, ref } from "firebase/storage";

function InputBox() {
  const { data: session } = useSession();
  const [inputData, setInputData] = useState("");
  const [test, setTest] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const filepickerRef = useRef(null);

  const sendPost = async (event) => {
    event.preventDefault();
    //uploading post info to firestore
    const docRef = await addDoc(collection(db, "posts"), {
      message: inputData,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    });
    //uploading the img to firebase storage
    //creating a reference to the image in firebase storage
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    //uploading picture to firebase storage
    uploadString(imageRef, image, "data_url").then((snapshot) => {
      //downloading url from storage
      getDownloadURL(imageRef).then((downloadURL) => {
        setImage(downloadURL);
        //updating the firestore 'post' to contain the img url 
        updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
        setTest(downloadURL);
      });
    });
    setInputData("");
  };

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImage(null);
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
        {image && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={image} />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div
          onClick={() => {
            filepickerRef.current.click();
          }}
          className="inputIcon"
        >
          <input
            hidden
            onChange={addImage}
            ref={filepickerRef}
            type="file"
          ></input>
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
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
