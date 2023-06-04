import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";


export const useRequireAuthentication = async (context: any, cb: any) => {
  const {data: session} = useSession();
  
  
}