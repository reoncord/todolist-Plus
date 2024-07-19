import "./Editor.css";
import { useState, useRef } from "react";

const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeyDown = (e) => {
    //엔터키로 추가 가능
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    //input 내용 없으면 추가 X
    if (content === "") {
      contentRef.current.focus(); //내용이 빈 걸 알려주기 위해 포커스
      return;
    }
    onCreate(content);
    setContent(""); //input 넣고 추가하면 input 창 비워짐
  };
  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeyDown}
        onChange={onChangeContent}
        placeholder="새로운 ToDo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
