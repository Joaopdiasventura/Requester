import { DownloadButton } from "./components/downloadButton";
import logo from "./assets/icon.png";

function App() {
  return (
    <div className="w-screen h-screen bg-gradient-to-tr from-red-900 to-black text-zinc-50 font-mono overflow-hidden">
      <div className="flex justify-between m-2 items-center">
        <h1 className="text-4xl">REQUESTER</h1>
        <img src={logo} className="flex justify-end animate-spin w-20" alt="" />
      </div>
      <div className="flex flex-col justify-center items-center h-3/4">
        <h2 className="text-2xl text-center">
          Bem vindo ao Requester, sua nova ferramenta de testes para suas API's
        </h2>
        <br />
        <div className="w-1/2">
        <p>
          No momento é possível testar os métodos "GET, POST, PUT, PATCH e
          DELETE", recebendo não somente os corpo da resposta, mas como também
          seu status, e conta com verificador de corpo que impede de enviar as
          requisições que pedem um corpo sem ter um JSON válido.
        </p>
        <p>
          {" "}
          O projeto terá atualizações e posteriormente um site de download para
          Windows e Linux.
        </p>
        </div>
        <br />
      <DownloadButton />
      </div>
    </div>
  );
}

export default App;
