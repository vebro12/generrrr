import React, { useState } from 'react';

const MandateAccessButton = ({ endpoint }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [mandateDetails, setMandateDetails] = useState([]);
  const handleButtonClick = async () => {
    try {
      const response = await fetch(`https://generate-1.onrender.com/generate_mandate`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
  
      // Example handling for single object response
      const details = Array.isArray(data) ? data.map(item => ({
        traderMandateId: item.traderMandateId,
        traderName: item.traderName
      })) : [{
        traderMandateId: data.traderMandateId,
        traderName: data.traderName
      }];
  
      setShowDetails(true);
      setMandateDetails(details);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state or notification here if needed
    }
  };
  
  return (
    <div>
      <button onClick={handleButtonClick}>Generate Mandate Access</button>
      {showDetails && (
        <div>
          <h2>Trader Mandate Details</h2>
          <ul>
            {mandateDetails.map(detail => (
              <li key={detail.traderMandateId}>
                Trader Mandate ID: {detail.traderMandateId}, Trader Name: {detail.traderName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MandateAccessButton;
