import { Pet } from '@/types/pet';

export const pets: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 'young',
    size: 'large',
    gender: 'female',
    color: 'Golden',
    location: 'San Francisco, CA',
    description: 'Luna is a gentle and loving Golden Retriever who adores children and other pets. She enjoys long walks, playing fetch, and cuddling on the couch. Luna is looking for an active family who can provide her with the exercise and attention she deserves.',
    personality: ['Friendly', 'Gentle', 'Playful', 'Loyal'],
    healthStatus: 'Excellent',
    vaccinated: true,
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    energyLevel: 'medium',
    adoptionFee: 350,
    images: [
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
      'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg',
      'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg'
    ],
    postedDate: '2025-01-10',
    shelterInfo: {
      name: 'Pawsome Rescue',
      phone: '(555) 123-4567',
      email: 'adopt@pawsomerescue.org'
    }
  },
  {
    id: '2',
    name: 'Whiskers',
    type: 'cat',
    breed: 'Maine Coon',
    age: 'adult',
    size: 'large',
    gender: 'male',
    color: 'Gray and White',
    location: 'Los Angeles, CA',
    description: 'Whiskers is a magnificent Maine Coon with a gentle giant personality. He loves to perch by windows watching birds and enjoys interactive play sessions. This handsome fellow would do best in a calm household where he can be the center of attention.',
    personality: ['Calm', 'Affectionate', 'Independent', 'Intelligent'],
    healthStatus: 'Good',
    vaccinated: true,
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: false,
    energyLevel: 'low',
    adoptionFee: 200,
    images: [
      'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
      'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg',
      'https://images.pexels.com/photos/730896/pexels-photo-730896.jpeg'
    ],
    postedDate: '2025-01-08',
    shelterInfo: {
      name: 'City Animal Shelter',
      phone: '(555) 987-6543',
      email: 'info@cityanimalshelter.org'
    }
  },
  {
    id: '3',
    name: 'Charlie',
    type: 'dog',
    breed: 'Beagle Mix',
    age: 'puppy',
    size: 'medium',
    gender: 'male',
    color: 'Brown and White',
    location: 'Austin, TX',
    description: 'Charlie is an adorable Beagle mix puppy who is full of energy and love. He is eager to learn and would benefit from puppy training classes. Charlie loves to explore and sniff everything, making him perfect for an active family who enjoys outdoor adventures.',
    personality: ['Energetic', 'Curious', 'Friendly', 'Smart'],
    healthStatus: 'Excellent',
    vaccinated: false,
    spayedNeutered: false,
    houseTrained: false,
    goodWithKids: true,
    goodWithPets: true,
    energyLevel: 'high',
    adoptionFee: 300,
    images: [
      'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
      'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg',
      'https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg'
    ],
    postedDate: '2025-01-12',
    shelterInfo: {
      name: 'Austin Pet Rescue',
      phone: '(555) 456-7890',
      email: 'hello@austinpetrescue.com'
    }
  },
  {
    id: '4',
    name: 'Bella',
    type: 'cat',
    breed: 'Persian',
    age: 'senior',
    size: 'medium',
    gender: 'female',
    color: 'White',
    location: 'Miami, FL',
    description: 'Bella is a beautiful senior Persian cat who is looking for a quiet retirement home. She enjoys gentle brushing sessions and sunny nap spots. Bella would be perfect for someone who wants a calm, loving companion who appreciates the finer things in life.',
    personality: ['Calm', 'Regal', 'Gentle', 'Affectionate'],
    healthStatus: 'Good with medication',
    vaccinated: true,
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: false,
    goodWithPets: false,
    energyLevel: 'low',
    adoptionFee: 150,
    images: [
      'https://images.pexels.com/photos/156934/pexels-photo-156934.jpeg',
      'https://images.pexels.com/photos/137049/pexels-photo-137049.jpeg',
      'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg'
    ],
    postedDate: '2025-01-05',
    shelterInfo: {
      name: 'Miami Animal Care',
      phone: '(555) 321-0987',
      email: 'care@miamianimals.org'
    }
  },
  {
    id: '5',
    name: 'Rocky',
    type: 'dog',
    breed: 'German Shepherd',
    age: 'adult',
    size: 'large',
    gender: 'male',
    color: 'Black and Tan',
    location: 'Denver, CO',
    description: 'Rocky is a loyal and intelligent German Shepherd looking for an experienced dog owner. He knows basic commands and would excel with continued training. Rocky loves hiking and outdoor activities, making him ideal for an active individual or family.',
    personality: ['Loyal', 'Protective', 'Intelligent', 'Active'],
    healthStatus: 'Excellent',
    vaccinated: true,
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: false,
    energyLevel: 'high',
    adoptionFee: 400,
    images: [
      'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg',
      'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg',
      'https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg'
    ],
    postedDate: '2025-01-07',
    shelterInfo: {
      name: 'Mountain Pet Rescue',
      phone: '(555) 654-3210',
      email: 'info@mountainpetrescue.org'
    }
  },
  {
    id: '6',
    name: 'Mittens',
    type: 'cat',
    breed: 'Domestic Shorthair',
    age: 'young',
    size: 'small',
    gender: 'female',
    color: 'Calico',
    location: 'Portland, OR',
    description: 'Mittens is a playful calico cat with distinctive white paws that earned her the perfect name. She loves interactive toys, climbing cat trees, and following her humans around the house. Mittens would thrive in a home where she can be the only pet and receive lots of attention.',
    personality: ['Playful', 'Social', 'Curious', 'Vocal'],
    healthStatus: 'Excellent',
    vaccinated: true,
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: false,
    energyLevel: 'medium',
    adoptionFee: 175,
    images: [
      'https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg',
      'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg',
      'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg'
    ],
    postedDate: '2025-01-09',
    shelterInfo: {
      name: 'Portland Pet Partners',
      phone: '(555) 789-0123',
      email: 'adopt@portlandpetpartners.org'
    }
  }
];