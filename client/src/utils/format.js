export const formatDate = (value) =>
  value ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value)) : 'Present';

export const cx = (...classes) => classes.filter(Boolean).join(' ');
