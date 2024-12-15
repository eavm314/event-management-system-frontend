import { Role, UserInfoModel } from "@/src/app/models/userInfoModel";
import Image from "next/image";

import NoProfile from "@/public/NoProfile.webp";
import PrimaryButton from "@/src/app/components/PrimaryButton";
import { getImageUrl } from "@/src/app/helpers/getImageUrl";
import ModalMessage from "@/src/app/modals/ModalMessage";
import ModalPage from "@/src/app/modals/ModalPage";
import { downloadPhotoS3, uploadPhotoS3 } from "@/src/app/services/userService";
import { Dispatch, useEffect, useRef, useState } from "react";

interface Props {
  userInfo: UserInfoModel;
  setLoading: Dispatch<boolean>
}

const InfoPerfil = ({ userInfo, setLoading }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<string>("");

  // const [profilePhoto, setProfilePhoto] = useState<Blob>();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>();

  const [newPhoto, setNewPhoto] = useState<Blob>();
  const newPhotoUrl = newPhoto ? URL.createObjectURL(newPhoto) : undefined;


  const restartProfileImage = () => {
    setNewPhoto(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const uploadPhoto = async () => {
    setLoading(true);

    const form = new FormData();
    form.append("profilePhoto", newPhoto as File);
    form.append("userCode", userInfo.userCode);

    const result = await uploadPhotoS3(form);
    if (result) {
      setProfilePhotoUrl(URL.createObjectURL(newPhoto as File));
      setInfoMessage("Su foto de perfil se ha actualizado exitosamente.");
    } else {
      setInfoMessage("No se pudo actualizar la foto de perfil, inténtelo más tarde.");
    }
    setNewPhoto(undefined);
    setLoading(false);
    setInfoModal(true);
  }

  const getProfilePhoto = async () => {
    if (userInfo.profilePhoto) {
      // const base64 = await downloadProfilePhoto(userInfo.profilePhoto);
      // const photoUrl = getImageUrl(base64);
      const base64: string = await downloadPhotoS3(userInfo.profilePhoto);
      // console.log(base64)
      if (!base64.startsWith("<?xml")) {
        const photoUrl = getImageUrl(base64);
        setProfilePhotoUrl(photoUrl);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getProfilePhoto();
  }, []);

  return (
    <>
      {infoModal && (
        <ModalPage>
          <ModalMessage
            action={() => setInfoModal(false)}
            title={"Mensaje"}
            message={infoMessage}
          />
        </ModalPage>
      )}

      <div className="my-5 flex flex-col md:flex-row md:justify-around">
        <div className="w-80">
          <label className="hover:brightness-75">
            <Image
              className="rounded-full border-2 border-black 
            cursor-pointer aspect-square object-contain"
              src={newPhotoUrl ?? profilePhotoUrl ?? NoProfile}
              alt={userInfo.fullName}
              width={800}
              height={800}
            />
            <input type="file" hidden accept="image/*"
              ref={fileInputRef}
              onChange={(e) => setNewPhoto(e.target.files?.[0])}
            />
          </label>
          {newPhoto &&
            <div className="flex justify-evenly my-5">
              <PrimaryButton
                className="w-1/3 bg-green-400"
                textButton="Guardar"
                typeButton="button"
                action={uploadPhoto}
              />
              <PrimaryButton
                className="w-1/3 bg-red-400"
                textButton="Cancelar"
                typeButton="button"
                action={restartProfileImage}
              />
            </div>}
        </div>
        <div className="w-1/2 p-5">
          <h2 className="text-2xl font-bold mb-10">{userInfo.fullName}</h2>
          <p>Código: {userInfo.userCode}</p>
          <p>Correo electrónico: {userInfo.email}</p>
          {userInfo.role.code === Role.STUDENT &&
            <>
              <p>Estudia: {userInfo.career}</p>
              <p>Cursa actualmente el {userInfo.semester}° semestre de su carrera</p>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default InfoPerfil