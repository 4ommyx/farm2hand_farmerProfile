import React, { useState } from 'react';
import { Edit3, Save, X, Camera, MapPin, Phone, Mail } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  farmName: string;
  farmDescription: string;
  profileImage: string;
}

interface UserProfileProps {
  onToastShow?: (message: string, type: 'success' | 'error' | 'warning') => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onToastShow }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileData>({
    name: 'John Smith',
    email: 'john.smith@farm2hand.com',
    phone: '+1 (555) 123-4567',
    location: 'Green Valley, California',
    farmName: 'Smith Organic Farm',
    farmDescription: 'A family-owned organic farm specializing in fresh vegetables, herbs, and seasonal fruits. We have been serving our community for over 20 years with sustainable farming practices and the highest quality produce.',
    profileImage: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=400'
  });

  const [originalData, setOriginalData] = useState<UserProfileData>(profileData);

  const handleInputChange = (field: keyof UserProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    try {
      // Simulate API call delay
      setTimeout(() => {
        setIsEditing(false);
        setOriginalData(profileData);
        
        if (onToastShow) {
          onToastShow('Your profile has been updated successfully! 🌱', 'success');
        }
        
        console.log('Saving profile data:', profileData);
      }, 500);
    } catch (error) {
      if (onToastShow) {
        onToastShow('Something went wrong. Please try again.', 'error');
      }
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
    
    if (onToastShow) {
      onToastShow('Profile changes have been cancelled.', 'warning');
    }
  };

  const handleStartEdit = () => {
    setOriginalData(profileData);
    setIsEditing(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Farmer Profile</h2>
          {!isEditing ? (
            <button
              onClick={handleStartEdit}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <Edit3 size={18} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <Save size={18} />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <X size={18} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Image Section */}
          <div className="lg:col-span-1">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-green-200 shadow-lg transition-transform duration-200 hover:scale-105"
                />
                {isEditing && (
                  <button 
                    onClick={() => onToastShow && onToastShow('Photo upload feature coming soon! 📸', 'warning')}
                    className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
                  >
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{profileData.name}</h3>
              <p className="text-green-600 font-medium">{profileData.farmName}</p>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b border-green-200 pb-2">
                  Personal Information
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-800">
                      <span>{profileData.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-800">
                      <Mail size={16} className="text-green-500" />
                      <span>{profileData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-800">
                      <Phone size={16} className="text-green-500" />
                      <span>{profileData.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-800">
                      <MapPin size={16} className="text-green-500" />
                      <span>{profileData.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Farm Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 border-b border-green-200 pb-2">
                  Farm Information
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.farmName}
                      onChange={(e) => handleInputChange('farmName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    />
                  ) : (
                    <div className="text-gray-800 font-medium">{profileData.farmName}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm Description</label>
                  {isEditing ? (
                    <textarea
                      value={profileData.farmDescription}
                      onChange={(e) => handleInputChange('farmDescription', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200"
                    />
                  ) : (
                    <div className="text-gray-700 leading-relaxed">{profileData.farmDescription}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;