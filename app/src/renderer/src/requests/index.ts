import axios from "axios";

export async function Get(url: string) {
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      try {
        return await axios.get("http://" + url);
      } catch (error) {
        return await axios.get("https://" + url);
      }
    }
    return await axios.get(url);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export async function Post(url: string, body: any) {
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      try {
        return await axios.post("http://" + url, body);
      } catch (error) {
        return await axios.post("https://" + url, body);
      }
    }
    return await axios.post(url, body);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export async function Put(url: string, body: any) {
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      try {
        return await axios.put("http://" + url, body);
      } catch (error) {
        return await axios.put("https://" + url, body);
      }
    }
    return await axios.put(url, body);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export async function Patch(url: string, body: any) {
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      try {
        return await axios.patch("http://" + url, body);
      } catch (error) {
        return await axios.patch("https://" + url, body);
      }
    }
    return await axios.patch(url, body);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export async function Delete(url: string) {
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      try {
        return await axios.delete("http://" + url);
      } catch (error) {
        return await axios.delete("https://" + url);
      }
    }
    return await axios.delete(url);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}
