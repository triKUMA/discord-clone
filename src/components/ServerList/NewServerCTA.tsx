import { useState } from "react";
import { IconType } from "react-icons";
import "./styles/NewServerCTA.css";
import { BiChevronRight } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";
import Button from "../general/Button/Button";

interface PageChangeProps {
  iconSrc: string;
  title: string;
  desc?: string;
  onClick: () => void;
}

function PageChange(props: PageChangeProps) {
  return (
    <button className="pageChange" onClick={props.onClick}>
      <img src={props.iconSrc} alt="" className="icon" />
      <div className="content">
        <p className="title">{props.title}</p>
        {props.desc && <p className="desc">{props.desc}</p>}
      </div>
      <BiChevronRight className="continueIcon" />
    </button>
  );
}

interface PageProps {
  changePage: (index: number) => void;
  setDetails: (details: {
    template?:
      | null
      | "gaming"
      | "school"
      | "study"
      | "friends"
      | "creators"
      | "local community";
    targetAudience?: null | "small" | "large";
    name?: string;
    imgSrc?: null | string;
  }) => void;
}

function NewServerPage1(props: PageProps) {
  return (
    <div className="page1">
      <div className="header">
        <p className="title">Create a server</p>
        <p className="desc">
          Your server is where you and your friends hang out. Make yours and
          start talking.
        </p>
      </div>
      <div className="pageChange-wrapper scroll">
        <PageChange
          iconSrc="./assets/NewServerCTA/create_my_own.svg"
          title="Create My Own"
          onClick={() => {
            props.setDetails({ template: null });
            props.changePage(2);
          }}
        />

        <p className="section-title">Start From a Template</p>
        <PageChange
          iconSrc="./assets/NewServerCTA/gaming.svg"
          title="Gaming"
          onClick={() => {
            props.setDetails({ template: "gaming" });
            props.changePage(2);
          }}
        />
        <PageChange
          iconSrc="./assets/NewServerCTA/school_club.svg"
          title="School Club"
          onClick={() => {
            props.setDetails({ template: "school" });
            props.changePage(2);
          }}
        />
        <PageChange
          iconSrc="./assets/NewServerCTA/study_group.svg"
          title="Study Group"
          onClick={() => {
            props.setDetails({ template: "study" });
            props.changePage(2);
          }}
        />
        <PageChange
          iconSrc="./assets/NewServerCTA/friends.svg"
          title="Friends"
          onClick={() => {
            props.setDetails({ template: "friends" });
            props.changePage(2);
          }}
        />
        <PageChange
          iconSrc="./assets/NewServerCTA/artists_creators.svg"
          title="Artists & Creators"
          onClick={() => {
            props.setDetails({ template: "creators" });
            props.changePage(2);
          }}
        />
        <PageChange
          iconSrc="./assets/NewServerCTA/local_community.svg"
          title="Local Community"
          onClick={() => {
            props.setDetails({ template: "local community" });
            props.changePage(2);
          }}
        />
      </div>
      <div className="footer">
        <p className="title">Already have an invite?</p>
        <Button
          text="Join a Server"
          onClick={() => {
            props.changePage(4);
          }}
          size="md"
          colour="grey"
          span
        />
      </div>
    </div>
  );
}

