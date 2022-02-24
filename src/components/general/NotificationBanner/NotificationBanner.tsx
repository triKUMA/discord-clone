import React, { ReactNode, useState } from "react";
import "./styles/NotificationBanner.css";
import { IoClose } from "react-icons/io5";

interface NotificationBannerProps {
  children: ReactNode;
}

function NotificationBanner(props: NotificationBannerProps) {
  const [displayBanner, setDisplayBanner] = useState(true);

  return displayBanner ? (
    <div className="notificationBanner">
      {props.children}
      <div
        className="close"
        onClick={() => {
          setDisplayBanner(false);
        }}
      >
        <IoClose className="close-icon" />
      </div>
    </div>
  ) : null;
}

export default NotificationBanner;
