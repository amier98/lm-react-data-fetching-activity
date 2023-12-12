import { PoemsResponse } from "./poem_container";
import { ChangeEvent, useState } from "react";

type AddPoemProps = {
  setPoems: React.Dispatch<React.SetStateAction<PoemsResponse>>;
};
export const AddPoem: React.FC<AddPoemProps> = ({ setPoems }) => {
  const [inputData, setInputData] = useState({
    title: "",
    body: "",
    author: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputData((currentData) =>
      Object.assign({}, currentData, {
        [event.target.id]: event.target.value,
      })
    );
  }

  async function handleSubmitPoem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const result = await fetch("/poetriumph.com/api/v1/poems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: inputData.author,
          body: inputData.body,
          title: inputData.title,
        }),
      });

      if (result.ok) {
        const { poem } = await result.json();
        setPoems((currentPoem) => [...currentPoem, poem]);
      }
      // This is where you'll implement some data fetching logic to POST a new poem to the API
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>Post a New Poem</h2>
      <form className="add-poem" onSubmit={handleSubmitPoem}>
        <label>
          Poem Title:{" "}
          <input
            type="text"
            name="title"
            id="title"
            value={inputData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Poem Text:{" "}
          <input
            type="textarea"
            name="body"
            id="body"
            value={inputData.body}
            onChange={handleChange}
          />
        </label>
        <label>
          Author:{" "}
          <input
            type="text"
            name="author"
            id="author"
            value={inputData.author}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add to Collection</button>
      </form>
    </>
  );
};
