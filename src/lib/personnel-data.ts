export interface Personnel {
  id: string
  title: string
  firstName: string
  lastName: string
  jobDescription: string
  location: string
  workEmail: string
  workPhone: string
}

export const personnelData: Personnel[] = [
  {
    id: '1',
    title: 'Mr',
    firstName: 'Matuma',
    lastName: 'Tomas',
    jobDescription: 'General manager',
    location: 'Luanda',
    workEmail: 'matuma.tomas@amutam.ao',
    workPhone: '941100394',
  },
  {
    id: '2',
    title: 'Mr',
    firstName: 'Ariclides',
    lastName: 'Baia',
    jobDescription: 'Procurement',
    location: 'Luanda',
    workEmail: 'ariclides.baia@netag.ao',
    workPhone: '943867690',
  },
  {
    id: '3',
    title: 'Mr',
    firstName: 'Claudio',
    lastName: 'Barros',
    jobDescription: 'Segment Manager',
    location: 'Luanda',
    workEmail: 'claudio.barros@amutam.ao',
    workPhone: '945178539',
  },
  {
    id: '4',
    title: 'Mrs',
    firstName: 'Luisa',
    lastName: 'Chipeua',
    jobDescription: 'Deputy General Manager',
    location: 'Luanda',
    workEmail: 'luisa.chipeua@netag.ao',
    workPhone: '943867692',
  },
  {
    id: '5',
    title: 'Mrs',
    firstName: 'Inacio',
    lastName: 'Sebastiao',
    jobDescription: 'Programmer',
    location: 'Luanda',
    workEmail: 'inacio.sebastiao@netag.ao',
    workPhone: '945178737',
  },
  {
    id: '6',
    title: 'Mr',
    firstName: 'Paulino',
    lastName: 'Domingos',
    jobDescription: 'Technical And Sales Manager',
    location: 'Luanda',
    workEmail: 'client@netag.ao',
    workPhone: '945339991',
  },
]
