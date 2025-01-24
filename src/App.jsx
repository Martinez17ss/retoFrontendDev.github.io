import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import logo from './img/sendIcon.png';
import './App.css'

function App() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const recaptchaRef = React.createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const recaptchaValue = recaptchaRef.current.getValue();

    if (!recaptchaValue) {
      setErrorMessage("Please verify the Captcha.");
    } else {
      try {
        const response = await fetch(
          "https://connect.mailerlite.com/api/subscribers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              Authorization: `Bearer YOUR_API_TOKEN`
            },
            body: JSON.stringify({
              email: email,
              groups: ["117872522076096341"]
            })
          }
        )

        const data = await response.json();
        console.log(data);

        if (data.errors) {
          setErrorMessage(data?.message);
          return;
        }

        setSuccessMessage("Thank you for joining our newsletter!");
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to subscribe. Please try again later.")
      }

    }

  }

  return (
    <>
      {errorMessage && <p className='error'>{errorMessage}</p>}
      {successMessage && <p className='success'>{successMessage}</p>}
      <section class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white w-96 p-6 rounded-lg shadow-lg text-center relative">
          <div class="flex justify-center mb-4">
            <img src={logo} alt="Logo" class="h-12" />
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-6">SUBSCRIBE</h2>
          <form onSubmit={handleSubmit}>
            <div class="relative mb-4">
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                class="w-full p-3 text-sm text-gray-900 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full py-3 bg-lime-500 text-black font-bold rounded-full hover:bg-lime-600 transition"
            >
              SUBSCRIBE
            </button>
          </form>
          <footer class="absolute bottom-2 left-0 w-full text-xs text-gray-500">
            <p>© 2025 Subscribe Form. All Rights Reserved. Design by EquipoDotGuru.</p>
          </footer>
        </div>
      </section>
    </>
  )
}

export default App
