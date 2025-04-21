import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAssetById } from '../services/api';  // Assuming you have an API function to fetch asset by ID

const AssetDetails = () => {
  const { assetId } = useParams();  // Get assetId from URL
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const data = await getAssetById(assetId);
        setAsset(data);
      } catch (err) {
        setError('Error fetching asset details');
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [assetId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Asset Details</h2>
      {asset ? (
        <div>
          <p>Name: {asset.name}</p>
          <p>Description: {asset.description}</p>
          <img src={asset.qrCode} alt="QR Code" />
        </div>
      ) : (
        <p>Asset not found</p>
      )}
    </div>
  );
};

export default AssetDetails;
