export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Hair" | "Skin" | "Nails";
  isNew: boolean;
  isOnSpecial: boolean;
  isOnPromotion: boolean;
  imageUrl: string;
};
