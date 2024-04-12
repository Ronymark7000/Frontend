export const getAllBooking = async () => {
    const response = await axiosInstance.get('/admin/booked-items');
    return response;
  };