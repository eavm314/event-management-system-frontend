"use client";
import PrincipalModelForm from "@/src/app/components/PrincipalModelForm";
import ModalLoading from "@/src/app/modals/ModalLoading";
import ModalPage from "@/src/app/modals/ModalPage";
import { QuestionForm } from "@/src/app/models/questionModel";
import { login } from "@/src/app/services/authService";
import { useStore } from "@/src/app/store/StoreProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LOGIN_FORM } from "../../../data/loginFormData";
import ModalMessage from "../../../modals/ModalMessage";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  const router = useRouter();
  const store = useStore();

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<boolean>(false);

  const [loginQuestions, setLoginQuestions] = useState<QuestionForm[]>([]);

  const getLoginQuestionsDB = () => {
    setLoginQuestions(LOGIN_FORM);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getLoginQuestionsDB();
  }, []);

  const handleLogin = async (formData: any) => {
    try {
      setLoading(true);
      const { result } = await login(formData);
      setLoading(false);
      if (result) {
        store.setAuth(true);
        router.push("/eventos");
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error);
    }
  };

  const actionLink = () => {
    router.push("/auth/register");
  };

  return (
    <>
      {loading ||
        (error && (
          <ModalPage>
            <>
              {loading && <ModalLoading />}
              {error && (
                <ModalMessage
                  action={() => setError(false)}
                  title={"Error"}
                  message={"Usuario o contraseñas incorrectos!"}
                />
              )}
            </>
          </ModalPage>
        ))}
      <section className="bg-background-one w-full min-h-screen flex justify-center items-center">
        <div className="m-10">
          <PrincipalModelForm
            formTitle={"Login"}
            listOfQuestions={loginQuestions}
            checkButtonText={"Mantener la sesión abierta"}
            buttonText={"Ingresar"}
            actionButton={() => {}}
            textLeft={"¿No tienes una cuenta?"}
            textLink={"Regístrate"}
            actionLink={actionLink}
            existCheckBox={false}
            existLink={true}
            registerPart={register}
            onHandleSumbit={handleSubmit(
              async (data: any) => await handleLogin(data)
            )}
            typeButton={"submit"}
            errorList={[]}
          />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
