import React, { useState, useEffect } from "react";
import Img from "../image.jpg";
import Cam from "./svg/Cam";
import { Link } from "react-router-dom";
import { storage, database } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes, deleteObject, listAll } from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";

function ImageEle(props) {
  return <img src={props.value}/>
}

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
          const userImages = ref(storage, `uploadHouses/` + auth.currentUser.uid);
          listAll(userImages)
            .then((res) => {
              res.items.forEach((itemRef) => {
                // All the items under listRef.
                getDownloadURL(itemRef).then((imgUrl) => {
                  setImageUrls((prev) => [...prev, imgUrl])
                });
              })
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
          <p>{user.address}</p>
          <p>{user.phone}</p>
          <p>{user.email}</p>
          <p>{user.dob}</p>

          <hr />
        </div>
        <Link to="/profileEdit">
          <button>
            <p>Edit Profile</p>
          </button>
        </Link>
        <div className="image_container">
         {imageUrls.map((url, index) => {
           return <img src={url} key={index}/>;
         })}
          
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
