const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '93ee073c82mshbd6697aa8e2f45ap1c943cjsn08db2b9f7a57';
const RAPIDAPI_HOST = 'cars-database-with-image.p.rapidapi.com';
const CHALLAN_API_HOST = 'rto-challan-information-india.p.rapidapi.com';

const fetchRapidApi = async (path) => {
  const url = `https://${RAPIDAPI_HOST}${path}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST
    }
  });

  if (!response.ok) {
    throw new Error(`API responded with status ${response.status}`);
  }
  return response.json();
};

exports.getBrands = async (req, res, next) => {
  try {
    const data = await fetchRapidApi('/api/brands');
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getModels = async (req, res, next) => {
  try {
    // /api/models or /api/models?brand_id=...
    const { brand_id } = req.query;
    const path = brand_id ? `/api/models?brand_id=${brand_id}` : '/api/models';
    const data = await fetchRapidApi(path);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getGenerations = async (req, res, next) => {
  try {
    const { model_id } = req.query;
    const path = model_id ? `/api/generations?model_id=${model_id}` : '/api/generations';
    const data = await fetchRapidApi(path);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getVariations = async (req, res, next) => {
  try {
    const { generation_id } = req.params;
    const data = await fetchRapidApi(`/api/models/generations/variants/${generation_id}`);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getChallan = async (req, res, next) => {
  try {
    const { reg_no } = req.body;
    if (!reg_no) {
      return res.status(400).json({ message: 'reg_no is required' });
    }

    const url = `https://${CHALLAN_API_HOST}/fetch_challan_info`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': CHALLAN_API_HOST
      },
      body: JSON.stringify({ reg_no })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API responded with status ${response.status}: ${text}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
