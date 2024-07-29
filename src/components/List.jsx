import "./List.css";
import TodoItem from "./TodoItem";
import { useState, useMemo } from "react";

const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // 필터링된 데이터를 반환하는 함수
  const getFilteredData = (filterCondition) => {
    if (search === "") {
      return todos.filter(filterCondition);
    }
    return todos
      .filter(filterCondition)
      .filter((todo) =>
        todo.content.toLowerCase().includes(search.toLowerCase())
      );
  };

  // 완료된 항목과 미완료 항목을 필터링하여 최신 순서로 반환
  const filteredTodos = {
    done: getFilteredData((todo) => todo.isDone),
    notDone: getFilteredData((todo) => !todo.isDone),
  };

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);
  //의존성 배열 : deps

  // const { totalCount, doneCount, notDoneCount } = getAnalyzedData();

  return (
    <div className="List">
      <h4>Todo List✳️</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>Not Done:{notDoneCount}</div>
        <div>Done:{doneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        <h5>Not Done</h5>
        {filteredTodos.notDone.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
        <h5>Done</h5>
        {filteredTodos.done.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
