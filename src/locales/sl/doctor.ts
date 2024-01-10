export const doctor = {
  type: {
    gp: 'družinski zdravnik',
    gyn: 'ginekolog',
    ped: 'pediater',
    den: 'zobozdravnik',
  },
  subtype: {
    y: {
      description: 'Zobozdravstveno varstvo otrok in mladine',
      title: 'Zobozdravnik za otroke in mladino',
      label: 'mladina',
    },
    s: {
      description: 'Študentska ambulanta',
      title: 'Zobozdravnik za študente',
      label: 'študenti',
    },
  },
  clinic: {
    f: {
      description: 'Ambulanta za neopredeljene',
      title: 'Ambulanta za neopredeljene',
      label: 'neopredeljeni',
    },
    x: {
      description:
        'V ambulantah za boljšo dostopnost si izbranega osebnega zdravnika lahko izberejo zavarovane osebe, ki v dejavnosti splošne ambulante in dispanzerju za otroke in šolarje nimajo izbranega osebnega zdravnika (sploh nimajo veljavne izbire, ali je izbrani osebni zdravnik trajno odsoten).',
      title: 'Ambulanta za boljšo dostopnost',
      label: 'boljša dostopnost',
    },
  },
} as const;
