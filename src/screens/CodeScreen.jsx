import { useEffect, useState } from "react";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import "./styles/codeScreen.css";

const CodeScreen = (props) => {
  const [pinCode, setPinCode] = useState("");
  const [isValidation, setIsValidation] = useState(false);
  const [validPinCode, setValidPinCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelectorAll(".number").forEach((number) => {
      number.onclick = (event) => {
        const newValue =
          (isValidation ? validPinCode : pinCode) +
          event.currentTarget.innerText;
        isValidation ? setValidPinCode(newValue) : setPinCode(newValue);
      };
    });
  }, [pinCode, isValidation, validPinCode]);

  const deleteLastNumber = () => {
    const newValue = isValidation
      ? validPinCode.slice(0, -1)
      : pinCode.slice(0, -1);
    isValidation ? setValidPinCode(newValue) : setPinCode(newValue);
  };

  const submitPinCode = () => {
    if (props.email && !isValidation) {
      setIsValidation(true);
    } else if (props.email) {
      const body = JSON.stringify({ email: props.email, pin_code: pinCode });
      fetch("http://localhost:5000/auth/create", {
        method: "post",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body,
      })
      .then((resp) => resp.text())
      .then((text) => {
        const data = text.toJson();
        if (data.token) {
          cookie.save("auth", data.token);
          sessionStorage.setItem('auth',true);//TODO context
          navigate('/list');
        }
    })
      
    } else {
      const body = JSON.stringify({ pin_code: pinCode });
      fetch("http://localhost:5000/auth/login", {
        method: "post",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body,
      }).then((resp) => resp.text())
      .then((text) => {
        const data = text.toJson();
        sessionStorage.setItem('auth',data);//TODO context
        navigate('/list');
    })
    }
  };

  const forgottenCode = () => {
    fetch("http://localhost:5000/auth/renew", {
        credentials: "include",
      });
  };

  return (
    <>
      <form
        id="pinCodeForm"
        className="d-flex flex-column align-items-center "
        style={{ margin: "auto", width: "90%" }}
      >
        <div className="pb-3">
          <label htmlFor="email-input" className="form-label text-white ms-1">
            Votre code secret
          </label>
          <input
            type="password"
            className="form-control bg-white"
            id="pin-code-input"
            name="pin_code"
            placeholder="1234"
            readOnly
            value={pinCode}
          />
        </div>
        {isValidation && (
          <div className="pb-3">
            <label htmlFor="email-input" className="form-label text-white ms-1">
              Confirmer le code secret
            </label>
            <input
              type="password"
              className="form-control bg-white"
              id="pin-code-confirm-input"
              name="pin_code_confirm"
              placeholder="1234"
              readOnly
              value={validPinCode}
            />
          </div>
        )}
        <div className="grid-container">
          <div className="grid-item number">1</div>
          <div className="grid-item number">2</div>
          <div className="grid-item number">3</div>
          <div className="grid-item number">4</div>
          <div className="grid-item number">5</div>
          <div className="grid-item number">6</div>
          <div className="grid-item number">7</div>
          <div className="grid-item number">8</div>
          <div className="grid-item number">9</div>
          <div className="grid-item">
            <i
              className="fa-solid fa-arrow-left"
              onClick={deleteLastNumber}
            ></i>
          </div>
          <div className="grid-item number">0</div>
          <div className="grid-item">
            <i className="fa-solid fa-check" onClick={submitPinCode}></i>
          </div>
        </div>
        {!props.email && (
          <div className="forgotten" onClick={forgottenCode}>
            code secret oublié ?
          </div>
        )}
      </form>
    </>
  );
};

export default CodeScreen;
