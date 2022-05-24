import { useEffect, useState } from "react"

const useToken = (user) => {
    const [token, setToken] = useState('');
    const email = user?.user?.email;
    const currentUser = {
        email: email,
    }
    useEffect(() => {
        if (user) {
            fetch(`https://tools-manufacturer.herokuapp.com/users/${email}`, {
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