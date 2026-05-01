export const getCarImage = (make?: string, model?: string, brandImage?: string) => {
  // If we have a brand logo from the API, use it
  if (brandImage) {
    return brandImage;
  }

  if (!make || !model) {
    return '/toyota-corolla-2023.jpg';
  }

  const key = `${make} ${model}`.toLowerCase();
  
  switch(key) {
    case 'toyota corolla': 
      return '/toyota-corolla-2023.jpg';
    case 'toyota camry': 
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1200px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg';
    case 'tesla model 3': 
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Tesla_Model_3_Performance_AWD_Front.jpg/1200px-2019_Tesla_Model_3_Performance_AWD_Front.jpg';
    case 'ford mustang': 
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/2018_Ford_Mustang_GT_5.0.jpg/1200px-2018_Ford_Mustang_GT_5.0.jpg';
    default: 
      return '/toyota-corolla-2023.jpg';
  }
}
