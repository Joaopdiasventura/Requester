import { useRequestContext, Request } from "../contexts/requests";

export function SideBar(): JSX.Element {
  const { setCurrentRequest, requests, setRequests } = useRequestContext();

  const generateId = () => {
    const timestamp: number = new Date().getTime();
    const random: number = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}`;
  };

  const addRequest = () => {
    const newRequest: Request = {
      id: generateId(),
      url: "",
      method: "get",
      color: "text-green-600 bg-transparent focus:ring-0"
    };

    const updatedRequests = [newRequest, ...requests];
    setRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    console.log(localStorage.getItem("requests"));
    localStorage.setItem("currentRequest", JSON.stringify(newRequest));
    setCurrentRequest(newRequest);
  };

  const changeCurrentRequest = async (request: Request) => {
    localStorage.setItem("currentRequest", JSON.stringify(request));
    setCurrentRequest(request);
  };

  const deleteRequest = (id: string) => {
    const newRequests = requests.filter((request) => request.id != id);
    setRequests(newRequests);
    setCurrentRequest({
      id: "0",
      url: "",
      method: "get",
      color: "text-green-600 bg-transparent focus:ring-0"
    });
  };

  return (
    <aside className="p-2 border border-spacing-0 border-white/10 w-1/5">
      <div className="flex flex-row mb-2 justify-between items-center border-b">
        <h3>REQUESTS</h3>
        <button onClick={addRequest}>➕</button>
      </div>
      <div className="flex flex-col gap-1.5">
        {requests.map((request) => (
          <div key={request.id} className="flex justify-between items-center">
            <button
              onClick={() => changeCurrentRequest(request)}
              className={`${request.color} border border-white/10 rounded-lg uppercase px-1`}
            >
              {request.method}
            </button>
            <button
              onClick={() => {
                deleteRequest(request.id);
              }}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
