"use client";
import { useEffect, useState } from "react";

import ModalLoading from "../../modals/ModalLoading";
import ModalPage from "../../modals/ModalPage";
import { UserInfoModel } from "../../models/userInfoModel";
import { getUserInfo } from "../../services/userService";
import InfoPerfil from "./components/InfoPerfil";

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserInfoModel>();
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    const userData = await getUserInfo();
    setProfile(userData);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return (
    <>
      {loading && (
        <ModalPage>
          <ModalLoading />
        </ModalPage>
      )}
      <div className="bg-slate-100 h-screen">
        {profile &&
          <InfoPerfil userInfo={profile} setLoading={setLoading} />
        }
      </div>
    </>
  );
};

export default ProfilePage;
