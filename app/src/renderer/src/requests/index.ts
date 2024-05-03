import axios from "axios";

export class Send {
  async get(url: string) {
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

  async post(url: string, body: any) {
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

  async put(url: string, body: any) {
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

  async patch(url: string, body: any) {
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

  async delete(url: string) {
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
}
