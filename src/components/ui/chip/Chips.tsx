import { HTMLAttributes } from 'react';

import { IconName } from '@/components/icons';

import { ChipRootPrimitiveVariantsProps } from './Primitives';

import { ChipPrimitives } from '.';

export type ChipIconName = Exclude<IconName, 'Logo'>;

export interface ChipProps
  extends HTMLAttributes<HTMLSpanElement>,
    ChipRootPrimitiveVariantsProps {
  label: string;
  icon?: ChipIconName;
  iconPosition?: 'start' | 'end';
  iconSize?: ChipRootPrimitiveVariantsProps['size'];
}

export const Chip = function Chip({
  icon,
  label,
  iconPosition = 'start',
  iconSize,
  size,
  ...rootChipProps
}: ChipProps) {
  const _iconSize = iconSize ?? size;
  const _size = size ?? iconSize;

  const iconComponent = icon ? (
    <ChipPrimitives.Icon iconName={icon} size={_iconSize} />
  ) : null;

  return (
    <ChipPrimitives.Root size={_size} {...rootChipProps}>
      {iconPosition === 'start' ? iconComponent : null}
      <ChipPrimitives.Text>{label}</ChipPrimitives.Text>
      {iconPosition === 'end' ? iconComponent : null}
    </ChipPrimitives.Root>
  );
};

export interface DoubleChipProps extends HTMLAttributes<HTMLSpanElement> {
  icons: [ChipIconName, ChipIconName];
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
        label={baseTypeText}
        icon={baseTypeIconName}
        variant='left'
        colors={leftColors}
      />
      <Chip
        label={subtypeText}
        icon={subtypeIconName}
        variant='right'
        colors={rightColors}
        iconPosition='end'
      />
    </span>
  );
};
