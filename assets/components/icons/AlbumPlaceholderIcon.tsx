import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

interface AlbumPlaceholderIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const AlbumPlaceholderIcon: React.FC<AlbumPlaceholderIconProps> = ({
  width = 40,
  height = 40,
  color = '#666666',
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      accessibilityLabel="Album Placeholder SVG Icon"
    >
      <Rect
        x="4"
        y="4"
        width="32"
        height="32"
        rx="4"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M14 14L26 26M26 14L14 26"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default AlbumPlaceholderIcon;