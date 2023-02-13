
import React from "react";


import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_EXPLANATION } from '../utils/mutations';

const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const [removeExplanation, { error }] = useMutation(REMOVE_EXPLANATION);

  const userData = data?.me || {};

  // Function to handle explanation delete
  const handleDeleteExplanation = async (explanationId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeExplanation({
        variables: { explanationId },
      });
   
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="PH">
        Profile
    </div>
  );
};

export default Profile;
