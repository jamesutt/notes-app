import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {cn} from '../utils/misc';

type ButtonProps = {
  onPress?: () => void;
  className?: string;
  children: React.ReactNode;
};

export const Button = (props: ButtonProps) => {
  const {onPress, className, children} = props;

  return (
    <TouchableOpacity onPress={onPress} className={cn('px-2', className)}>
      {children}
    </TouchableOpacity>
  );
};

type ButtonTextProps = {
  className?: string;
  children: React.ReactNode;
};

export const ButtonText = (props: ButtonTextProps) => {
  const {className, children} = props;

  return (
    <Text className={cn('text-xl text-sky-500 font-medium', className)}>
      {children}
    </Text>
  );
};
