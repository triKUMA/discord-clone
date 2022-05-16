import { PostType } from "../../../../types/PostType";
import "./styles/Post.css";

interface PostProps {
  details: PostType;
  initial?: boolean;
}

function Post(props: PostProps) {
  return (
    <div className={"post" + (props.initial === true ? " initial" : "")}>
      {props.details.text}
    </div>
  );
}

export default Post;
