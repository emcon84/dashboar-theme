const userMock = {
  name: "Emiliano Conti",
  email: "emiliano@example.com",
  avatar: "https://i.pravatar.cc/150?img=3", // avatar random
};

const Profile = () => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow m-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Perfil del Usuario
      </h2>
      <div className="flex items-center space-x-6">
        <img
          src={userMock.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full shadow"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {userMock.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{userMock.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
