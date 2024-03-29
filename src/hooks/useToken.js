import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  const email = user?.user?.email;

  useEffect(() => {
    const currentUser = {
      email: email,
    };
    if (user) {
      fetch(
        `https://manufacturing-company-website-server.vercel.app/api/v1/users/${email}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
        });
    }
  }, [user, email]);
  return [token, setToken];
};

export default useToken;
