// src/screens/AdminViews/utils/FunctionsLoginAdmin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLoginAdmin = () => {
     const [email, setEmail] = useState("");
     const [contrasena, setContrasena] = useState("");
     const [error, setError] = useState("");
     const navigate = useNavigate();

     return {email, setEmail, contrasena, setContrasena, error, setError, navigate}

}

export const colors = {
    cream: '#FEF3E2',
    yellow: '#FAB12F',
    orange: '#FA812F',
    red: '#FA4032'
  };
