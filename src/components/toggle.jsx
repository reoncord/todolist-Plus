// Toggle.js
import React from "react";
import styled from "styled-components";
import { useTheme } from "../themeContext";

const ToggleContainer = styled.div`
  position: relative;
  margin-top: 2rem;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
  }
  //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(17, 136, 255);
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: 2.5px;
    left: 3.5px;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  }
  > .toggle--checked {
    left: 27px;
    transition: 0.5s;
  }
`;

const Desc = styled.div`
  text-align: center;
  margin: 20px;
`;

export const Toggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isOn = theme === "dark";

  return (
    <>
      <ToggleContainer onClick={toggleTheme}>
        <div className={`toggle-container ${isOn ? "toggle--checked" : ""}`} />
        <div className={`toggle-circle ${isOn ? "toggle--checked" : ""}`} />
      </ToggleContainer>
      <Desc>{isOn ? "다크 모드" : "라이트 모드"}</Desc>
    </>
  );
};
