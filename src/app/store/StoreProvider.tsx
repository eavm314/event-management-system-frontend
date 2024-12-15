"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAllowedPages } from "../services/basicDataService";
import { PageInfo } from "../models/pageInfoModel";
import { usePathname, useRouter } from "next/navigation";

const StoreContext = createContext({});

interface Props {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  const [widthScreen, setWidthScreen] = useState<number>(0);
  const [heightScreen, setHeightScreen] = useState<number>(0);

  const [allowedPages, setAllowedPages] = useState<PageInfo[]>([]);
  const [auth, setAuth] = useState<boolean>(false);
  const [allowed, setAllowed] = useState<boolean>(false);

  const router = useRouter();
  const path = usePathname();

  const handleResize = () => {
    if (typeof window !== "undefined") {
      setWidthScreen(window.innerWidth);
      setHeightScreen(window.innerHeight);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
  }, [
    typeof window !== "undefined" ? window.innerWidth : widthScreen,
    typeof window !== "undefined" ? window.innerHeight : heightScreen,
  ]);

  const getRoutes = async () => {
    const pages = await getAllowedPages();
    setAllowedPages(pages);

    if (!auth && pages.some((p) => p.authRequired)) {
      setAuth(true);
    }
  };

  const checkAllowedPath = () => {
    if (!allowedPages || allowedPages.length === 0) return;

    if (allowedPages.map((p) => p.route).includes(path)) {
      setAllowed(true);
    } else {
      router.replace("/");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidthScreen(window.innerWidth);
      setHeightScreen(window.innerHeight);
    }

    getRoutes();
  }, []);

  useEffect(() => {
    getRoutes();
  }, [auth]);

  useEffect(() => {
    checkAllowedPath();
  }, [allowedPages, path]);

  return (
    <StoreContext.Provider
      value={{
        widthScreen,
        setWidthScreen,
        heightScreen,
        setHeightScreen,
        auth,
        setAuth,
        allowedPages,
        setAllowedPages,
      }}
    >
      {allowed && children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext<any>(StoreContext);
};

export default StoreProvider;
