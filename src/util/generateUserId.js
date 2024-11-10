import CryptoJS from 'crypto-js';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const generateFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const uniqueId = result.visitorId;
  return CryptoJS.SHA256(uniqueId).toString(CryptoJS.enc.Hex);
};


export default generateFingerprint

