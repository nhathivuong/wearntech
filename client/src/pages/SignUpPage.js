import React, { useState, useContext } from 'react';
import { UserContext } from "../contexts/UserContext"; 
import styled from 'styled-components';

const SignUpPage = () => {
    const { setCurrentUser } = useContext(UserContext); 
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSignUp = async (ev) => {
        ev.preventDefault();
        const newUser = { email, name, address };
        try {
            const response = await fetch("/signUp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });
            const result = await response.json();
            if (response.status === 201) {
                setCurrentUser(result.data);
                setEmail("");
                setName("");
                setAddress("");
                setError("");
                setSuccessMessage("Sign up successful! Welcome to Wear n' Tech.");
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError("There was an error creating your account.");
        }
    };
    return (
        <>
        <Title>Sign Up</Title>
        <SignUpContainer>
            
            <StyledForm onSubmit={handleSignUp}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    required
                />
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    required
                />
                <label>Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(ev) => setAddress(ev.target.value)}
                    required
                />
                {error && <p>{error}</p>}
                {successMessage && <p>{successMessage}</p>}
                <button type="submit">Sign Up</button>
            </StyledForm>
            </SignUpContainer>
        </>
    );
};

const SignUpContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f7f7f7;
`;
const StyledForm = styled.form`
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
const Title = styled.h2`
    font-size: 2rem;
    color: #333;
`;



export default SignUpPage;
