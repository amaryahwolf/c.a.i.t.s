import { assertValidSchema } from "graphql";
import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className = "headerPH">
        <div className = "containerPH">
            <div>
                <Link className = "TitleNAVPH">
                    <h1 className= "titleHeadPh">
                        GalaQuiz
                    </h1>
                </Link>
                <p className="titleHeadPh">
                    Take your coding skills to the next LEVEL.
                </p>
            </div>
            <div>
                {Auth.loggedIn() ? (
                    <>
                    <Link className ="PH">
                        {Auth.getProfile().data.username}'s profile
                    </Link>
                    <button className= "PH" onClick ={logout}>
                        Logout
                    </button>
                    </>
                ) : (
                    <>
                    <Link className="PH" to="/login">
                        Login
                    </Link>
                    <Link className="PH" to ="/signup">
                        Signup
                    </Link>
                    </>
                )}
            </div>

        </div>
    </header>
  );
};
