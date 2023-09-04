import React, { useState } from 'react';

const HeartRateCalculator = () => {
  const [age, setAge] = useState('');
  const [lowerLimit, setLowerLimit] = useState(null);
  const [upperLimit, setUpperLimit] = useState(null);

  const calculateLimits = (age) => {
    if (age === '' || isNaN(age)) {
      setLowerLimit(null);
      setUpperLimit(null);
      return;
    }

    const lower = Math.floor((220 - age) * 0.65);
    const upper = Math.floor((220 - age) * 0.85);

    setLowerLimit(lower);
    setUpperLimit(upper);
  };

  const handleAgeChange = (e) => {
    const newAge = e.target.value;
    setAge(newAge);
    calculateLimits(newAge);
  };

  return (
    <div>
      <h1>Heart Rate Calculator</h1>
      <label htmlFor="age">Enter your age: </label>
      <input
        type="number"
        id="age"
        name="age"
        value={age}
        onChange={handleAgeChange}
      />
      <div>
        {lowerLimit !== null && upperLimit !== null ? (
          <>
            <p>Hr Limit: {lowerLimit} - {upperLimit}</p>
          </>
        ) : (
          <p>Loading....</p>
        )}
      </div>
    </div>
  );
};

export default HeartRateCalculator;