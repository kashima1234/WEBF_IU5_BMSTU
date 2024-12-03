import React, { createContext, useState, ReactNode } from 'react';
import { T_Place } from 'src/modules/types.ts'; 
import { PlaceMocks } from 'src/modules/mocks.ts';

interface SearchContextType {
  placeName: string;
  setPlaceName: React.Dispatch<React.SetStateAction<string>>;
  places: T_Place[];
  setPlaces: React.Dispatch<React.SetStateAction<T_Place[]>>;
  isMock: boolean;
  setIsMock: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => Promise<void>;
  createMocks: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [placeName, setPlaceName] = useState<string>('');
  const [places, setPlaces] = useState<T_Place[]>([]);
  const [isMock, setIsMock] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/places/?place_name=${placeName.toLowerCase()}`);
      const data = await response.json();
      setPlaces(data.places);
      setIsMock(false);
    } catch {
      createMocks();
    }
  };

  const createMocks = () => {
    setIsMock(true);
    setPlaces(PlaceMocks.filter(place => place.name.toLowerCase().includes(placeName.toLowerCase())));
  };

  return (
    <SearchContext.Provider
      value={{
        placeName,
        setPlaceName,
        places,
        setPlaces,
        isMock,
        setIsMock,
        fetchData,
        createMocks,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};



// // استيراد المكتبات المطلوبة من React و TypeScript
// import React, { createContext, useState, ReactNode } from 'react';
// import { T_Place } from 'src/modules/types.ts'; // تأكد من أن هذا هو الاستيراد الصحيح لنوع T_Place
// import { PlaceMocks } from 'src/modules/mocks.ts'; // استخدام البيانات الوهمية (Mocks) إذا لزم الأمر

// // تعريف نوع البيانات التي ستتم مشاركتها عبر السياق (Context)
// interface SearchContextType {
//   placeName: string; // اسم المكان الذي يتم البحث عنه
//   setPlaceName: React.Dispatch<React.SetStateAction<string>>; // دالة لتحديث اسم المكان
//   places: T_Place[]; // قائمة الأماكن المسترجعة
//   setPlaces: React.Dispatch<React.SetStateAction<T_Place[]>>; // دالة لتحديث الأماكن
//   isMock: boolean; // حالة تحديد إذا كانت البيانات وهمية
//   setIsMock: React.Dispatch<React.SetStateAction<boolean>>; // دالة لتحديث حالة البيانات الوهمية
//   fetchData: () => Promise<void>; // دالة لاسترجاع البيانات من الخادم
//   createMocks: () => void; // دالة لإنشاء البيانات الوهمية
// }

// // إنشاء السياق (Context) مع قيمة افتراضية
// const SearchContext = createContext<SearchContextType | undefined>(undefined);

// // مكون مزود السياق (Provider) الذي يلتف حول التطبيق ويوفر الحالة المشتركة
// export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   // استخدام الحالة المحلية لإدارة البيانات
//   const [placeName, setPlaceName] = useState<string>(''); // اسم المكان الذي يتم البحث عنه
//   const [places, setPlaces] = useState<T_Place[]>([]); // الأماكن المسترجعة
//   const [isMock, setIsMock] = useState<boolean>(false); // حالة البيانات الوهمية

//   // دالة لاسترجاع البيانات من الخادم
//   const fetchData = async () => {
//     try {
//       const response = await fetch(`/api/places/?place_name=${placeName.toLowerCase()}`); // إرسال الطلب
//       const data = await response.json(); // تحويل الاستجابة إلى JSON
//       setPlaces(data.places); // تحديث قائمة الأماكن
//       setIsMock(false); // تعيين أن البيانات ليست وهمية
//     } catch {
//       createMocks(); // إذا فشل الطلب، استخدم البيانات الوهمية
//     }
//   };

//   // دالة لإنشاء البيانات الوهمية
//   const createMocks = () => {
//     setIsMock(true); // تعيين أن البيانات وهمية
//     setPlaces(PlaceMocks.filter(place => place.name.toLowerCase().includes(placeName.toLowerCase()))); // تصفية البيانات الوهمية بناءً على اسم المكان
//   };

//   // إعادة القيمة عبر سياق SearchContext بحيث يمكن استهلاكها في أي مكان
//   return (
//     <SearchContext.Provider
//       value={{
//         placeName,
//         setPlaceName,
//         places,
//         setPlaces,
//         isMock,
//         setIsMock,
//         fetchData,
//         createMocks,
//       }}
//     >
//       {children} {/* يتم تمرير العناصر الداخلية للمزود */}
//     </SearchContext.Provider>
//   );
// };

// // دالة لاستهلاك البيانات من السياق (للاستخدام في المكونات الأخرى)
// export const useSearch = (): SearchContextType => {
//   const context = React.useContext(SearchContext); // الحصول على السياق
//   if (!context) {
//     throw new Error('useSearch must be used within a SearchProvider'); // إذا لم يكن السياق موجودًا، ارجع بخطأ
//   }
//   return context; // إرجاع البيانات من السياق
// };
