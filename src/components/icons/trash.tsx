import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function TrashIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M5.876 19.133l.997-.066-.997.066zm12.248 0l-.997-.066.998.066zM3 5a1 1 0 000 2V5zm18 2a1 1 0 100-2v2zm-10 4a1 1 0 10-2 0h2zm-2 5a1 1 0 102 0H9zm6-5a1 1 0 10-2 0h2zm-2 5a1 1 0 102 0h-2zm1.906-9.75a1 1 0 101.936-.5l-1.936.5zM4.002 6.066L4.878 19.2l1.995-.133-.875-13.134-1.996.134zM7.872 22h8.257v-2H7.87v2zm11.25-2.8l.876-13.133-1.996-.134-.875 13.134 1.995.133zM19 5H5v2h14V5zM3 7h2V5H3v2zm16 0h2V5h-2v2zm-2.871 15a3 3 0 002.993-2.8l-1.995-.133a1 1 0 01-.998.933v2zM4.878 19.2A3 3 0 007.87 22v-2a1 1 0 01-.998-.933l-1.995.133zM9 11v5h2v-5H9zm4 0v5h2v-5h-2zm-1-7c1.396 0 2.572.955 2.906 2.25l1.936-.5A5.002 5.002 0 0012 2v2zM9.094 6.25A3.002 3.002 0 0112 4V2a5.002 5.002 0 00-4.842 3.75l1.936.5z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default TrashIcon;
