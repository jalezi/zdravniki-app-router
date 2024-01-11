export const doctor = {
  type: {
    gp: {
      description: 'General practitioner',
      title: 'General practitioner',
      label: 'general practitioner',
    },
    gyn: {
      description: 'Gynecologist',
      title: 'Gynecologist',
      label: 'gynecologist',
    },
    ped: {
      description: 'Pediatrician',
      title: 'Pediatrician',
      label: 'pediatrician',
    },
    den: {
      description: 'Dentist',
      title: 'Dentist',
      label: 'dentist',
    },
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
      description: 'Infirmary for patients without doctor',
      title: 'Infirmary for patients without doctor',
      label: 'patients without doctor',
    },
    x: {
      description:
        'In clinics for better accessibility, insured persons who do not have a personal doctor (GP or Pediatrician) can choose their personal doctor (in case there is no available doctor or if the chosen personal doctor is permanently absent).',
      title: 'Clinic for better accessibility',
      label: 'better accessibility',
    },
  },
  accepts: {
    y: {
      description: 'Accepts new patients',
      title: 'Accepts new patients',
      label: 'accepting',
    },
    n: {
      description: 'Does not accept new patients',
      title: 'Does not accept new patients',
      label: 'not accepting',
    },
  },
} as const;
