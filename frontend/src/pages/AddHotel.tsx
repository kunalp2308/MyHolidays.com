import { useMutation } from "react-query";
import ManageHotelForm from "../form/ManageHotelForm/ManageHotelForm";
import toast, { Toaster } from "react-hot-toast";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      toast.success("Hotal Saved Sucessful!", {
        duration: 5000,
      });
    },
    onError: () => {
      toast.error("Error saving Hotel!");
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default AddHotel;
