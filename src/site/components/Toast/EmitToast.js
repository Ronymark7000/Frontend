import {toast } from "react-toastify";

export const emitSuccessToast = (msg) => {
  toast.success(msg);
};

export const emitErrorToast = (msg) => {
  toast.error(msg);
};

export const emitWarnToast = (msg) => {
  toast.warn(msg);
};

export const emitInfoToast = (msg) => {
  toast.info(msg);
};