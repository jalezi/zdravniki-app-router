import { HTMLAttributes } from 'react';

import { IconName } from '@/components/icons';

import { ChipPrimitivesVariantsProps } from './Primitives';

import { ChipPrimitives } from '.';

export interface ChipProps extends ChipPrimitivesVariantsProps {
  icon: IconName;
  text: string;
  iconPosition?: 'start' | 'end';
}

export const Chip = function Chip({
  icon,
  text,
  iconPosition = 'start',
  ...rootChipProps
}: ChipProps) {
  return (
    <ChipPrimitives.Root {...rootChipProps}>
      {iconPosition === 'start' && <ChipPrimitives.Icon iconName={icon} />}
      <ChipPrimitives.Text>{text}</ChipPrimitives.Text>
      {iconPosition === 'end' && <ChipPrimitives.Icon iconName={icon} />}
    </ChipPrimitives.Root>
  );
};

export interface DoubleChipProps extends HTMLAttributes<HTMLSpanElement> {
  icons: [IconName, IconName];
  texts: [string, string];
  colors: [
    ChipPrimitivesVariantsProps['colors'],
    ChipPrimitivesVariantsProps['colors'],
  ];
}

export const DoubleChip = function DoubleChip({
  icons,
  texts,
  colors,
  ...props
}: DoubleChipProps) {
  const [baseTypeText, subtypeText] = texts;
  const [baseTypeIconName, subtypeIconName] = icons;
  const [leftColors, rightColors] = colors;

  return (
    <span className='inline-flex items-center' {...props}>
      <Chip
        text={baseTypeText}
        icon={baseTypeIconName}
        variant='left'
        colors={leftColors}
      />
      <Chip
        text={subtypeText}
        icon={subtypeIconName}
        variant='right'
        colors={rightColors}
        iconPosition='end'
      />
    </span>
  );
};
