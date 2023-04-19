import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import { useToaster } from '../headless';
import { Toast } from './Toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  overrideDarkMode?: boolean;
  extraInsets?: {
    top?: number;
    bottom?: number;
    right?: number;
    left?: number;
  };
};

export const Toasts: FunctionComponent<Props> = ({
  overrideDarkMode,
  extraInsets,
}) => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: 'absolute',
        top: insets.top + (extraInsets?.top ?? 0) + 16,
        left: insets.left + (extraInsets?.left ?? 0),
        right: insets.right + (extraInsets?.right ?? 0),
        bottom: insets.bottom + (extraInsets?.bottom ?? 0) + 16,
      }}
      pointerEvents={'box-none'}
    >
      {toasts.map((t) => (
        <Toast
          key={t.id}
          toast={t}
          startPause={startPause}
          endPause={endPause}
          updateHeight={handlers.updateHeight}
          offset={handlers.calculateOffset(t, {
            reverseOrder: true,
          })}
          overrideDarkMode={overrideDarkMode}
        />
      ))}
    </View>
  );
};
