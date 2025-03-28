import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import styled from "styled-components"

const LogInPage = () => {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ status, setStatus ] = useState("idle");
    const [ error, setError ] = useState(null);  //Error message to appear should there be any issues
    const { currentUser, setCurrentUser } = useContext(UserContext); 

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
                setError("We could not find an account with that email...")
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
            <Title>Log In</Title>
            <LogInContainer>
            
            { currentUser? ( // If the user is already logged in.
                <StyledSection>
                    <p>You're already signed in.</p>
                    <p>Please sign out first, if you wish to log in with a different account.</p>
                </StyledSection>
            ) : (
                <StyledForm onSubmit={handleSubmit}>
                    <p>Please enter your login information.</p>
                    <label>Email:</label>
                    <StyledInput type="email" value={email} onChange={(ev)=>{
                        setEmail(ev.target.value)
                        setError(null)
                        }}></StyledInput>
                    <StyledButton disabled={!email || status === "logging"}>Log In</StyledButton>
                    {
                        error && <ErrorMessage>{error}</ErrorMessage>
                    }
                </StyledForm>
            )}
            </LogInContainer>
        </>
    )
}

export default LogInPage;

const Title = styled.h2`
    font-size: 2rem;
    color: #333;
`;

const LogInContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
    background-color: #f7f7f7;
`;

const StyledForm = styled.form`
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;

    & p {
        padding: 1rem 0;
        font-size: 1.25rem;
        font-weight: bold;
    }

    & label {
        padding: 1rem;
    }
`;

const StyledSection = styled.section`
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;

    & p {
        padding: 1rem 0;
        font-size: 1.25rem;
        font-weight: bold;
    }
`
const StyledInput = styled.input`
    padding: 0.25rem;
    font-size: 1rem;
`
const StyledButton = styled.button`
    display: block;
    margin: 1rem auto 0;
    background-color: var(--color-yellow);
    border-radius: 5px;
    color: var(--color-white);
    border: 2px solid var(--color-black);
    padding: 10px;
    font-weight: bold;
    font-size: 15px;

    &:hover {
        cursor: pointer;
    }

    &:active {
        transform: scale(0.95);
    }

    &:disabled {
        opacity: 50%;
        cursor: not-allowed;
    }
`
const ErrorMessage = styled.p`
    color: var(--color-red);
`
