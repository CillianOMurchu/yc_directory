import { Search } from "@/app/components/Search";

export default function Home({searchParams:Promise<{query:string}>}) {
  const { query } = await searchParams.query;
  return (
    <>
      <div className="pink_container">
        <h1 className="heading">Home</h1>

        <Search />
      </div>
    </>
  );
}
