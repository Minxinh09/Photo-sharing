function fetchModel(url) {
  const BASE_URL = "https://photo-sharing-backend-l8ki.onrender.com";
  
  let fullUrl = url;
  if (!fullUrl.startsWith("http")) {
    fullUrl = `${BASE_URL}${url}`;
  } else if (fullUrl.includes("localhost:8081")) {
    fullUrl = fullUrl.replace("http://localhost:8081", BASE_URL);
  }

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
