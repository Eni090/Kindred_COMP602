import React, { useState, useEffect } from "react";
import Img from "../image.jpg";
import Cam from "./svg/Cam";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import { storage, database } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import HouseRoundedIcon from "@mui/icons-material/HouseRounded";
import "./style.css";
import Header from "../Header";
import { Button } from "@mui/material";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const auth = getAuth();
  var authFlag = true;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        // console.log(user);
        // Once user is signed in, grab user's uploaded images
        if (authFlag) {
          authFlag = false;
          const userImages = ref(
            storage,
            `uploadHouses/` + auth.currentUser.uid
          );
          listAll(userImages)
            .then((res) => {
              res.items.forEach((itemRef) => {
                // All the items under listRef.
                getDownloadURL(itemRef).then((imgUrl) => {
                  setImageUrls((prev) => [...prev, imgUrl]);
                });
              });
            })
            .catch((error) => {
              // Uh-oh, an error occurred!
            });
        }
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
      <Header />
      <div className="profile_container">
        <div className="profile_details_container">
          <div className="profile_img_container">
            <img src={user.profilePictures || Img} alt="profile" />
            <div className="profile_img_overlay">
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
          <div className="profile_text_container">
            <h3>{user.name}</h3>
            <p>{user.address}</p>
            <p>{user.phone}</p>
            <p>{user.email}</p>
            <p>{user.dob}</p>
          </div>
        </div>
        <div className="profile_btn_container">
          <Link to="/profileEdit" className="edit_profile_link">
            <Button
              variant="contained"
              fullWidth
              className="edit_profile_btn"
              size="small"
            >
              Edit Profile
            </Button>
          </Link>
          <Link to="/upload" className="upload_img_link">
            <Button
              variant="contained"
              fullWidth
              className="upload_img_btn"
              size="small"
            >
              <HouseRoundedIcon fontSize="large" /> +
            </Button>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="user_images_container">
          {imageUrls.map((url, index) => {
            return (
              <div
                className="user_image"
                style={{ backgroundImage: `url(${url})` }}
                key={index}
              ></div>
            );
          })}
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