function NewServerPage2(props: PageProps) {
  return (
    <div className="page2">
      <div className="header">
        <p className="title">Tell us more about your server</p>
        <p className="desc">
          In order to help you with your setup, is your new server for just a
          few friends or a larger community?
        </p>
      </div>
      <div className="pageChange-wrapper">
        <PageChange
          iconSrc="./assets/NewServerCTA/for_friends.svg"
          title="For me and my friends"
          onClick={() => {
            props.setDetails({ targetAudience: "small" });
            props.changePage(3);
          }}
        />
        <PageChange
          iconSrc="./assets/NewServerCTA/for_community.svg"
          title="For a club or community"
          onClick={() => {
            props.setDetails({ targetAudience: "large" });
            props.changePage(3);
          }}
        />
      </div>
      <p className="skip">
        Not sure? You can{" "}
        <span
          className="skip-button"
          onClick={() => {
            props.setDetails({ targetAudience: null });
            props.changePage(3);
          }}
        >
          skip this question
        </span>{" "}
        for now.
      </p>
      <div className="footer">
        <div className="nav-wrapper">
          <button
            className="back"
            onClick={() => {
              props.changePage(1);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

function NewServerPage3(props: PageProps & { displayDetails: () => void }) {
  const [name, setName] = useState("tri/KUMA" + "'s server");
  const [imgSrc, setImgSrc] = useState("");

  function setServerImg(files: FileList | null) {
    if (files !== null) {
      let fReader = new FileReader();
      fReader.readAsDataURL(files[0]);
      fReader.onloadend = (e) => {
        if (e.target !== null && typeof e.target.result === "string") {
          setImgSrc(e.target.result);
        }
      };
    }
  }

  return (
    <div className="page3">
      <div className="header">
        <p className="title">Customise your server</p>
        <p className="desc">
          Give your new server a personality with a name and an icon. You can
          always change it later.
        </p>
      </div>
      <div className="serverDetails-wrapper">
        <div className="icon-wrapper">
          {imgSrc === "" ? (
            <div className="icon">
              <FaCamera className="camera" />
              <p>Upload</p>
            </div>
          ) : (
            <div className="img-wrapper">
              <img src={imgSrc} alt="" />
            </div>
          )}
          <input
            type="file"
            onInput={(e) => {
              setServerImg(e.currentTarget.files);
            }}
          />
        </div>
        <p className="section-title">Server name</p>
        <input
          type="text"
          defaultValue={name}
          onInput={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <p className="guidelines">
          By creating a server, you agree to Discord's{" "}
          <span
            className="guidelines-button"
            onClick={() => {
              window.open("https://discord.com/guidelines");
            }}
          >
            Community Guidelines.
          </span>
        </p>
      </div>

      <div className="footer">
        <div className="nav-wrapper">
          <button
            className="back"
            onClick={() => {
              props.changePage(2);
            }}
          >
            Back
          </button>
          <Button
            text="Create"
            colour="discord"
            size="md"
            onClick={() => {
              props.setDetails({ name: name, imgSrc: imgSrc });
              props.displayDetails();
            }}
          />
        </div>
      </div>
    </div>
  );
}

function NewServerPage4(props: PageProps) {
  return <div className="page4"></div>;
}

interface ServerPrototype {
  template:
    | null
    | "gaming"
    | "school"
    | "study"
    | "friends"
    | "creators"
    | "local community";
  targetAudience: null | "small" | "large";
  name: string;
  imgSrc: null | string;
}

function NewServerCTA() {
  const [page, setPage] = useState(1);
  const [serverDetails, setServerDetails] = useState<ServerPrototype>({
    template: null,
    targetAudience: null,
    name: "",
    imgSrc: null,
  });

  const nextPage = (index: number) => {
    setPage(index);
  };

  function setDetails(details: {
    template?:
      | null
      | "gaming"
      | "school"
      | "study"
      | "friends"
      | "creators"
      | "local community";
    targetAudience?: null | "small" | "large";
    name?: string;
    imgSrc?: null | string;
  }) {
    const newServerDetails: ServerPrototype = {
      template:
        typeof details.template !== "undefined"
          ? details.template
          : serverDetails.template,
      targetAudience:
        typeof details.targetAudience !== "undefined"
          ? details.targetAudience
          : serverDetails.targetAudience,
      name:
        typeof details.name !== "undefined" ? details.name : serverDetails.name,
      imgSrc:
        typeof details.imgSrc !== "undefined"
          ? details.imgSrc
          : serverDetails.imgSrc,
    };

    setServerDetails(newServerDetails);
  }

  return (
    <div className={"newServerCTA" + (" activePage-" + page)}>
      {page === 1 ? (
        <NewServerPage1 changePage={nextPage} setDetails={setDetails} />
      ) : page === 2 ? (
        <NewServerPage2 changePage={nextPage} setDetails={setDetails} />
      ) : page === 3 ? (
        <NewServerPage3
          changePage={nextPage}
          setDetails={setDetails}
          displayDetails={() => {
            const details: string =
              "Template: " +
              serverDetails.template +
              "\n\nTarget Audience: " +
              serverDetails.targetAudience +
              "\n\nName: " +
              serverDetails.name +
              "\n\nServer Image: " +
              serverDetails.imgSrc;
            alert(details);
          }}
        />
      ) : (
        <NewServerPage4 changePage={nextPage} setDetails={setDetails} />
      )}
    </div>
  );
}

export default NewServerCTA;
