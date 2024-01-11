import UserProfile from "@/components/UserProfile/UserProfile";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";

const ProfilePage = () => {
  return (
    <div>
      <CommonBreadCrumb
        items={[
          {
            label: "profile",
            link: `/profile`,
          },
        ]}
      />

      <UserProfile />
    </div>
  );
};

export default ProfilePage;
