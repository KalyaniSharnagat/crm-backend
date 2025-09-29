


const generatePaymentId = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return "PMT" + random; // e.g. PMT5678
};