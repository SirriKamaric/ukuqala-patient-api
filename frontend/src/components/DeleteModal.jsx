import '../styles/modal.css';

export const DeleteModal = ({ isOpen, onClose, onConfirm, patientName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete <strong>{patientName}</strong>?</p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm} style={{ color: 'red' }}>Delete</button>
        </div>
      </div>
    </div>
  );
};