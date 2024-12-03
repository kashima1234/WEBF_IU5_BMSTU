// import {Button, Col, Container, Form, Input, Row} from "reactstrap";
// import {T_Place} from "src/modules/types.ts";
// import PlaceCard from "components/PlaceCard";
// import {PlaceMocks} from "src/modules/mocks.ts";
// import {FormEvent, useEffect} from "react";
// import * as React from "react";

// type Props = {
//     places: T_Place[],
//     setPlaces: React.Dispatch<React.SetStateAction<T_Place[]>>
//     isMock: boolean,
//     setIsMock: React.Dispatch<React.SetStateAction<boolean>>
//     placeName: string,
//     setPlaceName: React.Dispatch<React.SetStateAction<string>>
// }

// const PlacesListPage = ({places, setPlaces, isMock, setIsMock, placeName, setPlaceName}:Props) => {

//     const fetchData = async () => {
//         try {
//             const response = await fetch(`/api/places/?place_name=${placeName.toLowerCase()}`)
//             const data = await response.json()
//             setPlaces(data.places)
//             setIsMock(false)
//         } catch {
//             createMocks()
//         }
//     }

//     const createMocks = () => {
//         setIsMock(true)
//         setPlaces(PlaceMocks.filter(place => place.name.toLowerCase().includes(placeName.toLowerCase())))
//     }

//     const handleSubmit = async (e:FormEvent) => {
//         e.preventDefault()
//         if (isMock) {
//             createMocks()
//         } else {
//             await fetchData()
//         }
//     }

//     useEffect(() => {
//         fetchData()
//     }, []);

//     return (
//         <Container>
//             <Row className="mb-5">
//                 <Col md="6">
//                     <Form onSubmit={handleSubmit}>
//                         <Row>
//                             <Col md="8">
//                                 <Input value={placeName} onChange={(e) => setPlaceName(e.target.value)} placeholder="Поиск..."></Input>
//                             </Col>
//                             <Col>
//                                 <Button color="primary" className="w-100 search-btn">Поиск</Button>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </Col>
//             </Row>
//             <Row>
//                 {places?.map(place => (
//                     <Col key={place.id} xs="4">
//                         <PlaceCard place={place} isMock={isMock} />
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// };

// export default PlacesListPage




// src/pages/PlacesListPage.tsx

import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import { T_Place } from "src/modules/types.ts";
import PlaceCard from "components/PlaceCard";
import { useEffect } from "react";
import * as React from "react";
import { useSearch } from "src/context/SearchContext"; 

const PlacesListPage = () => {
  const {
    placeName,
    setPlaceName,
    places,
    setPlaces,
    isMock,
    setIsMock,
    fetchData,
    createMocks,
  } = useSearch(); // Use the context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isMock) {
      createMocks();
    } else {
      await fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [placeName]); // Refetch data when placeName changes

  return (
    <Container>
      <Row className="mb-5">
        <Col md="6">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="8">
                <Input
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)} // Update context state
                  placeholder="Поиск..."
                />
              </Col>
              <Col>
                <Button color="primary" className="w-100 search-btn">
                  Поиск
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        {places?.map((place) => (
          <Col key={place.id} xs="4">
            <PlaceCard place={place} isMock={isMock} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PlacesListPage;




// // استيراد المكتبات والملفات اللازمة
// import { Button, Col, Container, Form, Input, Row } from "reactstrap"; // استيراد المكونات من مكتبة Reactstrap
// import { T_Place } from "src/modules/types.ts"; // استيراد النوع T_Place الذي يمثل المكان
// import PlaceCard from "components/PlaceCard"; // استيراد مكون PlaceCard لعرض تفاصيل المكان
// import { useEffect } from "react"; // استيراد useEffect للتنفيذ الجانبي (side effects)
// import * as React from "react"; // استيراد React بشكل كامل
// import { useSearch } from "src/context/SearchContext"; // استيراد hook مخصص لاستخدام السياق (Context)

// const PlacesListPage = () => {
//     // استخدام hook المخصص لاسترجاع البيانات من السياق
//     const {
//         placeName, // اسم المكان الذي يتم البحث عنه
//         setPlaceName, // دالة لتحديث اسم المكان في السياق
//         places, // قائمة الأماكن المسترجعة
//         setPlaces, // دالة لتحديث قائمة الأماكن
//         isMock, // حالة البيانات الوهمية
//         setIsMock, // دالة لتحديث حالة البيانات الوهمية
//         fetchData, // دالة لاسترجاع البيانات من الخادم
//         createMocks, // دالة لإنشاء البيانات الوهمية
//     } = useSearch(); // استخدام السياق لاسترجاع البيانات

//     // دالة لمعالجة إرسال النموذج (Form)
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault(); // منع التصرف الافتراضي عند إرسال النموذج
//         if (isMock) { // إذا كانت البيانات وهمية
//             createMocks(); // استخدم البيانات الوهمية
//         } else {
//             await fetchData(); // استرجاع البيانات من الخادم
//         }
//     };

//     // استخدام useEffect لاسترجاع البيانات عند تغيير placeName
//     useEffect(() => {
//         fetchData(); // استرجاع البيانات عند تغيير placeName
//     }, [placeName]); // يعتمد التنفيذ على متغير placeName

//     return (
//         <Container> {/* حاوية رئيسية لاحتواء العناصر */}
//             <Row className="mb-5"> {/* صف لاحتواء النموذج */}
//                 <Col md="6"> {/* عمود بعرض 6 على 12 للأجهزة المتوسطة */}
//                     <Form onSubmit={handleSubmit}> {/* النموذج مع معالج الحدث onSubmit */}
//                         <Row> {/* صف يحتوي على المدخلات وزر البحث */}
//                             <Col md="8"> {/* عمود بعرض 8 على 12 */}
//                                 <Input
//                                     value={placeName} // القيمة التي تمثل اسم المكان
//                                     onChange={(e) => setPlaceName(e.target.value)} // تحديث الحالة عند تغيير النص
//                                     placeholder="Поиск..." // النص الافتراضي في حقل الإدخال
//                                 />
//                             </Col>
//                             <Col> {/* عمود لزر البحث */}
//                                 <Button color="primary" className="w-100 search-btn"> Поиск </Button>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </Col>
//             </Row>
//             <Row> {/* صف يحتوي على الأماكن التي تم استرجاعها */}
//                 {places?.map((place) => ( // تكرار الأماكن لعرضها
//                     <Col key={place.id} xs="4"> {/* عمود لكل مكان بعرض 4 على 12 للأجهزة الصغيرة */}
//                         <PlaceCard place={place} isMock={isMock} /> {/* عرض تفاصيل المكان باستخدام مكون PlaceCard */}
//                     </Col>
//                 ))}
//             </Row>
//         </Container>
//     );
// };

// export default PlacesListPage; // تصدير المكون لاستخدامه في أماكن أخرى
