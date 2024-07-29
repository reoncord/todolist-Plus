// App.js
import { useState, useRef, useReducer, useCallback } from "react";
import styled, {
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { ThemeProvider, useTheme } from "./themeContext";
import { lightTheme, darkTheme } from "./theme";
import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import { Toggle } from "./components/toggle";

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

const Body = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  width: 100%;
  max-width: 1200px; // 최대 너비 설정
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s linear;
  margin: 0 auto; // 가로 중앙 정렬
  padding: 20px; // 패딩 추가
`;

function AppContent() {
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
    if (window.confirm("정말 삭제하시겠나요?")) {
      dispatch({
        type: "DELETE",
        targetId: targetId,
      });
    }
  }, []);

  return (
    <>
      <Header />
      <Toggle />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </>
  );
}

function App() {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Body>
        <AppContent />
      </Body>
    </StyledThemeProvider>
  );
}

export default function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
