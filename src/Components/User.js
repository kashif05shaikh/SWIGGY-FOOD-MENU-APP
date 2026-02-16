import { useEffect, useState } from "react";

const User = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
  }, [count]);
  return (
    <div className="user-card">
      <h1>Count: {count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
      <h2>NAME: SHAIKH KASHIF AHMED</h2>
      <h3>LOCATION: MUMBAI</h3>
      <h4>CONTACT: kashif05@gmail.com</h4>
    </div>
  );
};

export default User;
