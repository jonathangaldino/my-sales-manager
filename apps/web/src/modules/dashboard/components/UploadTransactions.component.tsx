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
    const { error } = await uploadTransactions(file);

    if (error) {
      setError(error.message);
    }

    setFile(null);
    reset();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit(submit)}>
          <Controller
            name="file"
            control={control}
            rules={{
              required: "File is required",
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload file
                </label>
                <input
                  className="block w-full text-sm text-gray-900 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  value={value}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(event);

                    if (!event.target.files) return;
                    setFile(event?.target?.files[0]);
                  }}
                />

                <button
                  type="submit"
                  className="inline-flex items-center justify-center p-0.5 mb-2 mt-4 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                >
                  <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Import it!
                  </span>
                </button>
              </>
            )}
          />
        </form>
      </div>
    </div>
  );
};

export default UploadTransactions;
