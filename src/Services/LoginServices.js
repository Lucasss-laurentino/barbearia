import { http } from "../http";

export async function LoginService(user, barbearia) {
   try {
     const resposta = await http.post(
       "/login/login",
       { user, barbearia },
       { withCredentials: true }
     );
     return { erro: false, resposta };
   } catch (error) {
     return { erro: true, resposta: error };
   }
}
