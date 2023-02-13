import React from "react";

import { useMutation } from '@apollo/client';
import { ADD_EXPLANATION } from '../utils/mutations';

const Qparams = () => {

  const [addExplanation, { error }] = useMutation(ADD_EXPLANATION)

  // TODO: add JS logic for form handling

  return (
    <div className="PH">
        Qparams
    </div>
  );
};

export default Qparams;
