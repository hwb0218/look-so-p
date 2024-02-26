import React from 'react';

const ComponentThatMayError = () => {
  const [shouldThrowError, setShouldThrowError] = React.useState(false);

  if (shouldThrowError) {
    throw new Error('Test error');
  }

  return <button onClick={() => setShouldThrowError(true)}>에러 발생시키기</button>;
};

export default ComponentThatMayError;
