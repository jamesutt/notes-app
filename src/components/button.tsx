import React from 'react';
import {Pressable, Text} from 'react-native';
import {cn} from '../utils/misc';

type ButtonProps = {
  text?: React.ReactNode;
  onPress?: () => void;
  className?: string;
};

export const Button = (props: ButtonProps) => {
  const {onPress, text, className} = props;

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'rounded-lg bg-teal-600 px-5 py-3 shadow-sm active:bg-teal-500',
        className,
      )}>
      <Text className="text-xl text-white font-semibold">{text}</Text>
    </Pressable>
  );
};
