import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const SearchIcon = ({
  width = 34,
  height = 34,
  color,
}: {
  width?: number;
  height?: number;
  color?: string | null;
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 34 34" fill="none">
      <Path
        d="M4.33 3.86918C9.91832 -1.46439 18.7727 -1.25842 24.1064 4.32976C28.7092 9.15247 29.1849 16.4071 25.6374 21.7327C25.4668 21.9888 25.534 22.3335 25.7465 22.5561L32.315 29.4383C33.3027 30.4732 33.2638 32.1129 32.2289 33.1006C31.194 34.088 29.5549 34.05 28.5673 33.0152L21.9988 26.133C21.7864 25.9104 21.4445 25.8277 21.1808 25.9862C15.6957 29.2813 8.47157 28.4675 3.86875 23.6448C-1.4646 18.0565 -1.2581 9.20278 4.33 3.86918ZM7.19149 6.86735C3.25921 10.6206 3.11389 16.8508 6.86692 20.7833C10.6202 24.7158 16.851 24.8617 20.7836 21.1086C24.7162 17.3553 24.8615 11.1238 21.1082 7.19125C17.3549 3.25888 11.124 3.11411 7.19149 6.86735Z"
        fill={color || 'url(#paint0_linear)'}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1="4.33022"
          y1="3.86897"
          x2="23.6451"
          y2="24.1063"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF0000" />
          <Stop offset="0.591346" stopColor="#9B5225" />
          <Stop offset="1" stopColor="#1DB954" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SearchIcon;
