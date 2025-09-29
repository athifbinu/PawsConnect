export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'rabbit' | 'bird';
  breed: string;
  age: 'puppy' | 'young' | 'adult' | 'senior';
  size: 'small' | 'medium' | 'large';
  gender: 'male' | 'female';
  color: string;
  location: string;
  description: string;
  personality: string[];
  healthStatus: string;
  vaccinated: boolean;
  spayedNeutered: boolean;
  houseTrained: boolean;
  goodWithKids: boolean;
  goodWithPets: boolean;
  energyLevel: 'low' | 'medium' | 'high';
  adoptionFee: number;
  images: string[];
  postedDate: string;
  shelterInfo: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface FilterState {
  type: 'all' | 'dog' | 'cat' | 'rabbit' | 'bird';
  age: 'all' | 'puppy' | 'young' | 'adult' | 'senior';
  size: 'all' | 'small' | 'medium' | 'large';
  location: 'all' | string;
}