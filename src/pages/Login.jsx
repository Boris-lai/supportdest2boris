import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError && message === "Invalid credentials") {
      toast.error("輸入訊息有誤 🤔");
    }

    // 重新導向
    if (isSuccess || user) {
      toast.success("登入成功 😊");
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!emailRef.current.value || !passwordRef.current.value) {
      toast("請確認填寫所有欄位喔!", {
        icon: "🤔",
      });
    } else {
      const userData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      dispatch(login(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Login
        </h1>
        <p>Log in account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              ref={emailRef}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              ref={passwordRef}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">登入</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
