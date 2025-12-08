import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SendIcon = ({ width = 23, height = 18 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 23 18" fill="none">
      <Path
        d="M13.3407 0.145535C14.0101 -0.258795 14.8634 0.227681 14.8573 1.00979L14.8251 5.21682H22.3182V12.2168H14.7704L14.7411 16.0352C14.7349 16.7984 13.9104 17.2737 13.2469 16.8965L0.505737 9.64553C-0.157909 9.2679 -0.171067 8.31606 0.4823 7.92093L13.3407 0.145535Z"
        fill="#FF0000"
      />
    </Svg>
  );
};

export default SendIcon;
