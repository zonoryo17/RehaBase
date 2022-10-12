export type Facility = {
  id: string;
  name: string;
  menu: string;
  price: string;
  menu2?: string;
  price2?: string;
  menu3?: string;
  price3?: string;
  menu4?: string;
  price4?: string;
  menu5?: string;
  price5?: string;
  explanation?: string;
  address?: string;
  phone_number?: string;
  created_at: Date;
  facilityId?: string | string[];
};

export type FacilityProps = {
  facilityProps: {
    id: string;
    name: string;
    explanation?: string;
    menu: string;
    price: string;
    menu2?: string;
    price2?: string;
    menu3?: string;
    price3?: string;
    menu4?: string;
    price4?: string;
    menu5?: string;
    price5?: string;
    address?: string;
    phone_number?: string;
    created_at: Date;
    facility: {
      id: string;
      name: string;
      explanation?: string;
      menu: string;
      price: string;
      menu2?: string;
      price2?: string;
      menu3?: string;
      price3?: string;
      menu4?: string;
      price4?: string;
      menu5?: string;
      price5?: string;
      address?: string;
      phone_number?: string;
      created_at: Date;
    };
  };
};
