import axios from "axios";

class API {
  constructor() {
    this.KEY = "32757716-8b0663aad2250c5619ecf300f";
    this.URL = `https://pixabay.com/api/?key=${this.KEY}`;

    this.options = {
      method: "get",
      url: this.URL,
      params: {
        q: "yellow+flower",
        image_type: "photo",
        category: "animals",
        page: "1",
        per_page: "100",
      },
    };
  }

  fetch = async () => {
    try {
      const response = await axios(this.options);
      const data = await response.data;
      return data.hits;
    } catch (error) {
      console.log(error);
    }
  };

  set query(query) {
    this.options.params.q = String(query);
  }

  set page(pageNum) {
    const number = +pageNum;
    this.options.params.page = isNaN(number) ? "1" : String(number);
  }
}
const api = new API();
export default api;
