import { useUser } from "@clerk/clerk-react";
import { App as SendbirdApp, SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { useEffect, useState } from "react";
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
function Inbox() {
  const {user}=useUser();
  const [channelUrl,setChannelUrl]=useState();
  const [userId,setUserId]=useState();
  useEffect(()=>{
    if(user){
      const id=user.primaryEmailAddress?.emailAddress.split('@')[0]
      setUserId(id)
    }
  },[user])
  return (
    <div>
      <div style={{ width: "100%", height: "500px" }}>
        <SendBirdProvider
          appId={import.meta.env.VITE_SENDBIRD_APP_ID}
          userId={userId}
          nickname={user?.fullName}
          profileUrl={user?.imageUrl}
          allowProfileEdit={true}
        >
          {/* channel list */}
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            <div>
              <GroupChannelList onChannelSelect={(channel)=>{
                  setChannelUrl(channel?.url);
              }} channelListQueryParams={{includeEmpty:true}}/>
            </div>
            <div className="md:col-span-2">
              <GroupChannel channelUrl={channelUrl}/>
            </div>
          </div>


        </SendBirdProvider>
      </div>
    </div>
  );
}

export default Inbox;
