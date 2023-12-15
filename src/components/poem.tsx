import { useState } from "react";
import { PoemData, PoemsResponse } from "./poem_container";

interface PoemProps {
  poem: PoemData;
  setPoems: React.Dispatch<React.SetStateAction<PoemsResponse>>;
  // toggleButton: (id: number, isLiked: boolean) => void;
}

export const Poem: React.FC<PoemProps> = ({
  poem: { id, title, body, author, isLiked },
  setPoems,
}) => {
  // const [isChecked, setIsChecked] = useState<boolean>(isLiked);
  //const [storeId, setID] = useState<number>(id);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const result = await fetch(`/poetriumph.com/api/v1/poems/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: e.target.id,
          isLiked: e.target.checked,
        }),
      });

      const updatePoem = await result.json();
      setPoems((currentPoem) =>
        currentPoem.map((poem) =>
          poem.id === updatePoem.id ? updatePoem : poem
        )
      );
      console.log(updatePoem);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <li key={id} className="poem-item">
        <h3>{title}</h3>
        <p className="poem-text">{body}</p>
        <p>{author}</p>
        <label>
          Like:{}
          <input
            className="tick-box"
            type="checkbox"
            id={id.toString()}
            checked={isLiked}
            onChange={handleChange}
          />
        </label>
      </li>
    </>
  );
};
