import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';

const PlayIcon = ({ width = 34, height = 24 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 34 24" fill="none">
      <Path
        d="M28.999 0C31.7604 0 33.999 2.23858 33.999 5V19C33.999 21.7614 31.7604 24 28.999 24H5C2.23858 24 0 21.7614 0 19V5C0 2.23858 2.23858 1.64861e-07 5 0H28.999ZM13.0156 17.874L23.375 12L13.0156 6.12598V17.874Z"
        fill={Colors.error}
      />
    </Svg>
  );
};

export default PlayIcon;
