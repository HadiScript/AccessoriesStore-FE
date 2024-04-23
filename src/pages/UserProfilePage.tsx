import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/form/user-profile/UserProfileForm";

const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLaoding } = useUpdateMyUser();

  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  if (isGetLoading) {
    return <span>loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLaoding} />;
};

export default UserProfilePage;
