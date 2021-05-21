import { BsBoxArrowInRight } from 'react-icons/bs';

const SubmitButton = ({ action, form }) => {
  return (
    <>
      <button
        type="submit"
        className="btn btn-sm float-end text-white"
        onClick={action}
        form={form}
        style={{ background: '#6475F9', borderRadius: '10px' }}
      >
        <BsBoxArrowInRight size={20} /> Submit
      </button>
    </>
  );
};

export default SubmitButton;
