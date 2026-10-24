 import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
 import { LIGHT_COLORS } from '@/theme/color';

export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  title, 
  onPress, 
  containerStyle,
  textStyle 
}) => {
  return (
    <TouchableOpacity 
      style={[
        {
          backgroundColor: LIGHT_COLORS.tomato,
          paddingVertical: 16,
          paddingHorizontal: 40,
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center',
        },
        containerStyle
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[
        {
          color: LIGHT_COLORS.white,
          fontSize: 20,
          fontWeight: 'bold',
        },
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
