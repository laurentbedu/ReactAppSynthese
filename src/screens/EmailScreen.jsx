import { useEffect, useState } from "react";
import cookie from "react-cookies";

const EmailScreen = (props) => {
  const [email, setEmail] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const body = JSON.stringify(jsonData);
    fetch("http://localhost:5000/auth", {
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
          props.setAuth(true);
        }
        if (data.email) {
          setEmail(data.email);
        }
        console.log(data);
      });
  };

  const validCreate = (event) => {
    event.preventDefault();
    console.log("valid")
  };

  const cancelCreate = (event) => {
    event.preventDefault();
    console.log("cancel")
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-flex align-items-end justify-content-evenly py-3"
        style={{ margin: "auto", width: "90%" }}
      >
        <div>
          <label htmlFor="email-input" className="form-label text-white ms-1">
            Votre adresse mail
          </label>
          <input
            type="email"
            className="form-control"
            id="email-input"
            name="email"
            placeholder="adresse@mail.com"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-info">
            <i className="fa-solid fa-check text-white"></i>
          </button>
        </div>
      </form>
      {email && (
        <div
          
          className="d-flex align-items-center justify-content-evenly py-3"
          style={{ margin: "auto", width: "90%" }}
        >
          <div>
            <label className="form-label text-white">
              Créér un compte pour {email} ?
            </label>
          </div>
          <div>
            <button className="btn btn-sm btn-success" name="valid" onClick={validCreate}>
              <i className="fa-solid fa-check text-white"></i>
            </button>
            
          </div>
          <div className="ms-1">
            <button className="btn btn-sm btn-danger" name="cancel" onClick={cancelCreate}>
              <i className="fa-solid fa-xmark text-white"></i>
            </button>
            
          </div>
        </div>
      )}
    </>
  );
};

export default EmailScreen;
