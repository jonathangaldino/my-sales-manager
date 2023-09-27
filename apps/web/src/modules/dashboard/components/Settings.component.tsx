import { useNavigate } from "react-router";
import { deleteToken } from "../../auth/storage";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        type="button"
        onClick={() => {
          deleteToken();
          navigate("/auth", { replace: true });
        }}
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Log out
      </button>
    </div>
  );
};

export default Settings;
