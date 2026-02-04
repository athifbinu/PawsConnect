// 🐾 Pet interface
export interface Pet {
  name: ReactNode;
  type: ReactNode;
  adoptionFee: ReactNode;
  id: string;
  pet_name: string;
  pet_category:
    | "dog"
    | "cat"
    | "rabbit"
    | "bird"
    | "Hen"
    | "Goat"
    | "Cow"
    | "Other";
  breed?: string;
  age_type: "puppy" | "young" | "adult" | "senior";
  size?: "small" | "medium" | "large";
  sex: "male" | "female";
  color?: string;
  location: string;
  about?: string;
  personality?: string;
  health_status?: string;
  vaccinated?: boolean;
  spayed_neutered?: boolean;
  house_trained?: boolean;
  good_with_kids?: boolean;
  good_with_pets?: boolean;
  energy_level?: "low" | "medium" | "high";
  care?: string;

  adoption_type: "Free" | "Prize";
  price?: number;

  // 🖼️ Image fields
  main_image: string;
  sub_images?: string[];

  // 🧍 Owner info
  owner_name?: string;
  owner_contact?: string;
  owner_email?: string;

  // 📅 Meta info
  created_at?: string;
  postedDate?: string;

  // 🏠 Shelter info (optional)
  shelterInfo?: {
    name: string;
    phone: string;
    email: string;
  };
}

// 🧩 Filter state for your filtering UI
export interface FilterState {
  type:
    | "all"
    | "dog"
    | "cat"
    | "rabbit"
    | "bird"
    | "Hen"
    | "Goat"
    | "Cow"
    | "Other";
  age: "all" | "puppy" | "young" | "adult" | "senior";
  size: "all" | "small" | "medium" | "large";
  location: "all" | string;
  adoption_type?: "all" | "Free" | "Prize";
}
