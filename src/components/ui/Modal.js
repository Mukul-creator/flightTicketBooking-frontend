function Modal(props) {
  return (
    <div className="modal">
      <h2>Are You Sure?? </h2>
      <button className="btn btn--alt" onClick={props.onClickCancel}>
        cancel
      </button>
      <button className="btn" onClick={props.onClickConfirm}>
        {" "}
        confirm
      </button>
    </div>
  );
}

export default Modal;
