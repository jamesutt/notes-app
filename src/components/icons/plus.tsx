import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function PlusIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 4v8m0 0v8m0-8H4m8 0h8"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default PlusIcon;
