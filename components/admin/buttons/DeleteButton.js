import { BsTrash } from 'react-icons/bs';

// takes two props, action and dataObj
//action ==> the delete action
// dataObj ==> the selected data to be deleted

const DeleteButton = ({ action, dataObj }) => {
  return (
    <>
      <BsTrash
        size={20}
        style={{ color: '#D62728', cursor: 'pointer' }}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Delete Record"
        onClick={() => action(dataObj)}
      />
    </>
  );
};

export default DeleteButton;
