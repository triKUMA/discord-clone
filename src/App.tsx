import { useSelector } from "react-redux";
import "./App.css";
import { StoreType } from "./app/store";
import ChannelFeed from "./components/ChannelFeed/ChannelFeed";
import ServerList from "./components/ServerList/ServerList";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const activeUser = useSelector((state: StoreType) => {
    if (state.users.activeUser === null) {
      console.log("no active user");
      return null;
    } else {
      const activeUser = state.users.users.find(
        (user) =>
          user.identity.id === state.users.activeUser?.id &&
          user.identity.discriminator === state.users.activeUser?.discriminator
      );

      console.log(activeUser);
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
            <div className="test"></div>
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
