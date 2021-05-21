import { BsX } from 'react-icons/bs';

const CloseButton = ({ action }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-sm bg-dark text-white"
        onClick={action}
      >
        <BsX size={20} /> Close
      </button>
    </>
  );
};

export default CloseButton;
