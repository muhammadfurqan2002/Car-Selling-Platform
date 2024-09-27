import {
    FaClipboardList,
    FaTag,
    FaDollarSign,
    FaMoneyBillAlt,
    FaCar,
    FaCheckCircle,
    FaChargingStation,
    FaIndustry,
    FaCarSide,
    FaCalendarAlt,
    FaRoad,
    FaCogs,
    FaGasPump,
    FaTachometerAlt,
    FaWrench,
    FaCircle,
    FaPalette,
  } from 'react-icons/fa';
  
  const iconMap = {
    faClipboardList: <FaClipboardList />,
    FaTag: <FaTag />,
    FaDollarSign: <FaDollarSign />,
    FaMoneyBillAlt: <FaMoneyBillAlt />,
    FaCar: <FaCar />,
    FaCheckCircle: <FaCheckCircle />,
    FaChargingStation: <FaChargingStation />,
    FaIndustry: <FaIndustry />,
    FaCarSide: <FaCarSide />,
    FaCalendarAlt: <FaCalendarAlt />,
    FaRoad: <FaRoad />,
    FaCogs: <FaCogs />,
    FaGasPump: <FaGasPump />,
    FaTachometerAlt: <FaTachometerAlt />,
    FaWrench: <FaWrench />,
    FaCircle: <FaCircle />,
    FaPalette: <FaPalette />,
  };




  import React from 'react'
  
  function IconField({icon}) {
    return (
      <div className='text-blue-500 bg-blue-100 p-1.5 rounded-full'>
        {iconMap[icon]}
      </div>
    )
  }
  
  export default IconField
  