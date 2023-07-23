import { TextField, Button, Container } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const items = {
      name,
      email,
      phoneNumber,
    };
    localStorage.setItem("items", JSON.stringify(items));
    navigate("/secondpage");
  };
  return (
    <Container
      maxWidth='sm'
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
          required
          margin='normal'
          fullWidth
          label='Name'
          id='Name'
        />
        <TextField
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
          required
          margin='normal'
          fullWidth
          label='Email'
          id='Email'
        />
        <TextField
          value={phoneNumber}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneNumber(event.target.value);
          }}
          required
          margin='normal'
          fullWidth
          label='Phone Number'
          id='Phone Number'
        />
        <Button type='submit' fullWidth variant='contained'>
          Save
        </Button>
      </form>
    </Container>
  );
}
