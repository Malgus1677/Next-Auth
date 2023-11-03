"use client";
import React, { useRef } from "react";

const Form = ({ action, ...props }) => {
    const formRef = useRef();
    async function handleAction(formData) {
        await action(formData);
        formRef.current.reset();
    }
    return(
        <form ref={formRef} action={handleAction} {...props} />
    );
};

export default Form;