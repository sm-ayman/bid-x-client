import React, { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
  const { googleSignIn } = use(AuthContext);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        // create-user-in-db
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data-after-login", data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        {/* heading-section */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-indigo-600 mb-4">
            Register now!
          </h1>
          <p className="text-gray-600">
            Create an account or continue with Google for faster signup.
          </p>
        </div>

        {/* card-section */}
        <div className="card bg-white w-full max-w-sm shadow-2xl rounded-xl">
          <div className="card-body">
            <fieldset className="fieldset space-y-4">
              {/* email-field */}
              <div>
                <label className="label font-medium">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                />
              </div>

              {/* password-field */}
              <div>
                <label className="label font-medium">Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                />
              </div>

              {/* forgot-password-link */}
              <div className="text-right">
                <a className="link link-hover text-sm text-indigo-600">
                  Forgot password?
                </a>
              </div>

              {/* register-button */}
              <button className="btn w-full bg-indigo-600 text-white hover:bg-indigo-700 transition mt-2">
                Register
              </button>

              {/* divider-or */}
              <div className="divider">OR</div>

              {/* google-login-button */}
              <button
                onClick={handleGoogleSignIn}
                className="btn w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                <svg
                  aria-label="Google logo"
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Continue with Google
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
