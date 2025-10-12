import Swal from 'sweetalert2';

// By leveraging the existing CSS classes from input.css, we can theme SweetAlert
// without writing much new CSS. We just apply the classes to the elements.

const swalMixin = Swal.mixin({
  background: '#1e293b', // var(--color-brand-gray)
  color: '#e2e8f0', // var(--color-brand-text)
  confirmButtonText: 'OK',
  
  customClass: {
    popup: 'p-4 rounded-2xl',
    title: 'text-white text-2xl font-semibold',
    htmlContainer: 'text-brand-text/80',
    confirmButton: 'btn btn-primary', // Your existing button class
    cancelButton: 'btn btn-secondary', // Your existing button class
    actions: 'space-x-4',
  },
  buttonsStyling: false, // This is important to make customClass work
});

export default swalMixin;
