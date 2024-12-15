import { useRouter } from "next/navigation";

import { PageInfo } from "../../models/pageInfoModel";
import { useStore } from "../../store/StoreProvider";
import OptionNavbar from "./OptionNavbar";
import { logout } from "../../services/authService";

const NavBarOptions = () => {
  const store = useStore();
  const router = useRouter();

  const pages = store.allowedPages as PageInfo[];
  const layoutOptions = pages
    .filter(p => p.navbarOrder)
    .sort((a, b) => a.navbarOrder - b.navbarOrder);

  const handleLogout = async () => {
    await logout();
    store.setAuth(false);
    router.push("/");
  }

  const goLogin = () => {
    router.push("/auth/login");
  }

  return (
    <nav className="max-w-[960px] max-h-[18px] flex flex-row justify-around p-[26px]">
      {layoutOptions?.map((item: PageInfo) => (
        <OptionNavbar key={item.pageName} option={item} />
      ))}
      <label onClick={store.auth ? handleLogout : goLogin}
        className="mx-5 cursor-pointer font-bold" >
        {store.auth ? "Log Out" : "Log In"}
      </label>
    </nav>
  );
};

export default NavBarOptions;
