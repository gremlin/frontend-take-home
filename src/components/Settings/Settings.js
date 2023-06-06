export const Settings = ({ throwError, setThrowError }) => {
  return (
    <div className="flex flex-col">
      <label>
        <input
          type="checkbox"
          checked={throwError}
          onChange={() => setThrowError(!throwError)}
          className="mr-1"
        />
        Throw error on request
      </label>
    </div>
  );
};
