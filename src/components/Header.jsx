import "./Header.css";
import { memo } from "react";
import { Toggle } from "./toggle";

const Header = () => {
  return (
    <div className="Header">
      <div className="head">
        <h3> 오늘은 📆</h3>
        <Toggle />
      </div>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

//const memoizedHeader = memo(Header);
//자신이 받는 props 변화 없으면 리렌더링 제외

export default memo(Header);
