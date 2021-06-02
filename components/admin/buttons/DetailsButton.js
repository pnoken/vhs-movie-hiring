import { BsBullseye } from 'react-icons/bs';

const DetailsButton = ({ action, dataObj }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-sm  text-white"
        onClick={() => action(dataObj)}
        id="rentDetails"
        style={{ background: '#101644', borderRadius: '10px' }}
      >
        <BsBullseye size={20} /> Details
      </button>
    </>
  );
};

export default DetailsButton;
