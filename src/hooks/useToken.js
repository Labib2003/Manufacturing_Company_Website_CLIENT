import { useEffect, useState } from "react"

const useToken = (user) => {
    const [token, setToken] = useState('');
    const email = user?.user?.email;
    const name = user?.user?.displayName;
    const currentUser = {
        email: email,
        name: name
    }
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/users/${email}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                });
        }
    }, [user])
    return [token, setToken];
}

export default useToken;