import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/RestaurentApi";
import ManageRestuarantForm from "@/form/restuarant-form/ManageRestuarantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: createRestaurantLoading } = useCreateMyRestaurant();

  const { restaurant } = useGetMyRestaurant();

  const { updateRestaurant, isLoading: updateRestaurantLoading } = useUpdateMyRestaurant();

  const isEditing = !!restaurant;

  return (
    <ManageRestuarantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={createRestaurantLoading || updateRestaurantLoading}
    />
  );
};

export default ManageRestaurantPage;
