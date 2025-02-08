import Swal from "sweetalert2";

export const sweetAlertWarning = async (
  text: string,
  confirmButtonText: string,
) => {
  return await Swal.fire({
    title: "Are you sure?",
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
  });
};
