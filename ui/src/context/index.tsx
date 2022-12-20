import { getProfileApiCall } from "@api/apis";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

export interface GlobalContextUserType {
  loggedIn: boolean;
  role?: "ADMIN" | "USER";
  username?: string;
  firstName?: string;
  lastName?: string;
}
export interface GlobalContextType {
  currentUser: GlobalContextUserType;
  setCurrentUser: Dispatch<SetStateAction<GlobalContextUserType>>;
  updateUserInfo: () => Promise<void>;
}

const globalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const useGlobalContext = () => {
  return useContext(globalContext);
};

const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<
    GlobalContextType["currentUser"]
  >({ loggedIn: false });

  const updateUserInfo = async () => {
    try {
      const {
        user: { firstName, lastName, role, username },
      } = await getProfileApiCall();
      setCurrentUser({ loggedIn: true, firstName, lastName, role, username });
    } catch (error) {
      setCurrentUser({ loggedIn: false });
    }
    setInitialLoading(false);
  };
  useLayoutEffect(() => {
    updateUserInfo();
  }, []);

  return (
    <globalContext.Provider
      value={{ currentUser, setCurrentUser, updateUserInfo }}
    >
      {!initialLoading && children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
