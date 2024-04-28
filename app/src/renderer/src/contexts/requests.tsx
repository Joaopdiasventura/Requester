import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";

export interface Request {
  id: string;
  url: string;
  method: string;
  color: string
}

interface RequestContextType {
  currentRequest: Request;
  setCurrentRequest: Dispatch<SetStateAction<Request>>;
  requests: Request[];
  setRequests: Dispatch<SetStateAction<Request[]>>;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const useRequestContext = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error("useRequestContext must be used within a RequestProvider");
  }
  return context;
};

export const RequestProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [currentRequest, setCurrentRequest] = useState<Request>({
    id: "0",
    url: "",
    method: "get",
    color: "text-green-600 bg-transparent focus:ring-0"
  });

  return (
    <RequestContext.Provider value={{ currentRequest, setCurrentRequest, requests, setRequests }}>
      {children}
    </RequestContext.Provider>
  );
};
