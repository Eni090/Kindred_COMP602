import React, { useState, useEffect } from "react";
import Img from "../image.jpg";
import Cam from "./svg/Cam";
import {Link} from "react-router-dom";
import { storage, database } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc, addDoc } from "firebase/firestore";

const UploadHouses = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState("");
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
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
          `uploadHouses/${auth.currentUser.uid}/${new Date().getTime()} - ${img.name}`
        );
        try {
          const snap = uploadBytes(imgRef, img);
          const url = await getDownloadURL(
            ref(storage, (await snap).ref.fullPath)
          );

          await updateDoc(doc(database, "users", auth.currentUser.uid), {
            housePicture: url,
            housePicturePath: (await snap).ref.fullPath,
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
          <img src={user.housePicture || Img} alt="house" />
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
          <hr />
        </div>
      </div>
    </section>
  ) : null;
};

export default UploadHouses;
