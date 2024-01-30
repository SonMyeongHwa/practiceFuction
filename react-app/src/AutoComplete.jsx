import { useState } from 'react'
import styled from "styled-components";

const fruits = [
  "apple",
  "banana",
  "orange",
  "lemon",
  "lime",
  "pure",
  "peach",
  "berry",
  "dorian",
  "mango",
  "starfruit",
  "dragonFruit",
  "almond",
  "walnut",
  "grape",
  "persimmon",
];

const AutoComplete = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [optionOver, setOptionOver] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputFocus = (e) => {
    setIsHidden(false);
  };
  const handleInputFocusOut = (e) => {
    if (optionOver) return;
    setIsHidden(true);
  };

  const handleOptionMouseOver = (e) => {
    setOptionOver(true);
  };
  const handleOptionMouseLeave = (e) => {
    setOptionOver(false);
  };
  
  const handleOptionClick = (e) => {
    setInputValue(e.target.textContent);
    setIsHidden(true);
  };

  return (
    <SelectBox>
      <Input
        type={"search"}
        value={inputValue}
        onFocus={handleInputFocus}
        onBlur={handleInputFocusOut}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요"
      />
      <SelectOptions hidden={isHidden}>
        {fruits.map((fruit, index) => (
          <Option
            key={index}
            value={fruit}
            onMouseOver={handleOptionMouseOver}
            onMouseLeave={handleOptionMouseLeave}
            onClick={handleOptionClick}
            hidden={!fruit.includes(inputValue)}
          >
            {fruit}
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
}

export default AutoComplete;

const SelectBox = styled.div`
  position: relative;
  width: 200px;
  height: 20px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid lightgray;
  cursor: pointer;

  &::before {
    content: "▼";
    position: absolute;
    right: 8px;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 22px;
  left: 0;
  width: 100%;
  overflow: hidden;
  padding: 0;
  border: 1px solid lightgray;
  border-radius: 5px;
`;
const Option = styled.li`
  padding: 8px;

  &:hover {
    background-color: lightgray;
  }
`;