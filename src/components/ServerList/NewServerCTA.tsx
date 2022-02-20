import { useState } from "react";
import { IconType } from "react-icons";
import "./styles/NewServerCTA.css";
import { BiChevronRight } from "react-icons/bi";
import Button from "../general/Button/Button";

interface PageChangeProps {
  iconSrc: string;
  title: string;
  desc?: string;
  onClick: () => void;
}

function PageChange(props: PageChangeProps) {
  return (
    <button className="pageChange">
      <img src={props.iconSrc} alt="" className="icon" />
      {/* <svg>
        <use xlinkHref={props.iconSrc}></use>
      </svg> */}
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
      <div className="pageChangeWrapper">
        <PageChange
          iconSrc="https://discord.com/assets/f303eeb986430817ee8a52a9b81aea45.svg"
          title="Create My Own"
          onClick={() => {
            props.changePage(2);
          }}
        />

        <p className="pageChangeGroupTitle">Start From a Template</p>
        <PageChange
          iconSrc="https://discord.com/assets/a053c2e82b0c5e6a4cc853ca846cc000.svg"
          title="Gaming"
          onClick={() => {
            props.changePage(2);
          }}
        />
        <PageChange
          iconSrc="https://discord.com/assets/fde233b6899a1a0fac64c419724e668b.svg"
          title="School Club"
          onClick={() => {
            props.changePage(2);
          }}
        />
        <PageChange
          iconSrc="https://discord.com/assets/b7b57e9fa6377409691f498d5d48714e.svg"
          title="Study Group"
          onClick={() => {
            props.changePage(2);
          }}
        />
        <PageChange
          iconSrc="https://discord.com/assets/2cb8e7219e1554e094c4a0316e0ab2c2.svg"
          title="Friends"
          onClick={() => {
            props.changePage(2);
          }}
        />
        <PageChange
          iconSrc="https://discord.com/assets/45d6946387a0c66f4eb4e62a6e7758ea.svg"
          title="Artists & Creators"
          onClick={() => {
            props.changePage(2);
          }}
        />
        <PageChange
          iconSrc="https://discord.com/assets/5d8898dd9356f25901bae20fc8c980d9.svg"
          title="Local Community"
          onClick={() => {
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
  return <div className="page2"></div>;
}

function NewServerPage3(props: PageProps) {
  return <div className="page3"></div>;
}

function NewServerPage4(props: PageProps) {
  return <div className="page4"></div>;
}

function NewServerCTA() {
  const [page, setPage] = useState(1);

  const nextPage = (index: number) => {
    setPage(index);
  };

  return (
    <div className="newServerCTA">
      {page === 1 ? (
        <NewServerPage1 changePage={nextPage} />
      ) : page === 2 ? (
        <NewServerPage2 changePage={nextPage} />
      ) : page === 3 ? (
        <NewServerPage3 changePage={nextPage} />
      ) : (
        <NewServerPage4 changePage={nextPage} />
      )}
    </div>
  );
}

export default NewServerCTA;
