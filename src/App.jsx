import { useState, useRef, useReducer, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

const initialData = []; // 초기 데이터 비워두기

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      // 새 항목 추가 시 최신 순서로 정렬
      return [...state, action.data].sort((a, b) => b.date - a.date); // 미완료 항목은 최신 순서로 정렬
    case "UPDATE":
      // 항목 업데이트 시 완료 상태 변경 및 최신 순서로 정렬
      return state
        .map((item) =>
          item.id === action.targetId
            ? { ...item, isDone: !item.isDone, date: new Date().getTime() }
            : item
        )
        .sort((a, b) => a.isDone - b.isDone || b.date - a.date); // 완료된 항목은 최신 순서로 정렬
    case "DELETE":
      return state
        .filter((item) => item.id !== action.targetId)
        .sort((a, b) => a.isDone - b.isDone || b.date - a.date); // 미완료 항목 최신 순서로 정렬
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, initialData);
  const idRef = useRef(1);

  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
