const Loader = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-6 h-6 border-4 border-blue-200 rounded-full animate-spin"
      ></div>
      <p className="ml-2">Loading...</p>
    </div>
  );
};

export default Loader;
