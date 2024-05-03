import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { SelectMethodComponent } from "./selectMethod";
import { Send } from "../requests";
import { useRequestContext } from "../contexts/requests";

export function MainComponent(): JSX.Element {
  const send = new Send();

  const urlRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [statusCode, setStatus] = useState<string>("");
  const [bodyLength, setLength] = useState<number>(0);
  const [valid, setValid] = useState<boolean>(false);
  const [statusColor, setStatusColor] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const { currentRequest, setCurrentRequest, requests, setRequests } = useRequestContext();

  const changeMethod = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const colors = {
      get: "text-green-600",
      post: "text-yellow-600",
      put: "text-orange-500",
      patch: "text-orange-700",
      delete: "text-red-600"
    };

    const updatedRequest = {
      ...currentRequest,
      method: value,
      color: `${colors[value]} bg-transparent focus:ring-0`
    };
    localStorage.setItem("currentRequest", JSON.stringify(updatedRequest));
    setCurrentRequest(updatedRequest);

    const allRequest = requests;

    for (let i = 0; i < allRequest.length; i++) {
      if (allRequest[i].id == updatedRequest.id) {
        allRequest[i] = { ...updatedRequest };
        break;
      }
    }
    localStorage.setItem("requests", JSON.stringify(allRequest));
    setRequests(allRequest);
  };

  const changeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const updatedRequest = { ...currentRequest, url: value };

    setCurrentRequest(updatedRequest);

    localStorage.setItem("currentRequest", JSON.stringify(updatedRequest));

    setCurrentRequest(updatedRequest);

    const allRequest = requests;

    for (let i = 0; i < allRequest.length; i++) {
      if (allRequest[i].id == updatedRequest.id) {
        allRequest[i] = { ...updatedRequest };
        break;
      }
    }

    localStorage.setItem("requests", JSON.stringify(allRequest));

    setRequests(allRequest);
  };

  const doRequest = async (event: FormEvent) => {
    event.preventDefault();
    const url = urlRef.current != null ? urlRef.current.value : "";
    const body = bodyRef.current != null ? bodyRef.current.value : "";
    const method = currentRequest.method;

    let result: any;
    setIsLoading(true);
    try {
      if (method == "get" || method == "delete") {
        result = await send[method](url);
      } else {
        if (valid) {
          result = await send[method](url, JSON.parse(body));
        }
      }
      const { data } = result;
      const { status } = result;
      changeColor(`${status}`);
      setStatus(`${status}`);
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      const message =
        (error as any).response?.data != undefined
          ? JSON.stringify((error as any).response.data, null, 2)
          : (error as any).message;

      if (message == "Network Error") {
        setResponse("URL INVÁLIDA");
        setStatus("400");
        changeColor(`400`);
        return;
      }
      const { status } = (error as any).response;
      setStatus(status);
      changeColor(`${status}`);
      setResponse(message);
    } finally {
      setIsLoading(false);
    }
  };

  const changeColor = (status: string) => {
    if (status[0] == "2" || status[0] == "3") {
      setStatusColor("text-green-700");
    } else if (status[0] == "4") {
      setStatusColor("text-orange-700");
    } else {
      setStatusColor("text-red-700");
    }
  };
  const verifyJson = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let jsonString = event.target.value;
    const { selectionStart } = event.target;

    if (bodyLength < jsonString.length) {
      if (jsonString[selectionStart - 1] == "{") {
        jsonString = jsonString.slice(0, selectionStart) + "}" + jsonString.slice(selectionStart);
      } else if (jsonString[selectionStart - 1] == `"`) {
        jsonString = jsonString.slice(0, selectionStart) + `"` + jsonString.slice(selectionStart);
      }
    }
    setLength(jsonString.length);
    try {
      const data = JSON.parse(jsonString);
      setValid(true);
      jsonString = JSON.stringify(data, null, 2);
      setValid(true);
    } catch (error) {
      setValid(false);
    } finally {
      event.target.setSelectionRange(selectionStart, selectionStart);

      setCursorPosition(selectionStart);
      const updatedRequest = {
        ...currentRequest,
        body: jsonString
      };

      localStorage.setItem("currentRequest", JSON.stringify(updatedRequest));
      setCurrentRequest(updatedRequest);

      const allRequest = requests;

      for (let i = 0; i < allRequest.length; i++) {
        if (allRequest[i].id == updatedRequest.id) {
          allRequest[i] = { ...updatedRequest };
          break;
        }
      }
      localStorage.setItem("requests", JSON.stringify(allRequest));
      setRequests(allRequest);
    }
  };

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.focus();
      bodyRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [currentRequest.body, cursorPosition]);

  useEffect(() => {
    const allRequests = localStorage.getItem("requests");
    setRequests(allRequests ? JSON.parse(allRequests) : []);

    const lastRequest = localStorage.getItem("currentRequest");
    setCurrentRequest(
      lastRequest
        ? JSON.parse(lastRequest)
        : {
            id: "0",
            url: "",
            method: "get",
            color: "text-green-600 bg-transparent focus:ring-0"
          }
    );
  }, []);

  return (
    <main className="border flex flex-wrap border-white/10 w-4/5 gap-2 p-2">
      <form
        className="w-full border h-small border-white/10 flex items-center gap-3"
        onSubmit={doRequest}
      >
        <SelectMethodComponent
          value={currentRequest.method}
          onChange={changeMethod}
          className={currentRequest.color}
        />
        <input
          type="text"
          className="bg-transparent focus:ring-0 flex-1 outline-none border-0 p-0 text-sm select-text"
          placeholder="https://"
          ref={urlRef}
          onChange={changeUrl}
          value={currentRequest.url}
          spellCheck={false}
          required
        />
        <input type="submit" className="border border-white/10 p-1" value="SEND" />
      </form>
      <div className="flex h-big w-full">
        <div className="w-1/2 h-full flex items-center justify-center">
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            ref={bodyRef}
            value={currentRequest.body}
            spellCheck={false}
            style={{ color: valid ? "white" : "#ff3838" }}
            onChange={verifyJson}
            className="w-full h-almost border border-white/20 select-text rounded-lg bg-transparent focus:ring-0 flex-1 outline-none p-1 text-sm"
          ></textarea>
        </div>
        <div
          className="w-1/2 m-2 h-full flex items-center justify-center flex-col"
          style={{ overflow: "auto" }}
        >
          {isLoading ? (
            <TailSpin color="#ff0000" height={80} width={80} />
          ) : (
            <>
              <p className={statusColor}>{statusCode}</p>
              <pre className="flex flex-wrap break-words h-full max-w-full">{response}</pre>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
