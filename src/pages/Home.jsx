// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home() {
  // const username = useSelector((state) => state.user.username);

  return (
    <>
      <section className="heading">
        <h1>你需要什麼幫助呢？</h1>
        <p>請在以下選項選出想詢問的問題</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Ticket
      </Link>

      <Link to="/tickets" className="btn  btn-block">
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  );
}

export default Home;
