import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router";

const Emailvarification = () => {
  const { token } = useParams();
  const navigate = useNavigate()
  const registration = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_URL}/verify/${token}`,
      );
      navigate("/login")

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl pb-2">Emailvarification</h1>
      <button
        className="bg-black text-white px-4 py-2 cursor-pointer"
        onClick={registration}
      >
        Varify
      </button>
    </div>
  );
};

export default Emailvarification;
