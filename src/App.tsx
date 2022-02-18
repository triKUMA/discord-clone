import "./App.css";
import ChannelFeed from "./components/ChannelFeed/ChannelFeed";
import ServerList from "./components/ServerList/ServerList";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <ServerList />
      <Sidebar />
      <ChannelFeed />
    </div>
  );
}

export default App;
