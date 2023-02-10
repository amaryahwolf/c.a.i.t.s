//importing react and the {useQuery}
import React from "react";
import { useQuery } from "@apollo/client";

//importing Qparams from components
import Qparams from "../components/Qparams";

import { queries } from "../utils/queries";

const Home = () => {
  const { data } = useQuery(Qparams);
  const questions = data?.questions || [];

  return (
    <main>
      <div className="PH">
        <div className="PH">
          <Qparams questions={questions} title="Blast Off!" />
        </div>
      </div>
    </main>
  );
};

export default Home;
