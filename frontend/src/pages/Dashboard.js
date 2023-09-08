//import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from '../components/GoalForm';
import Spinner from '../components/Spinner';
import { getGoal, reset } from '../features/goals/goalSlice';
import GoalItem from '../components/GoalItem';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isError, isLoading, isSuccess, message } = useSelector((state) => state.goals);

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate('/login');
    }

    if(isLoading) {
      return <Spinner/>
    }

    dispatch(getGoal());

    return () => dispatch(reset());

  }, [user, isError, dispatch, message, getGoal, reset]);

  return <>
    <section className='heading'>
      <h1>Welcome {user && user.name}</h1>
      <p>Goals Dashboard</p>
    </section>
    <GoalForm />

    <section className='content'>
      {goals.length ===0 ? <h3>There are no goals created</h3> : <div className='goals'>
          {goals.map((goal) => (<GoalItem key={goal._id} goal={goal} />))}
        </div>}
    </section>

  </>
}

export default Dashboard;
