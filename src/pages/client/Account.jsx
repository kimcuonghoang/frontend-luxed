import React, { useEffect, useState } from "react";
import { Card, Avatar, Button } from "antd";
import { FiUser, FiLock, FiMapPin, FiLogOut, FiMail } from "react-icons/fi";
import { getUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [user, setUser] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser();
      setUser(res.data.data[0]);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    // Xử lý logout
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto">
        <Card className="rounded-2xl shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar size={100} src={user.avatar} />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{user.fullName}</h2>
              <p className="text-gray-500 flex items-center gap-2">
                <FiMail /> {user.email}
              </p>
              <div className="mt-4 flex gap-2">
                <Button type="primary">Edit Profile</Button>
                <Button danger onClick={handleLogout} icon={<FiLogOut />}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Card className="rounded-xl hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <FiUser className="text-2xl text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Personal Info</h3>
                <p className="text-gray-500 text-sm">
                  View and edit your name, email, phone.
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <FiLock className="text-2xl text-yellow-500" />
              <div>
                <h3 className="text-lg font-semibold">Security</h3>
                <p className="text-gray-500 text-sm">
                  Change your password, 2FA settings.
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <FiMapPin className="text-2xl text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Addresses</h3>
                <p className="text-gray-500 text-sm">
                  Manage shipping & billing addresses.
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <FiLogOut className="text-2xl text-red-500" />
              <div>
                <h3 className="text-lg font-semibold">Logout Sessions</h3>
                <p className="text-gray-500 text-sm">
                  Review and sign out of other devices.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
