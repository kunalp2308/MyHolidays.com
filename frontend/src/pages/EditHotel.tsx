import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManagerHotelForm from "../form/ManageHotelForm/ManageHotelForm";
import { Toaster, toast } from "react-hot-toast";

const EditHotel = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchMyHotelsById",
    () => apiClient.fetchMyHotelsById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      toast.success("Hotel Saved!", {
        duration: 5000,
      });
    },
    onError: () => {
      toast.error("Error Saving Hotel");
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <>
      <ManagerHotelForm
        hotel={hotel}
        onSave={handleSave}
        isLoading={isLoading}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default EditHotel;
