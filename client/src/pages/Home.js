//importing react and the {useQuery}
import React from "react";
import { useQuery } from "@apollo/client";

//importing Qparams from components
import Qparams from "../components/Qparams";

import { queries } from "../utils/queries";

const Home = () => {
  

  return (
    <main>
      <div className="PH">
        <div className="PH">
          Home
        </div>
      </div>
    </main>
  );
};

export default Home;
