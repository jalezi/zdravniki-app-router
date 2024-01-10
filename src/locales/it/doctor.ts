export const doctor = {
  type: {
    gp: 'medico di medicina generale',
    gyn: 'ginecologo',
    ped: 'pediatra',
    den: 'dentista',
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
      label: 'ambulatorio per pazienti senza medico di base',
    },
    x: {
      description:
        'Negli ambulatori per una migliore accessibilità, gli assicurati che non hanno un medico personale (medico di base o pediatra) possono scegliere il proprio medico personale (in caso non ci sia un medico disponibile o se il medico personale prescelto è permanentemente assente).',
      title: 'Clinica per una migliore accessibilità',
      label: 'clinica per una migliore accessibilità',
    },
  },
} as const;
