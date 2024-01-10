export const doctor = {
  type: {
    gp: 'general practitioner',
    gyn: 'gynecologist',
    ped: 'pediatrician',
    den: 'dentist',
  },
  subtype: {
    y: {
      description: 'Dental care for children and youth',
      title: 'Dentist for children and youth',
      label: 'youth',
    },
    s: {
      description: 'Student clinic',
      title: 'Dentist for students',
      label: 'students',
    },
  },
  clinic: {
    f: {
      description: 'Infirmary for patients without doctors',
      title: 'Infirmary for patients without doctors',
      label: 'infirmary for patients without doctors',
    },
    x: {
      description:
        'In clinics for better accessibility, insured persons who do not have a personal doctor (GP or Pediatrician) can choose their personal doctor (in case there is no available doctor or if the chosen personal doctor is permanently absent).',
      title: 'Clinic for better accessibility',
      label: 'clinic for better accessibility',
    },
  },
} as const;
