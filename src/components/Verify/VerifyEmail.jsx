import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { Button, Icon, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
function VerifyEmail() {
  const email = localStorage.getItem("userEmail");
  const [loading, setLoading] = useState(true);
  const [verify, setVerify] = useState();
  const handleLocalStorage = () => {
    localStorage.removeItem("userEmail");
    localStorage.setItem("checkBox", "user");

  };
  useEffect(() => {
    axios
      .put(`/api/user/verifyEmail?email=${email}`)
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          setLoading(false);
          setVerify(true);
        }
      })
      .catch((err) => {
        if (!err.response.data.status) {
          setLoading(false);
          setVerify(false);
        }
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex w-[80%] min-h-[694px]  m-auto items-center justify-center ">
          <div>
            <Loader active inline="centered" size="massive" />
          </div>
        </div>
      ) : (
        <>
          {verify ? (
            <div className="bg-[#86efac] min-h-[694px] flex items-center justify-center">
              <div className="flex flex-col items-center mx-auto w-[80%]">
                <MdVerifiedUser size={80} />
                <h1 className="text-2xl font-Popins text-bold">
                  Your account is now verified
                </h1>
                <Button
                  secondary
                  icon
                  labelPosition="right"
                  onClick={() => handleLocalStorage()}
                >
                  <Link to="/login" style={{ all: "unset" }}>
                    Login
                  </Link>
                  <Icon name="right arrow" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-[#f87171] min-h-[694px] flex items-center justify-center">
              <div className="flex flex-col items-center mx-auto w-[80%]">
                <IoMdCloseCircle size={80} />
                <h1 className="text-2xl font-Popins text-bold">
                  Sorry!!! An error was established. Please Try again
                </h1>
                <Button
                  secondary
                  icon
                  labelPosition="right"
                  onClick={() => handleLocalStorage()}
                >
                  <Link to="/register" style={{ all: "unset" }}>
                    Register
                  </Link>
                  <Icon name="right arrow" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default VerifyEmail;
