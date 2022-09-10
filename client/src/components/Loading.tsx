import Loader from "./Loader";

function Loading() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Loader size={50} />
    </div>
  );
}

export default Loading;
