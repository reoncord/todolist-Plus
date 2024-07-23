import "./TodoItem.css";
import { memo } from "react";

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
      <div className={`content ${isDone ? "done" : ""}`}>{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>Del</button>
    </div>
  );
};

//Higer Order Component(HOC), 고차 컴포넌트
// export default memo(TodoItem, (prevProps, nextProps) => {
//   //반환 값에 따라, props가 바뀌었는지 아닌지 판단
//   // T -> props 바뀌지 않음 -> 리렌더링 X
//   // F -> props 바뀜 -> 리렌더링 O
//   if (prevProps.id !== nextProps.id) return false;
//   if (prevProps.isDone !== nextProps.isDone) return false;
//   if (prevProps.content !== nextProps.content) return false;
//   if (prevProps.date !== nextProps.date) return false;

//   return true;
// });

export default memo(TodoItem);
