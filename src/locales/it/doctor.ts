export const doctor = {
  type: {
    gp: {
      description: 'Medico di medicina generale',
      title: 'Medico di medicina generale',
      label: 'medicina generale',
    },
    gyn: {
      description: 'Ginecologo',
      title: 'Ginecologo',
      label: 'ginecologo',
    },
    ped: {
      description: 'Pediatra',
      title: 'Pediatra',
      label: 'pediatra',
    },
    den: {
      description: 'Dentista',
      title: 'Dentista',
      label: 'dentista',
    },
  },
  subtype: {
    y: {
      description: 'Assistenza dentale per bambini e giovani',
      title: 'Dentista per bambini e giovani',
      label: 'giovani',
    },
    s: {
      description: 'Ambulatorio per studenti',
      title: 'Dentista per studenti',
      label: 'studenti',
    },
  },
  clinic: {
    f: {
      description: 'Ambulatorio per pazienti senza medico di base',
      title: 'Ambulatorio per pazienti senza medico di base',
      label: 'pazienti senza medico',
    },
    x: {
      description:
        'Negli ambulatori per una migliore accessibilità, gli assicurati che non hanno un medico personale (medico di base o pediatra) possono scegliere il proprio medico personale (in caso non ci sia un medico disponibile o se il medico personale prescelto è permanentemente assente).',
      title: 'Clinica per una migliore accessibilità',
      label: 'accessibilità',
    },
  },
  accepts: {
    y: {
      description: 'Accetta nuovi pazienti',
      title: 'Accetta nuovi pazienti',
      label: 'accetta',
    },
    n: {
      description: 'Non accetta nuovi pazienti',
      title: 'Non accetta nuovi pazienti',
      label: 'non accetta',
    },
  },
  info: {
    changedOn: 'Modificato il',
    orderformText: 'prenotazione',
  },
} as const;
