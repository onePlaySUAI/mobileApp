import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ThreeDotsIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ThreeDotsIcon: React.FC<ThreeDotsIconProps> = ({
  width = 4,
  height = 15,
  color = '#D9D9D9',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 4 15" fill="none">
      <Path
        d="M1.98535 11.0293C3.08175 11.0293 3.97067 11.9182 3.9707 13.0146C3.9707 14.1111 3.08177 15 1.98535 15C0.888904 15 0 14.1111 0 13.0146C3.07947e-05 11.9182 0.888923 11.0293 1.98535 11.0293ZM1.98535 5.29395C3.08173 5.29398 3.97064 6.18292 3.9707 7.2793C3.9707 8.37573 3.08177 9.26462 1.98535 9.26465C0.888904 9.26465 0 8.37574 0 7.2793C6.19747e-05 6.1829 0.888942 5.29395 1.98535 5.29395ZM1.98535 0C3.08177 3.10524e-05 3.9707 0.888923 3.9707 1.98535C3.97067 3.08175 3.08175 3.97067 1.98535 3.9707C0.888923 3.9707 3.10527e-05 3.08177 0 1.98535C0 0.888904 0.888904 0 1.98535 0Z"
        fill={color}
      />
    </Svg>
  );
};

export default ThreeDotsIcon;