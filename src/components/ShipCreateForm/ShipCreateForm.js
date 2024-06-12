import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./ShipCreateForm.module.css";
import TextInput from "../TextInput/TextInput";

const ShipCreateForm = forwardRef(({ onSubmit }, ref) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      shipName: "",
      iceClass: "",
      speed: "",
    },
  });

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.formDetails}>
        <Controller
          name="shipName"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Название судна"
              value={field.value}
              onChange={field.onChange}
              name={field.name}
            />
          )}
        />

        <div className={styles.inlineFormGroup}>
          <Controller
            name="iceClass"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Ледовый класс"
                value={field.value}
                onChange={field.onChange}
                name={field.name}
              />
            )}
          />

          <Controller
            name="speed"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Скорость, узлы (по чистой воде)"
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

export default ShipCreateForm;
