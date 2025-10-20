import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const PlusIcon = ({ width = 146, height = 146 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 146 146" fill="none">
      <Path
        d="M77 0C79.7614 1.28851e-07 82 2.23858 82 5V64H141C143.761 64 146 66.2386 146 69V77C146 79.7614 143.761 82 141 82H82V141C82 143.761 79.7614 146 77 146H69C66.2386 146 64 143.761 64 141V82H5C2.23858 82 1.28851e-07 79.7614 0 77V69C1.28851e-07 66.2386 2.23858 64 5 64H64V5C64 2.23858 66.2386 1.28851e-07 69 0H77Z"
        fill="url(#paint0_linear)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1="0"
          y1="73"
          x2="146"
          y2="73"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF0000" />
          <Stop offset="0.423077" stopColor="#89612C" />
          <Stop offset="1" stopColor="#1DB954" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default PlusIcon;