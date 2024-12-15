"use client";
import InfoImage from "@/src/app/components/InfoImage";
import Link from "next/link";
import PrimaryButton from "../components/PrimaryButton";
import LinkRedirector from "../components/LinkRedirector";
import { useRouter } from "next/navigation";
import InteractiveSectionPrimaryForm from "../components/InteractiveSectionPrimaryForm";

const HomePage = () => {
  const router = useRouter();

  const goInicio = () => {
    router.push("/eventos");
  };

  const goRegister = () => {
    router.push("/auth/register");
  };

  return (
    <InfoImage urlImage={"/ImagenInicio.png"} imageTitle="Imagen Inicio">
      <div className="p-5 w-1/3">
        <h1 className="text-4xl font-bold">¡Bienvenido!</h1>
        <div className="my-5 text-xl">
          <p>
            Aqui podrás conocer y aprovechar todas las oportunidades que te
            brinda la universidad para tu desarrollo estudiantil a lo largo de
            tu carrera.
          </p>
          <br />
          <p>¡Atrévete a ser parte y descubrir tus múltiples talentos!</p>
        </div>
        <InteractiveSectionPrimaryForm
          textButton={"Ingresar"}
          actionButton={goInicio}
          textLeft={"¿No tienes una cuenta?"}
          textLink={"Registrate"}
          actionLink={goRegister}
          existLink={false}
          typeButton={"button"}
        />
      </div>
    </InfoImage>
  );
};

export default HomePage;
