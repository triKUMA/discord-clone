import "./App.css";
import ChannelFeed from "./components/ChannelFeed/ChannelFeed";
import ServerList from "./components/ServerList/ServerList";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <ServerList />
      <div className="mainArea-wrapper">
        <div className="test"></div>
        <div className="mainArea">
          <Sidebar />
          <ChannelFeed />
        </div>
      </div>
    </div>
  );
}

export default App;
