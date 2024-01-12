import { HTMLAttributes } from 'react';

import { IconName } from '@/components/icons';

import { ChipRootPrimitiveVariantsProps } from './Primitives';

import { ChipPrimitives } from '.';

export interface ChipProps
  extends HTMLAttributes<HTMLSpanElement>,
    ChipRootPrimitiveVariantsProps {
  icon: IconName;
  text: string;
  iconPosition?: 'start' | 'end';
  iconSize?: ChipRootPrimitiveVariantsProps['size'];
}

export const Chip = function Chip({
  icon,
  text,
  iconPosition = 'start',
  iconSize,
  ...rootChipProps
}: ChipProps) {
  const iconComponent = <ChipPrimitives.Icon iconName={icon} size={iconSize} />;

  return (
    <ChipPrimitives.Root {...rootChipProps}>
      {iconPosition === 'start' ? iconComponent : null}
      <ChipPrimitives.Text>{text}</ChipPrimitives.Text>
      {iconPosition === 'end' ? iconComponent : null}
    </ChipPrimitives.Root>
  );
};

export interface DoubleChipProps extends HTMLAttributes<HTMLSpanElement> {
  icons: [IconName, IconName];
  texts: [string, string];
  colors: [
    ChipRootPrimitiveVariantsProps['colors'],
    ChipRootPrimitiveVariantsProps['colors'],
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
