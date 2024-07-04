import React from 'react';
import { useForm } from 'react-hook-form';
import './MessageModal.scss';

const MessageModal = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Send a Message</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              {...register('message', { required: 'Message is required' })}
              placeholder="Type your message here..."
            />
            {errors.message && <span className="error">{errors.message.message}</span>}
          </div>
          <div className="button-group">
            <button type="submit" className="submit-btn">Send</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageModal;