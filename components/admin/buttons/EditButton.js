import { MdEdit } from 'react-icons/md';

const EditButton = ({ action, dataObj }) => {
  return (
    <>
      <MdEdit
        size={20}
        style={{ color: '#3C83C1', cursor: 'pointer' }}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Tooltip on top"
        onClick={() => action(dataObj)}
      />
    </>
  );
};

export default EditButton;
