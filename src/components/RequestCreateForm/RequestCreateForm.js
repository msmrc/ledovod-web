import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./RequestCreateForm.module.css";
import TextInput from "../TextInput/TextInput";

const RequestCreateForm = forwardRef(({ onSubmit }, ref) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      requestName: "",
      ship: "",
      departureDate: "",
      pointA: "",
      pointB: "",
    },
  });

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <Controller
        name="requestName"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Название заявки"
            value={field.value}
            onChange={field.onChange}
            name={field.name}
          />
        )}
      />

      <div className={styles.formDetails}>
        <Controller
          name="ship"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Выбрать корабль"
              value={field.value}
              onChange={field.onChange}
              name={field.name}
            />
          )}
        />

        <div className={styles.inlineFormGroup}>
          <Controller
            name="departureDate"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Дата отправления"
                value={field.value}
                onChange={field.onChange}
                name={field.name}
              />
            )}
          />

          <Controller
            name="pointA"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Точка А"
                value={field.value}
                onChange={field.onChange}
                name={field.name}
              />
            )}
          />

          <Controller
            name="pointB"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Точка Б"
                value={field.value}
                onChange={field.onChange}
                name={field.name}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
});

export default RequestCreateForm;
