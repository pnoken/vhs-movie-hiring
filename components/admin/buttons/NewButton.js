import { BsPlusCircleFill } from 'react-icons/bs';

// this button takes action, text, id as props and is render wherever admin is to perform creation
// action ========> The action to be triggered by the click of the button
// text ===========> Text to display in the button
// id =============> Unique ID for each action

const NewButton = ({ action, text, id }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-sm float-end text-white"
        onClick={action}
        id={id}
        style={{ background: '#6475F9', borderRadius: '10px' }}
      >
        <BsPlusCircleFill size={20} /> {text}
      </button>
    </>
  );
};

export default NewButton;
