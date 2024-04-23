import { API } from "@/config/constants";
import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = API;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getCurrentUser = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("failed to fetch user");
    }

    return res.json();
  };

  const { data: currentUser, isLoading, error } = useQuery("fetchcCurrentUser", getCurrentUser);

  if (error) toast.error(error.toString());

  // if (!currentUser) {
  //   return <span>Unable to load current user</span>;
  // }

  return {
    currentUser,
    isLoading,
  };
};

type createUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserReq = async (user: createUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserReq);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type updateMyUserReqProps = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const udpateMyUserReq = async (formData: updateMyUserReqProps) => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to update");
    }

    return res.json();
  };

  const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(udpateMyUserReq);

  if (isSuccess) {
    toast.success("User profile updated!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isLoading,

    isSuccess,
    error,
  };
};
