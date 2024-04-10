import axiosInstance from "../../axiosInstance";

export const getAllFromBooklist = async () => {
    await axiosInstance
      .get("/booklist")
      .then((res) => {
        const response = res?.data;
        if (response?.success && response?.response) {
            localStorage.setItem("bookList", JSON.stringify(response.response));
        } else {
            // If there is no value in response.response or if response.success is false
            // Handle the absence of data, for example, by setting an empty array in localStorage
            localStorage.setItem("bookList", JSON.stringify([]));
        }
      })
      .catch(() => null);
  };        

  export const addToBooklist = async (itemCode) => {
    const response = await axiosInstance
      .post("/booklist", itemCode)
      .then((res) => res?.data)
      .catch(() => null);
    if (response?.success) {
        console.log("Success")
      getAllFromBooklist();
    }
    else{
        console.log("Failures")
    }
    return response;
  };
  
  export const deleteItemFromBooklist = async (bookListId) => {
    const response = await axiosInstance
      .delete(`/booklist/${bookListId}`)
      .then((res) => {
        if (res?.data) {
          getAllFromBooklist();
        }
        return res?.data;
      })
      .catch(() => null);
    return response;
  };