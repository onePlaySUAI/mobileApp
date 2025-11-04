import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface DownloadIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const DownloadIcon: React.FC<DownloadIconProps> = ({
  width = 24,
  height = 24,
  color = '#666666',
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      accessibilityLabel="Download SVG Icon"
    >
      <Path
        d="M12 10V16M9 13L12 16L15 13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DownloadIcon;