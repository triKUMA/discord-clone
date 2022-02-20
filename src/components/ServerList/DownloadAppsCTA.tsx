import "./styles/DownloadAppsCTA.css";
import { BsWindows } from "react-icons/bs";
import { FaApple, FaLinux } from "react-icons/fa";
import { SiAndroid, SiMacos } from "react-icons/si";
import Button from "../general/Button/Button";
import { IconType } from "react-icons";

interface DownloadAppProps {
  icon: IconType;
  iconVariant?: "macos" | "android";
  title: string;
  buttons: { text: string; onClick: () => void }[];
}

function DownloadApp(props: DownloadAppProps) {
  return (
    <div className="dlApp">
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
  return (
    <div className="dlAppsModal">
      <div className="dlAppWrapper">
        <DownloadApp
          icon={SiMacos}
          iconVariant="macos"
          title="macOS"
          buttons={[{ text: "Download", onClick: () => {} }]}
        />
        <DownloadApp
          icon={BsWindows}
          title="Windows"
          buttons={[{ text: "Download", onClick: () => {} }]}
        />
        <DownloadApp
          icon={FaLinux}
          title="Linux"
          buttons={[
            { text: "Deb", onClick: () => {} },
            { text: "Tar", onClick: () => {} },
          ]}
        />
      </div>
      <p>Or on the go</p>
      <div className="dlAppWrapper">
        <DownloadApp
          icon={FaApple}
          title="Apple iOS"
          buttons={[{ text: "Download", onClick: () => {} }]}
        />
        <DownloadApp
          icon={SiAndroid}
          iconVariant="android"
          title="Android"
          buttons={[{ text: "Download", onClick: () => {} }]}
        />
      </div>
    </div>
  );
}

export default DownloadAppsCTA;
