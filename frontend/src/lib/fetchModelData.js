/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url) {
  // Tự động gắn tiền tố server nếu url truyền vào chỉ có dạng "/user/list"
  const fullUrl = url.startsWith("http") ? url : `http://localhost:8081${url}`;
  return fetch(fullUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Mã trạng thái: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Lỗi khi fetch dữ liệu:", error);
      throw error;
    });
}
export default fetchModel;