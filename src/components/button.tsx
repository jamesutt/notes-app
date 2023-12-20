import React from 'react';
import {Pressable, Text} from 'react-native';
import {cn} from '../utils/misc';

type ButtonProps = {
  text?: React.ReactNode;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
};

export const Button = (props: ButtonProps) => {
  const {onPress, text, className, textClassName} = props;

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        // 'rounded-lg bg-slate-600 px-3.5 py-2.5 shadow-sm active:bg-slate-500',
        'px-2',
        className,
      )}>
      <Text className={cn('text-xl text-sky-500 font-medium', textClassName)}>
        {text}
      </Text>
    </Pressable>
  );
};
