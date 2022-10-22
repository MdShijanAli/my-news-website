import React from 'react';
import { Link } from 'react-router-dom';

const TearmsAndCondition = () => {
    return (
        <div>
            <h2>Here is our Terms and Condition</h2>
            <p>Go back to Registration: <Link to='/register'>Register</Link></p>
        </div>
    );
};

export default TearmsAndCondition;