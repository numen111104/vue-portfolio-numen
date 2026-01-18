import Swal from 'sweetalert2';

const swalMixin = Swal.mixin({
  background: '#1e293b', // var(--color-brand-gray)
  color: '#e2e8f0', // var(--color-brand-text)
  confirmButtonText: 'OK',
  
  customClass: {
    popup: 'p-4 rounded-2xl',
    title: 'text-white text-2xl font-semibold',
    htmlContainer: 'text-brand-text/80',
    confirmButton: 'btn btn-primary',
    cancelButton: 'btn btn-secondary',
    actions: 'space-x-4',
  },
  buttonsStyling: false,
});

export default swalMixin;
