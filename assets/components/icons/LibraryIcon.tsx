import React from 'react';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const EqualizerIcon = ({ width = 27, height = 25, color = '#000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 27 25" fill="none">
      <Rect
        width="5"
        height="25"
        rx="2.5"
        fill={color || "url(#paint0_linear)"}
      />
      <Rect
        x="8"
        width="5"
        height="25"
        rx="2.5"
        fill={color || "url(#paint1_linear)"}
      />
      <Rect
        x="16"
        width="11"
        height="25"
        rx="3"
        fill={color || "url(#paint2_linear)"}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1="5"
          y1="12.5"
          x2="0"
          y2="12.5"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#1DB954" />
          <Stop offset="1" stopColor="#FF0000" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear"
          x1="13"
          y1="12.5"
          x2="8"
          y2="12.5"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#1DB954" />
          <Stop offset="1" stopColor="#FF0000" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear"
          x1="27"
          y1="12.5"
          x2="16"
          y2="12.5"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#1DB954" />
          <Stop offset="1" stopColor="#FF0000" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default EqualizerIcon;