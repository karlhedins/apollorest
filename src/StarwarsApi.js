const { RESTDataSource } = require("apollo-datasource-rest");

class StarwarsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://swapi.co/api/";
  }

  async getStarwarsPerson(id) {
    const result = await this.get(`people/${id}`);
    return result;
  }
}

module.exports = StarwarsApi;
