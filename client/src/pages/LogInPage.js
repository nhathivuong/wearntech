import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

const LogInPage = () => {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ status, setStatus ] = useState("idle");
    const [ error, setError ] = useState(null);  //Error message to appear should there be any issues
    const { setCurrentUser } = useContext(UserContext); 

    const handleSubmit = async (ev) => {
        try {
            ev.preventDefault();
            setError(null);
            setStatus("logging")
            const logInData = {
                email
            }
            const body = JSON.stringify( logInData );
            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body
            };
            const response = await fetch('/logIn', options); 
            const data = await response.json();
            if (data.status !== 200) {
                setStatus("idle");
                setError("Please enter a valid email")
            } else {
            setCurrentUser( data.data);
            navigate(`/`);
            }

        } catch (err) {
            console.log(error);
        }
    };

    return (
        <>
            <h2>Wear and Tech Log In:</h2>
            { currentUser? ( // If the user is already logged in.
                <section>
                    <p>You're already signed in.</p>
                    <p>Please sign out if you wish to log in with a different account.</p>
                </section>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>Please enter your email:
                        <input value={email} onChange={(ev)=>{setEmail(ev.target.value)}}></input>
                    </label>
                    <button disabled={!email || status === "logging"}>Log In</button>
                    {
                        error && <p>{error}</p>
                    }
                </form>
            )}
        </>
    )
}

export default LogInPage;