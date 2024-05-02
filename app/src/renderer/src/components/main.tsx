import { SelectMethodComponent } from "./selectMethod";
import { Delete, Get, Patch, Post, Put } from "../requests";
import { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { useRequestContext } from "../contexts/requests";

export function MainComponent(): JSX.Element {
  const urlRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [statusCode, setStatus] = useState<string>("");
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

    console.log(currentRequest);

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

    console.log(currentRequest);

    const allRequest = requests;

    for (let i = 0; i < allRequest.length; i++) {
      if (allRequest[i].id == updatedRequest.id) {
        allRequest[i] = { ...updatedRequest };
        break;
      }
    }

    console.log(allRequest);
    localStorage.setItem("requests", JSON.stringify(allRequest));

    setRequests(allRequest);
  };

  const doRequest = async (event: FormEvent) => {
    event.preventDefault();
    const url = urlRef.current != null ? urlRef.current.value : "";
    const body = bodyRef.current != null ? bodyRef.current.value : "";
    const method = currentRequest.method;
    console.log(method);

    let result: any;
    setIsLoading(true);
    try {
      switch (method) {
        case "get":
          result = await Get(url);
          break;
        case "delete":
          result = await Delete(url);
          break;
        case "post":
          if (!valid) {
            return;
          }
          result = await Post(url, JSON.parse(body));
          break;
        case "put":
          if (!valid) {
            return;
          }
          result = await Put(url, JSON.parse(body));
          break;
        case "patch":
          if (!valid) {
            return;
          }
          result = await Patch(url, JSON.parse(body));
          break;
      }

      console.log(result);
      const { data } = result;
      const { status } = result;
      changeColor(`${status}`);
      setStatus(`${status}`);
      setResponse(JSON.stringify(data, null, 2));
      console.log(response);
    } catch (error) {
      const message =
        (error as any).response?.data != undefined
          ? JSON.stringify((error as any).response.data, null, 2)
          : (error as any).message;

      console.log(message);
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

  let bodyLength = 0;
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
      bodyRef.current.focus(); // Força o foco
      bodyRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [currentRequest.body, cursorPosition]); // Garante que essas ações ocorram após as atualizações relevantes

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
    <main className="border border-white/10 w-4/5 p-2">
      <form className="w-full border border-white/10 flex items-center gap-3" onSubmit={doRequest}>
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
          required
        />
        <input type="submit" className="border border-white/10 p-1" value="SEND" />
      </form>
      <div className="flex">
        <div className="w-1/2 h-full m-2">
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            ref={bodyRef}
            value={currentRequest.body}
            onChange={verifyJson}
            className="w-full h-full border border-white/20 select-text rounded-lg bg-transparent focus:ring-0 flex-1 outline-none p-1 text-sm"
          ></textarea>
        </div>
        <div className="w-1/2 m-2 h-full" style={{ overflow: "auto" }}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Fragment>
              <p className={statusColor}>{statusCode}</p>
              <pre className="flex break-words h-full max-w-full">{response}</pre>
            </Fragment>
          )}
        </div>
      </div>
    </main>
  );
}
