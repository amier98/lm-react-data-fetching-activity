import { Poem } from "./poem";
import { PoemsResponse } from "./poem_container";

interface PoemsListProps {
  poems: PoemsResponse;
  setPoems: React.Dispatch<React.SetStateAction<PoemsResponse>>;
}

export const PoemsList: React.FC<PoemsListProps> = ({ poems, setPoems }) => {
  // receive the data on props and map over it here
  // you can use the Poem component for each item in the list
  return (
    <>
      {poems.map((peom) => (
        <Poem key={peom.id} poem={peom} setPoems={setPoems}></Poem>
      ))}
    </>
  );
};
