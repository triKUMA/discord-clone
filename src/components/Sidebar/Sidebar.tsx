import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../app/store";
import { setUser } from "../../features/user/userSlice";
import "./styles/Sidebar.css";

function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state: StoreType) => state.user);

  return (
    <div
      className="sidebar"
      onClick={() =>
        dispatch(
          setUser({
            id: 1,
            username: "",
            discriminator: 1,
            displayName: "",
            profileURL: "",
          })
        )
      }
    >
      <header></header>
    </div>
  );
}

export default Sidebar;
