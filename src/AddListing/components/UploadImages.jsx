import { Button } from "@/components/ui/button";
import { storage } from "./../../../Configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { GiLeafSkeleton } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { db } from "./../../../Configs";
import { CarImages } from "./../../../Configs/schema";
import { eq } from "drizzle-orm";

function UploadImages({ triggerUploadImages, setOnSaveLoader, carInfo, mode }) {
  const [EditCarImageList, setEditCarImageList] = useState([]);
  const [selectedFileList, setSelectedFileList] = useState([]);
  // console.log("this is list of edit car images",EditCarImageList)

  useEffect(() => {
    if (mode == "edit") {
      console.log(mode, "is this");
      console.log("this is inside the upload images", carInfo);
      carInfo?.images.forEach((image) => {
        setEditCarImageList((prev) => [...prev, image?.imageUrl]);
      });
    }
  }, [carInfo]);

  useEffect(() => {
    if (triggerUploadImages) {
      UploadImages();
    }
  }, [triggerUploadImages]);

  const onFileSelected = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file);
      // const objectUrl=URL.createObjectURL(file);
      setSelectedFileList((prev) => [...prev, file]);
    }
    console.log(selectedFileList);
  };
  const removeImage = (image, index) => {
    const images = selectedFileList.filter((file) => file !== image);
    setSelectedFileList(images);
  };
  const removeImageFromDB = async(image, index) => {
    const result=await db.delete(CarImages).where(eq(CarImages.id,carInfo?.images[index]?.id))
    const imageList=EditCarImageList.filter(item=>item!=image);
    setEditCarImageList(imageList)
  };

  const UploadImages = async () => {
    setOnSaveLoader(true);
    await selectedFileList.forEach((file) => {
      const fileName = Date.now() + ".jpeg";
      const storageRef = ref(storage, "car-marketplace/" + fileName);
      const metaData = {
        contentType: "image/jpeg",
      };
      uploadBytes(storageRef, file, metaData)
        .then((snapshot) => {
          console.log("Uploaded Files");
        })
        .then((res) => {
          getDownloadURL(storageRef).then(async (downloadUrl) => {
            console.log(downloadUrl, triggerUploadImages);
            await db.insert(CarImages).values({
              imageUrl: downloadUrl,
              carListingId: triggerUploadImages,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
      setOnSaveLoader(false);
    });
  };

  

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6 gap-5">
        {mode == "edit" &&
          EditCarImageList.map((file, index) => (
            <div key={index}>
              <RxCross1 onClick={() => removeImageFromDB(file, index)} />
              <img
                src={file}
                className="w-full h-[130px] object-cover rounded-xl"
                alt=""
              />
            </div>
          ))}
        {selectedFileList.map((file, index) => (
          <div key={index}>
            <RxCross1 onClick={() => removeImage(file, index)} />
            <img
              src={URL.createObjectURL(file)}
              className="w-full h-[130px] object-cover rounded-xl"
              alt=""
            />
          </div>
        ))}
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-blue-500 bg-blue-100 p-4">
            <h2 className="text-lg ">+</h2>
          </div>
        </label>
        <input
          type="file"
          onChange={onFileSelected}
          multiple={true}
          id="upload-images"
          className="opacity-0"
        />
      </div>
    </div>
  );
}

export default UploadImages;
