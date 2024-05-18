import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Sign Out Sucessful!", {
        duration: 5000,
      });
      navigate("/");
    },
    onError: (errors: Error) => {
      toast.error(errors.message);
    },
  });
  const handleClick = () => {
    console.log("Hi There");
    mutation.mutate();
  };
  return (
    <>
      <button
        className=" text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 rounded-sm"
        onClick={handleClick}
      >
        SignOut
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default SignOutButton;
