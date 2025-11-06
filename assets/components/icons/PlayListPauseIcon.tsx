import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface PlayListPauseIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const PlayListPauseIcon: React.FC<PlayListPauseIconProps> = ({
  width = 37,
  height = 37,
  color = Colors.primary,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 37 37" fill="none">
      <Path
        d="M18.5 0C28.7173 0 37 8.28273 37 18.5C37 28.7173 28.7173 37 18.5 37C8.28273 37 0 28.7173 0 18.5C0 8.28273 8.28273 0 18.5 0ZM11 10V27H16V10H11ZM21 27H26V10H21V27Z"
        fill={color}
      />
    </Svg>
  );
};

export default PlayListPauseIcon;
