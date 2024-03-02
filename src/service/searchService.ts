import Http from "./apiService";

interface Params {
  // Define the types of parameters you expect in the request
  // Adjust the types based on your API requirements
  // For example, if the parameter is a string, use string; if it's a number, use number, etc.
  // If there are multiple parameters, add them accordingly
  // For simplicity, I've used `any` here, but you should replace it with the appropriate types
  [key: string]: any;
}

export class SearchService extends Http {

  /**
   * 
   * Search for articles. Returns lists of article IDs.
   * 
   */
  getArticles(params: Params) {
    return this.get(`api/articles`, { params });
  }

  /**
   * 
   * Returns an article with a specific numeric ID
   * 
   */
  getArticleById(dict: string, articleId: string, params: Params) {
    return this.get(`/${dict}/article/${articleId}.json`, { params });
  }
}

export default new SearchService();