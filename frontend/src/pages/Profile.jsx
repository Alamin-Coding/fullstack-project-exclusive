import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import Button from "../components/Button";
import ListUl from "../components/ListUl";
import ListLi from "../components/ListLi";
import { updateUser } from "../Slices/authSlice";
import UserAvatar from "../components/UserAvatar";

const API_URL = import.meta.env.VITE_AUTH_URL;

const emptyProfile = {
  name: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  avatar: "",
  role: "user",
  isVerified: false,
};

const emptyPassword = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(emptyProfile);
  const [passwords, setPasswords] = useState(emptyPassword);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const authHeader = () => ({
    headers: { Authorization: user?.accesstoken },
  });

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/profile/${user.id}`, authHeader());
        if (data.profile) {
          setProfile(data.profile);
          dispatch(updateUser({
            name: data.profile.name,
            email: data.profile.email,
            avatar: data.profile.avatar || "",
          }));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id, navigate]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const { data } = await axios.put(
        `${API_URL}/profile/${user.id}`,
        {
          name: profile.name,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phoneNumber: profile.phoneNumber,
          address: profile.address,
          avatar: profile.avatar,
        },
        authHeader()
      );

      if (data.success) {
        toast.success(data.message);
        setProfile(data.profile);
        dispatch(updateUser({
          name: data.profile.name,
          email: data.profile.email,
          avatar: data.profile.avatar || "",
        }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleSavePassword = async (event) => {
    event.preventDefault();
    setChangingPassword(true);

    try {
      const { data } = await axios.put(
        `${API_URL}/profile/${user.id}/password`,
        passwords,
        authHeader()
      );

      if (data.success) {
        toast.success(data.message);
        setPasswords(emptyPassword);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setChangingPassword(false);
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <Container>
        <p className="py-20 text-center text-slate-500">Loading profile...</p>
      </Container>
    );
  }

  const displayName = profile.firstName || profile.name || user.email;

  return (
    <Container>
      <div className="flex flex-col gap-2 justify-between mt-10 mb-20 lg:flex-row lg:items-center">
        <BreadCrumb />
        <div className="flex items-center gap-3">
          <UserAvatar src={profile.avatar} name={displayName} size="md" />
          <h2 className="font-poppins">
            Welcome! <span className="text-primary text-sm">{displayName}</span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="lg:w-[25%]">
          <div className="mb-8 flex flex-col items-center rounded-sm bg-[#f5f5f5] p-6 text-center">
            <UserAvatar src={profile.avatar} name={displayName} size="xl" />
            <h3 className="mt-4 font-poppins font-medium">{displayName}</h3>
            <p className="mt-1 text-sm text-secondary">{profile.email}</p>
          </div>

          <div>
            <h2 className="font-poppins font-medium">Manage My Account</h2>
            <ListUl className="pl-10 pt-4 font-poppins">
              <ListLi className="text-primary">My Profile</ListLi>
              {user.role === "admin" && (
                <ListLi className="text-secondary hover:text-primary">
                  <NavLink to="/dashboard">Admin Dashboard</NavLink>
                </ListLi>
              )}
              <ListLi className="text-secondary hover:text-primary">
                <NavLink to="/wishlist">My WishList</NavLink>
              </ListLi>
              <ListLi className="text-secondary hover:text-primary">
                <NavLink to="/attocart">My Cart</NavLink>
              </ListLi>
            </ListUl>
          </div>

          <div className="mt-8 rounded-sm bg-[#f5f5f5] p-5 font-poppins text-sm">
            <p className="font-medium">Account type</p>
            <p className="mt-2 capitalize text-primary">{profile.role}</p>
            <p className="mt-4 font-medium">Email verified</p>
            <p className="mt-2">{profile.isVerified ? "Yes" : "No"}</p>
          </div>
        </div>

        <div className="shadow-sm rounded-sm px-6 py-10 lg:px-20 lg:w-[70%]">
          <h2 className="text-primary text-xl font-medium">Edit Your Profile</h2>

          <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block font-poppins">
                Full Name
                <input
                  type="text"
                  name="name"
                  value={profile.name || ""}
                  onChange={handleProfileChange}
                  placeholder="Full name"
                  className="w-full h-12.5 pl-4 bg-[#f5f5f5] mt-2 rounded-sm focus:outline-none"
                />
              </label>
              <label className="block font-poppins lg:col-span-2">
                Avatar URL
                <input
                  type="url"
                  name="avatar"
                  value={profile.avatar || ""}
                  onChange={handleProfileChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full h-12.5 pl-4 bg-[#f5f5f5] mt-2 rounded-sm focus:outline-none"
                />
              </label>
              {profile.avatar && (
                <div className="flex items-end">
                  <UserAvatar src={profile.avatar} name={displayName} size="lg" />
                </div>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block font-poppins">
                First Name
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName || ""}
                  onChange={handleProfileChange}
                  placeholder="First name"
                  className="w-full h-12.5 pl-4 bg-[#f5f5f5] mt-2 rounded-sm focus:outline-none"
                />
              </label>
              <label className="block font-poppins">
                Last Name
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName || ""}
                  onChange={handleProfileChange}
                  placeholder="Last name"
                  className="w-full h-12.5 pl-4 bg-[#f5f5f5] mt-2 rounded-sm focus:outline-none"
                />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block font-poppins">
                Email
                <input
                  type="email"
                  name="email"
                  value={profile.email || ""}
                  onChange={handleProfileChange}
                  placeholder="Email"
                  className="w-full h-12.5 pl-4 bg-[#f5f5f5] mt-2 rounded-sm focus:outline-none"
                  required
                />
              </label>
              <label className="block font-poppins">
                Phone
                <input
                  type="text"
                  name="phoneNumber"
                  value={profile.phoneNumber || ""}
                  onChange={handleProfileChange}
                  placeholder="Phone number"
                  className="w-full h-12.5 pl-4 bg-[#f5f5f5] mt-2 rounded-sm focus:outline-none"
                />
              </label>
            </div>

            <label className="block font-poppins">
              Address
              <input
                type="text"
                name="address"
                value={profile.address || ""}
                onChange={handleProfileChange}
                placeholder="Address"
                className="w-full h-12.5 pl-4 bg-[#f5f5f5] mt-2 rounded-sm focus:outline-none"
              />
            </label>

            <div className="flex justify-end gap-6 pt-2">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-4 font-poppins hover:text-primary"
              >
                Cancel
              </button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-primary hover:bg-[#b30606] px-12 py-4 font-poppins text-white rounded-sm"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>

          <form onSubmit={handleSavePassword} className="mt-10 border-t border-secondary pt-8">
            <h2 className="font-poppins font-medium">Password Changes</h2>

            <label className="block font-poppins mt-4">
              Current Password
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Current password"
                className="w-full h-12.5 pl-4 bg-[#f5f5f5] mt-2 rounded-sm focus:outline-none"
              />
            </label>

            <label className="block font-poppins mt-4">
              New Password
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                placeholder="New password"
                className="w-full h-12.5 pl-4 bg-[#f5f5f5] mt-2 rounded-sm focus:outline-none"
              />
            </label>

            <label className="block font-poppins mt-4">
              Confirm New Password
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                className="w-full h-12.5 pl-4 bg-[#f5f5f5] mt-2 rounded-sm focus:outline-none"
              />
            </label>

            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                disabled={changingPassword}
                className="bg-black hover:bg-[#333] px-12 py-4 font-poppins text-white rounded-sm"
              >
                {changingPassword ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
