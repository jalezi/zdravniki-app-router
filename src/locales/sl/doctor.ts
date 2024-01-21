export const doctor = {
  type: {
    gp: {
      description: 'Splošna ambulanta dejavnosti družinske medicine',
      title: 'Družinski zdravnik',
      label: 'družinski zdravnik',
    },
    gyn: {
      description: 'Ginekološka ambulanta',
      title: 'Ginekolog',
      label: 'ginekolog',
    },
    ped: {
      description: 'Ambulanta za otroke',
      title: 'Pediatra',
      label: 'pediater',
    },
    den: {
      description: 'Zobozdravstvena ambulanta',
      title: 'Zobozdravnik',
      label: 'zobozdravnik',
    },
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
  accepts: {
    y: {
      description: 'Sprejema nove paciente',
      title: 'Sprejema nove paciente',
      label: 'sprejema',
    },
    n: {
      description: 'Ne sprejema novih pacientov',
      title: 'Ne sprejema novih pacientov',
      label: 'ne sprejema',
    },
  },
  info: {
    changedOn: 'Popravek od',
    orderformText: 'naročanje',
  },
} as const;
