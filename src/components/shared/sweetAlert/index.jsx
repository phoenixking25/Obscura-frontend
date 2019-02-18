// const SweetAlert = (content, state) => MySwal.fire({
//   title: content,
//   type: state,
// });

const SweetAlert = (content, state) => {
  window.M.toast({ html: content, classes: `toast-${state}` });
};

export default SweetAlert;
