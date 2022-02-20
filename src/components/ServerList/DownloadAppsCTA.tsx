import "./styles/DownloadAppsCTA.css";
import { BsWindows } from "react-icons/bs";
import { FaApple, FaLinux } from "react-icons/fa";
import { SiAndroid, SiMacos } from "react-icons/si";
import Button from "../general/Button/Button";
import { IconType } from "react-icons";
import { useState } from "react";

interface DownloadAppProps {
  icon: IconType;
  iconVariant?: "macos" | "android";
  title: string;
  buttons: { text: string; onClick: () => void }[];
  id: number;
  activeID: number;
  handleHover: () => void;
}

function DownloadApp(props: DownloadAppProps) {
  return (
    <div
      className={"dlApp" + (props.id === props.activeID ? " active" : "")}
      onMouseEnter={props.handleHover}
    >
      <props.icon
        className={"icon" + (props.iconVariant ? ` ${props.iconVariant}` : "")}
      />
      <div className="contentWrapper">
        <p>{props.title}</p>
        <div className="buttonWrapper">
          {props.buttons.map((item) => (
            <Button
              text={item.text}
              onClick={item.onClick}
              size="md"
              colour="grey"
              className="dlApp-button"
              span
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DownloadAppsCTA() {
  const [activeApp, setActiveApp] = useState(2);

  return (
    <div className="dlAppsModal">
      <div className="dlAppWrapper">
        <DownloadApp
          icon={SiMacos}
          iconVariant="macos"
          title="macOS"
          buttons={[
            {
              text: "Download",
              onClick: () => {
                window.open("https://discord.com/api/download?platform=osx");
              },
            },
          ]}
          id={1}
          activeID={activeApp}
          handleHover={() => setActiveApp(1)}
        />
        <DownloadApp
          icon={BsWindows}
          title="Windows"
          buttons={[
            {
              text: "Download",
              onClick: () => {
                window.open("https://discord.com/api/download?platform=win");
              },
            },
          ]}
          id={2}
          activeID={activeApp}
          handleHover={() => setActiveApp(2)}
        />
        <DownloadApp
          icon={FaLinux}
          title="Linux"
          buttons={[
            {
              text: "Deb",
              onClick: () => {
                window.open(
                  "https://discord.com/api/download?platform=linux&format=deb"
                );
              },
            },
            {
              text: "Tar",
              onClick: () => {
                window.open(
                  "https://discord.com/api/download?platform=linux&format=tar.gz"
                );
              },
            },
          ]}
          id={3}
          activeID={activeApp}
          handleHover={() => setActiveApp(3)}
        />
      </div>
      <p>Or on the go</p>
      <div className="dlAppWrapper">
        <DownloadApp
          icon={FaApple}
          title="Apple iOS"
          buttons={[
            {
              text: "Download",
              onClick: () => {
                window.open("https://itunes.apple.com/app/discord/id985746746");
              },
            },
          ]}
          id={4}
          activeID={activeApp}
          handleHover={() => setActiveApp(4)}
        />
        <DownloadApp
          icon={SiAndroid}
          iconVariant="android"
          title="Android"
          buttons={[
            {
              text: "Download",
              onClick: () => {
                window.open(
                  "https://play.google.com/store/apps/details?id=com.discord"
                );
              },
            },
          ]}
          id={5}
          activeID={activeApp}
          handleHover={() => setActiveApp(5)}
        />
      </div>
    </div>
  );
}

export default DownloadAppsCTA;
