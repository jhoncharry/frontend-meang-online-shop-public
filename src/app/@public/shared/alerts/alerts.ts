import Swal from 'sweetalert2';

export const loadingData = (title: string, html: string) => {
  Swal.fire({
    title,
    html,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeAlert = () => {
  Swal.close();
};
