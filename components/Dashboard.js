import { useState } from "react";
import useSWR from "swr";
// import styles from "/styles/Home.module.css";

function useWordList(keyword) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/?key=${keyword}`, fetcher);

  return {
    wordList: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function SearchResult({ keyword }) {
  const { wordList, isLoading, isError } = useWordList(keyword);
  if (isLoading) return <div className="hint">Loading...</div>;
  if (!keyword) return <div className="hint">Try search 'now'</div>;
  if (isError || !wordList.length)
    return <div className="hint">No result! 🚨</div>;

  const displayLimit = 10;

  return (
    <div>
      {wordList.slice(0, displayLimit).map((word, i) => {
        return (
          <div
            className="block item"
            key={`${i}`}
            data={word}
            onClick={(e) => {
              alert(`You chose: ⚡️ ${e.target.innerText} ⚡️`);
            }}
          >
            {word}
          </div>
        );
      })}
      {wordList.length > displayLimit ? (
        <div className="info">{`...and ${
          wordList.length - displayLimit
        } more`}</div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

function SearchBar({ inputValue, onInputChange }) {
  return (
    <section className="block wrapper searchbar ">
      <input
        value={inputValue}
        onChange={onInputChange}
        id="create-task-input"
        type="text"
        className="textArea"
        placeholder="Search a keyword..."
      />
    </section>
  );
}

export default function Dashboard() {
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState([]);

  let onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // let onClickWord = (e) => {};
  return (
    <div className="dashboard">
      <SearchBar
        inputValue={inputValue}
        onInputChange={onInputChange}
      ></SearchBar>
      <ul className="block fixed result">
        <SearchResult keyword={inputValue} />
      </ul>
    </div>
  );
}
