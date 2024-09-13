import React from 'react';

const UnivercityCard = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-11/12 mt-14 mx-auto">
      <h2 className="text-xl font-bold mb-4">{data.name}</h2>
      <div className="mb-2">
        <strong>نام مستعار:</strong> <span>{data.nickname || 'N/A'}</span>
      </div>
      <div className="mb-2">
        <strong>رشته تحصیلی:</strong> <span>{data.major || 'N/A'}</span>
      </div>
      <div className="mb-2">
        <strong dir='rtl'>تاریخ تولد:</strong> <span>{data.BirthDate || 'N/A'}</span>
      </div>
      <div className="mb-2">
        <strong dir='rtl'>تاریخ استخدام:</strong> <span>{data.EmploymentDate || 'N/A'}</span>
      </div>
      {/* <div className="mb-2">
        <strong>تاریخ واقعی پایان:</strong> <span>{data.Real_end_date || 'N/A'}</span>
      </div>
      <div className="mb-2">
        <strong>اعضای خارجی:</strong> <span>{data.External_members || 'N/A'}</span>
      </div>
      <div className="mb-2">
        <strong>صاحب:</strong> <span>{data.Owner || 'N/A'}</span>
      </div>
      <div className="mb-2">
        <strong>بودجه:</strong> <span>{data.Budget || 'N/A'}</span>
      </div> */}
    </div>
  );
};

export default UnivercityCard;
