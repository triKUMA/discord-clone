import { PostGroupType } from "../../../../types/PostType";
import Post from "./Post";
import "./styles/PostGroup.css";

interface PostGroupProps {
  details: PostGroupType;
}

function PostGroup(props: PostGroupProps) {
  return (
    <div className="postGroup">
      {props.details.posts.map((post, i) => (
        <Post details={post} initial={i === 0} />
      ))}
    </div>
  );
}

export default PostGroup;
