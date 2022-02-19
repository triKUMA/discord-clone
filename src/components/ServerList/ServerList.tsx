import ServerIcon from "./ServerIcon";
import "./styles/ServerList.css";
import { RandServer } from "../../helper/RandomData";
import { useState } from "react";
import { ServerType } from "../../types/ServerType";
import Modal from "../general/Modal/Modal";
import Button from "../general/Button/Button";
import { FaDiscord, FaLinux, FaApple } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCompassSharp } from "react-icons/io5";
import { HiOutlineDownload } from "react-icons/hi";
import { BsWindows } from "react-icons/bs";
import { SiMacos, SiAndroid } from "react-icons/si";

function ServerList() {
  const [downloadModal, setDownloadModal] = useState(false);
  const [friends, setFriends] = useState<ServerType[]>([]);
  const [servers, setServers] = useState<ServerType[]>([]);

  return (
    <div className="serverList">
      <ServerIcon
        icon={FaDiscord}
        text="Home"
        onClick={() => {
          setFriends(friends.concat(RandServer()));
        }}
        variant="discord"
      />

      {friends.map((item) => (
        <ServerIcon imgSrc={item.imgSrc} text={item.name} />
      ))}

      <div className="separator" />

      {servers.map((item) => (
        <ServerIcon imgSrc={item.imgSrc} text={item.name} />
      ))}

      <ServerIcon
        icon={AiOutlinePlus}
        text="Add a Server"
        onClick={() => {
          setServers(servers.concat(RandServer()));
        }}
        disablePill
        variant="green"
      />
      <ServerIcon
        icon={IoCompassSharp}
        text="Explore Public Servers"
        variant="green"
      />

      <div className="separator" />

      <ServerIcon
        icon={HiOutlineDownload}
        text="Download Apps"
        onClick={() => setDownloadModal(true)}
        variant="green"
      />

      <Modal
        active={downloadModal}
        handleDisable={() => {
          setDownloadModal(false);
        }}
      >
        <div className="dlAppsModal">
          <div className="dlAppWrapper">
            <div className="dlApp">
              <SiMacos className="icon macos" />
              <div className="contentWrapper">
                <p>macOS</p>
                <Button
                  text="Download"
                  size="md"
                  className="dlApp-button"
                  span
                />
              </div>
            </div>
            <div className="dlApp">
              <BsWindows className="icon" />
              <div className="contentWrapper">
                <p>Windows</p>
                <Button
                  text="Download"
                  size="md"
                  className="dlApp-button"
                  span
                />
              </div>
            </div>
            <div className="dlApp">
              <FaLinux className="icon" />
              <div className="contentWrapper">
                <p>Linux</p>
                <div className="buttonWrapper">
                  <Button text="Deb" size="md" className="dlApp-button" span />
                  <Button text="Tar" size="md" className="dlApp-button" span />
                </div>
              </div>
            </div>
          </div>
          <p>Or on the go</p>
          <div className="dlAppWrapper">
            <div className="dlApp">
              <FaApple className="icon" />
              <div className="contentWrapper">
                <p>Apple iOS</p>
                <Button
                  text="Download"
                  size="md"
                  className="dlApp-button"
                  span
                />
              </div>
            </div>
            <div className="dlApp">
              <SiAndroid className="icon android" />
              <div className="contentWrapper">
                <p>Android</p>
                <Button
                  text="Download"
                  size="md"
                  className="dlApp-button"
                  span
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ServerList;
