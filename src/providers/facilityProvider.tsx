import { createContext, useState } from 'react';

export const facilityContext = createContext({});

export const facilityProvider = (props: any) => {
  const { children } = props;
  const initialState = {
    name: '',
    menu: '',
    price: '',
    menu2: '',
    price2: '',
    menu3: '',
    price3: '',
    menu4: '',
    price4: '',
    menu5: '',
    price5: '',
    address: '',
    phone_number: '',
  };
  const [facility, setFacility] = useState(initialState);

  return (
    <facilityContext.Provider value={{ facility, setFacility }}>
      {children}
    </facilityContext.Provider>
  );
};
