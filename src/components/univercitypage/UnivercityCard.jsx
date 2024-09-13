import React, { useEffect, useState } from 'react';

const UnivercityCard = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: data.name,
    nickname: data.nickname || '',
    major: data.major || '',
    BirthDate: data.BirthDate || '',
    EmploymentDate: data.EmploymentDate || '',
  });
  useEffect(()=>{
    setFormData({name: data.name,
      nickname: data.nickname,
      major: data.major,
      BirthDate: data.BirthDate,
      EmploymentDate: data.EmploymentDate,})
  },[data])

  if (!data) {
    return null;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-11/12 mt-14 mx-auto">
      {isEditing ? (
        <>
          <input
            className="mb-2 p-1 border"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <div className="mb-2">
            <strong>نام مستعار:</strong>
            <input
              className="ml-2 p-1 border"
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <strong>رشته تحصیلی:</strong>
            <input
              className="ml-2 p-1 border"
              type="text"
              name="major"
              value={formData.major}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <strong dir="rtl">تاریخ تولد:</strong>
            <input
              className="ml-2 p-1 border"
              type="text"
              name="BirthDate"
              value={formData.BirthDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <strong dir="rtl">تاریخ استخدام:</strong>
            <input
              className="ml-2 p-1 border"
              type="text"
              name="EmploymentDate"
              value={formData.EmploymentDate}
              onChange={handleInputChange}
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">{formData.name}</h2>
          <div className="mb-2">
            <strong>نام مستعار:</strong> <span>{formData.nickname || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong>رشته تحصیلی:</strong> <span>{formData.major || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong dir="rtl">تاریخ تولد:</strong> <span>{formData.BirthDate || 'N/A'}</span>
          </div>
          <div className="mb-2">
            <strong dir="rtl">تاریخ استخدام:</strong> <span>{formData.EmploymentDate || 'N/A'}</span>
          </div>
        </>
      )}

      <button
        onClick={handleEditClick}
        className="mt-4 bg-primary-light mr-32 text-white p-2 rounded"
      >
        {isEditing ? 'ذخیره' : 'ویرایش'}
      </button>
    </div>
  );
};

export default UnivercityCard;
