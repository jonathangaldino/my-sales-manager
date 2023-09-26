import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { uploadTransactions } from "../services/upload-transactions.service";

const UploadTransactions = () => {
  const [file, setFile] = useState<File | null>();
  const [error, setError] = useState<string | null>(null);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      file: "",
    },
  });

  const submit = async () => {
    if (!file) {
      return;
    }

    // send request
    const { error } =  await uploadTransactions(file);

    if (error) { 
      setError(error.message);
    }

    setFile(null);
    reset();
  }

  
  
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller 
        name="file" 
        control={control} rules={{
          required: 'File is required'
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange(event);

                if (!event.target.files) return;
                setFile(event?.target?.files[0]);
              }}
            />

            <button type="submit">Import!</button>
          </>
        )}
      />
    </form>
  )
};

export default UploadTransactions;
