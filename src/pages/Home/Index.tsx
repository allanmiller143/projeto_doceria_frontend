import { Button } from "@mui/material";
import { get } from "../../Services/api";

export default function Home() {

  const testApi = async () => {
    const token = localStorage.getItem('access_token'); // ou de onde você estiver guardando
    console.log(token);
    const res = await get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  }


  return <>
  <Button onClick={testApi}>
    testar
  </Button>

  </>;
}
