import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { cx } from '../../utils/format.js';

const Modal = ({ open, title, children, onClose, panelClassName = '' }) => {
  useEffect(() => {
    if (!open) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className={cx('modal-panel', panelClassName)} onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal" type="button">
            <FiX />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
