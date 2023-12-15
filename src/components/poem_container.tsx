import { useEffect, useState } from "react";
import { PoemItem } from "../mock_api/data";
import { PoemsList } from "./poems_list";
import { AddPoem } from "./add_poem";
import { ShowLoading } from "./show_loading";

export interface PoemData extends PoemItem {
  id: number;
}
export type PoemsResponse = Array<PoemData>;

export const PoemContainer: React.FC = () => {
  const [poems, setPoems] = useState<PoemsResponse>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPoems() {
      if (loading) return;
      setLoading(true);
      const data = await fetch("/poetriumph.com/api/v1/poems");
      const result: PoemsResponse = await data.json();
      setPoems(result);
      setLoading(false);
    }
    getPoems();
  }, []);

  return (
    <>
      <h1>Nature Poems: An Articifial Perspective</h1>
      {loading && <ShowLoading />}
      {!loading && <AddPoem setPoems={setPoems} />}
      {!loading && <PoemsList poems={poems} setPoems={setPoems} />}
    </>
  );
};
