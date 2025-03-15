import { useSearchParams } from "react-router";

const Results = () => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <strong>Path: </strong>{location.pathname}
      <br />
      <strong>User query: </strong>{searchParams.get("q")}
    </>
  );
};

export default Results;
