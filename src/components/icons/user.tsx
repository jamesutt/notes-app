import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function UserIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M15.5 6.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zM12 13c-3.796 0-6.566 2.524-7.328 5.916-.13.575.337 1.084.926 1.084h12.804c.589 0 1.056-.51.926-1.084C18.566 15.523 15.796 13 12 13z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default UserIcon;
