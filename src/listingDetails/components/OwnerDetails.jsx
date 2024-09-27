import { Button } from "@/components/ui/button";
import Service from "@/shared/Service";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

// npm run db:push
// npm run db:studio


function OwnerDetails({ carDetail }) {
  // console.log(carDetail,"in")
  const { user } = useUser();
  const navigation=useNavigate();
  const onMessageOwnerButtonClick = async () => {
    const userId = user.primaryEmailAddress.emailAddress.split("@")[0]; // Extract user ID
    const ownerUserId=carDetail?.createdBy.split('@')[0]
     
    try {
      const nickname = user?.fullName;
      const profileUrl = user?.imageUrl;

      const res = await Service.createSendBirdUser(
        userId,
        nickname,
        profileUrl
      );
      console.log(res);
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Error message:", error.message);
      }
    }
    try{
        const nickname = carDetail?.userName;
        const profileUrl = carDetail?.userImageUrl;
  
        const res = await Service.createSendBirdUser(
          ownerUserId,
          nickname,
          profileUrl
        );
       
    }catch(e){
      console.log(e)
    }
    // create channels
    try{
      await Service.createSendBirdChannel([userId,ownerUserId],carDetail?.listingTitle)
      .then(res=>{
        console.log(res);
        console.log("channel Created")
        navigation('/profile')
      })
    }catch(err){
        console.log(err)
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl mb-3">Owner/ Deals</h2>
      <img
        src={carDetail?.userImageUrl}
        alt=""
        className="w-[70px] h-[70px] rounded-full"
      />
      <h2 className="mt-2 font-bold text-xl">{carDetail?.userName}</h2>
      <h2 className="mt-2 text-gray-500">{carDetail?.createdBy}</h2>
      <Button onClick={onMessageOwnerButtonClick} className="w-full mt-6">
        Message Owner
      </Button>
    </div>
  );
}

export default OwnerDetails;
