import React, { useState, useEffect } from "react";
import Img from "../image.jpg";
import Cam from "./svg/Cam";

import { storage, database } from "./firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState("");
  const auth = getAuth();

  useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(user);
    } else {
     console.log("no user");
    }
    getDoc(doc(database, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
  });
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `profilePictures/${new Date().getTime()} - ${img.name}`
        );
        try {
          const snap = uploadBytes(imgRef, img);
          const url = await getDownloadURL(
            ref(storage, (await snap).ref.fullPath)
          );

          await updateDoc(doc(database, "users", auth.currentUser.uid), {
            profilePictures: url,
            profilePicturesPath: (await snap).ref.fullPath,
          });
          setImg("");
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
  }, [img]);
  return user ? (
    <section>
      <div className="profile_container">
        <div className="img_container">
          <img src={user.profilePictures || Img} alt="profile" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Cam />
              </label>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
