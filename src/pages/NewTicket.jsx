import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  if (isLoading) {
    return <Spinner />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const ticketData = {
      product: productRef.current.value,
      description: descriptionRef.current.value,
    };
    dispatch(createTicket(ticketData));
  };

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={user.name}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input
            type="text"
            className="form-control"
            value={user.email}
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product"></label>
            <select ref={productRef}>
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea ref={descriptionRef} placeholder="Description"></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
