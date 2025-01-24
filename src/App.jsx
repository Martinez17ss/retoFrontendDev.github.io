import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "./img/sendIcon.png";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const recaptchaRef = React.createRef();

  const handleCaptchaVerify = (value) => {
    if (value) {
      setCaptchaVerified(true);
      setShowCaptcha(false);
      setErrorMessage("");
    } else {
      setCaptchaVerified(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!captchaVerified) {
      alert("Please complete the CAPTCHA verification.");
      return;
    }

    alert("Thank you for joining our newsletter!"); 
    setCaptchaVerified(false);
    setEmail(""); 
  };

  return (
    <>
      <section className="form">
        <div>
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="Logo"
              className="h-12"
              style={{ marginBottom: "20px" }}
            />
          </div>
          <h2
            className="text-xl font-bold text-gray-900 mb-6"
            style={{ marginBottom: "66px" }}
          >
            SUBSCRIBE
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4" style={{ marginBottom: "66px" }}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full p-3 text-sm text-gray-900 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <button
              type="button"
              onClick={() => setShowCaptcha(true)}
              className="w-full py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition mb-4"
            >
              Verify CAPTCHA
            </button>
            <button
              type="submit"
              className="w-full py-3 bg-lime-500 text-black font-bold rounded-full hover:bg-lime-600 transition"
              style={{ marginBottom: "66px" }}
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      {/* CAPTCHA Modal */}
      {showCaptcha && (
        <div className="captcha-modal">
          <div className="captcha-content">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleCaptchaVerify}
            />
            <button
              onClick={() => setShowCaptcha(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <p className="footer">
        © 2025 Subscribe Form. All Rights Reserved. Design by EquipoDotGuru.
      </p>
    </>
  );
}

export default App;
