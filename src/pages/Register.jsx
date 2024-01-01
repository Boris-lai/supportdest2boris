import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError && message === "User already exists") {
      toast.error("Oops! 使用者已經存在惹 😫");
    }

    // 重新導向
    if (isSuccess || user) {
      toast.success("註冊成功 😊");
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value ||
      !confirmPasswordRef.current.value
    ) {
      toast("請確認填寫所有欄位喔!", {
        icon: "🤔",
      });
    } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      toast.error("密碼不相同!");
    } else {
      const userData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              ref={nameRef}
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              placeholder="Confirm your password"
              ref={confirmPasswordRef}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">註冊</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
