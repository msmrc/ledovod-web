import React, { useRef, useState } from "react";
import PageHeaderWithBack from "../../components/PageHeaderWithBack/PageHeaderWithBack";
import ActionFooter from "../../components/ActionFooter/ActionFooter";
import { useNavigate } from "react-router-dom";
import IcebreakerCreateForm from "../../components/IcebreakerCreateForm/IcebreakerCreateForm";

const CreateIcebreaker = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCreateClick = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleCancelClick = () => {
  };

  const handleFormSubmit = (data) => {
    console.log('Form Submitted', data);
  };

  return (
    <div>
      <PageHeaderWithBack title="Новый ледокол *в разработке" onBackClick={handleBackClick} />
      <IcebreakerCreateForm ref={formRef} onSubmit={handleFormSubmit} />
      <ActionFooter onCreateClick={handleCreateClick} onCancelClick={handleCancelClick} />
    </div>
  );
};

export default CreateIcebreaker;
