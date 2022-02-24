import { useSelector } from "react-redux";
import "./App.css";
import { StoreType } from "./app/store";
import ChannelFeed from "./components/ChannelFeed/ChannelFeed";
import ServerList from "./components/ServerList/ServerList";
import Sidebar from "./components/Sidebar/Sidebar";
import NotificationBanner from "./components/general/NotificationBanner/NotificationBanner";
import NitroIcon from "./components/general/NitroIcon/NitroIcon";

function App() {
  const activeUser = useSelector((state: StoreType) => {
    if (state.users.activeUser === null) {
      return null;
    } else {
      const activeUser = state.users.users.find(
        (user) =>
          user.identity.id === state.users.activeUser?.id &&
          user.identity.discriminator === state.users.activeUser?.discriminator
      );

      return typeof activeUser !== "undefined" ? activeUser : null;
    }
  });

  return (
    <div className="App">
      {activeUser === null ? (
        <></>
      ) : (
        <>
          <ServerList activeUser={activeUser} />
          <div className="mainArea-wrapper">
            <NotificationBanner>
              <NitroIcon className="icon" />
              <p className="text">
                Hey, you have something waiting for you in your gift inventory!
                Don't forget to claim it before it's lost.
              </p>
              <button>Take me there</button>
            </NotificationBanner>
            <div className="mainArea">
              <Sidebar />
              <ChannelFeed />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
