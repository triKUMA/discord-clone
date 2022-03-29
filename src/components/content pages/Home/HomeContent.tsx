import HomeFeed from "./HomeFeed/HomeFeed";
import HomeSidebar from "./HomeSidebar/HomeSidebar";
import "./styles/HomeContent.css";

function HomeContent() {
  return (
    <div className="homeContent">
      <HomeSidebar />
      <HomeFeed />
    </div>
  );
}

export default HomeContent;
