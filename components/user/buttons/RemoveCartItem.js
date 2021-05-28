const RemoveCartItem = ({ action, dataObj }) => {
  return (
    <>
      <button type="button" onClick={() => action(dataObj)}>
        <img src="assets/images/delete.svg" />
      </button>
    </>
  );
};

export default RemoveCartItem;
