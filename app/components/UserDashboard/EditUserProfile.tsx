import { teammember, user1 } from '@/public/images';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { LuPencilLine } from 'react-icons/lu';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/app/stores/dataStore';
import toast, { Toaster } from 'react-hot-toast';

const EditUserProfile = () => {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { editUserProfile, updateUserImage, fetchUserProfile } = useDataStore();
  const fileInputRef = useRef(null);

  // Define state for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    dateOfBirth: '',
    address: '',
    state: '',
    gender: '',
    membershipStatus: '',
    phoneNumber: '',
    securityQuestions: '',
    answer: '',
    profession: '',
    organization: '',
    organization_category: '',
    organization_role: '',
    country: '',
    city: '',
  });

  interface Country {
    country: string;
  }

  interface State {
    name: string;
    state_code: string;
  }

  interface StateApiResponse {
    data: {
      states: State[];
    };
  }

  interface CityApiResponse {
    data: string[];
  }

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries'
      );
      const data: { data: Country[] } = await response.json();
      console.log('Countries:', data.data);

      const sortedCountries = data.data
        .map((country: Country) => ({
          name: country.country,
        }))
        .sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        );
      setCountries(sortedCountries);
      console.log('Sorted countries:', sortedCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
      toast.error('Failed to load countries');
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchStates = async (countryCode: string) => {
    try {
      const response = await fetch(
        `https://countriesnow.space/api/v0.1/countries/states`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            country: countryCode,
          }),
        }
      );
      const data: StateApiResponse = await response.json();

      // Properly set states from the API response
      if (data.data && Array.isArray(data.data.states)) {
        setStates(
          data.data.states.map((state) => ({
            name: state.name,
            state_code: state.state_code,
          }))
        );
      } else {
        setStates([]);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      toast.error('Failed to load states');
      setStates([]);
    }
  };

  const fetchCities = async (country: string, state: string) => {
    try {
      const response = await fetch(
        `https://countriesnow.space/api/v0.1/countries/state/cities`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            country,
            state,
          }),
        }
      );
      const data: CityApiResponse = await response.json();
      if (Array.isArray(data.data)) {
        setCities(data.data);
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast.error('Failed to load cities');
      setCities([]);
    }
  };

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // First try to get user data from API
        const response = await fetchUserProfile();
        const userData = response.data;
        console.log('User data:', userData);

        if (!userData) {
          // Fallback to localStorage if API fails
          const storedUser = localStorage.getItem('currentUser');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setFormData({
              firstName: parsedUser.first_name || '',
              lastName: parsedUser.last_name || '',
              username: parsedUser.name || '',
              email: parsedUser.email || '',
              dateOfBirth: parsedUser.dob || '',
              address: parsedUser.address || '',
              state: parsedUser.state || '',
              gender: parsedUser.gender || '',
              membershipStatus: parsedUser.membership_status || 'Free',
              phoneNumber: parsedUser.phone_number || '',
              securityQuestions: parsedUser.security_question || '',
              answer: parsedUser.answer || '',
              profession: parsedUser.profession || '',
              organization: parsedUser.organization || '',
              organization_category: parsedUser.organization_category || '',
              organization_role: parsedUser.organization_role || '',
              country: parsedUser.country || '',
              city: parsedUser.city || '',
            });
          }
        } else {
          // Use API data if available
          setFormData({
            firstName: userData.first_name || '',
            lastName: userData.last_name || '',
            username: userData.name || '',
            email: userData.email || '',
            dateOfBirth: userData.dob || '',
            address: userData.address || '',
            state: userData.state || '',
            gender: userData.gender || '',
            membershipStatus: userData.membership_status || 'Free',
            phoneNumber: userData.phone_number || '',
            securityQuestions: userData.security_question || '',
            answer: userData.answer || '',
            profession: userData.profession || '',
            organization: userData.organization || '',
            organization_category: userData.organization_category || '',
            organization_role: userData.organization_role || '',
            country: userData.country || '',
            city: userData.city || '',
          });
        }
      } catch (error) {
        toast.error('Failed to load user data');
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [fetchUserProfile]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Transform formData back to API expected format
      const updatedUser = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        name: formData.username,
        email: formData.email,
        dob: formData.dateOfBirth,
        address: formData.address,
        state: formData.state,
        gender: formData.gender,
        membership_status: formData.membershipStatus,
        phone_number: formData.phoneNumber,
        security_question: formData.securityQuestions,
        answer: formData.answer,
        profession: formData.organization_role,
        organization: formData.organization,
        organization_category: formData.organization_category,
        organization_role: formData.organization_role,
        country: formData.country,
        city: formData.city,
      };

      await editUserProfile(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
      router.push('/dashboard/profile');
    }
  };

  return (
    <>
      <Toaster />
      <div className="md:px-20">
        <div className="relative h-20 w-20 rounded-full">
          <div className={`relative h-20 w-20`}>
            <Image
              src={`https://api.dicebear.com/9.x/identicon/svg?seed=${formData.firstName}`}
              alt="user image"
              className="w-20 h-20 rounded-full object-cover"
              width={80}
              height={80}
              unoptimized
            />
          </div>
        </div>
        <div className="mt-10">
          <p className="text-2xl font-semibold mt-4">Personal Information</p>
          <div className="md:grid grid-cols-2 gap-8 mt-5">
            <div className="flex flex-col space-y-2">
              <label className="form-label">First Name</label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">Username</label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">Phone Number</label>
              <input
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">Gender</label>
              <div className="form-input">
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">Organization Role</label>
              <input
                type="text"
                name="organization_role"
                value={formData.organization_role}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">Organization</label>
              <div className="form-input">
                <select
                  name="organization"
                  id="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none"
                >
                  <option value="">Select Organization</option>
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                  <option value="Non Government/Non Profit Organization">
                    Non Government/Non Profit Organization
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">Organization Category</label>
              <div className="form-input">
                <select
                  name="organization_category"
                  id="organization_category"
                  value={formData.organization_category}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none"
                >
                  <option value="Agriculture">Agriculture</option>
                  <option value="Government">Government</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Environment">Environment</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Urban Planning">
                    Urban Planning (related to Real Estate & Transportation)
                  </option>
                  <option value="Research and Development">
                    Research and Development
                  </option>
                  <option value="Logistics">Logistics</option>
                  <option value="Mining">Mining</option>
                  <option value="Forestry">Forestry</option>
                  <option value="Fisheries">Fisheries</option>
                  <option value="Water Resources">Water Resources</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Waste Management">Waste Management</option>
                  <option value="Energy">Energy</option>
                  <option value="Construction">Construction</option>
                  <option value="Public Services">Public Services</option>
                  <option value="Non-Governmental Organization">
                    Non-Governmental Organization (NGO)
                  </option>
                  <option value="Education">Education</option>
                  <option value="Telecommunication">Telecommunication</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Space">Space</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">Date of Birth</label>
              <input
                min="1900-01-01"
                max="2010-12-31"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={(e) => {
                  handleInputChange(e);
                  setSelectedCountry(e.target.value);
                  fetchStates(e.target.value);
                  // Clear state when country changes
                  setFormData((prev) => ({ ...prev, state: '' }));
                }}
                className="form-input"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={(e) => {
                  handleInputChange(e);
                  if (e.target.value) {
                    fetchCities(formData.country, e.target.value);
                  }
                }}
                className="form-input"
                disabled={!selectedCountry}
              >
                <option value="">Select State</option>
                {Array.isArray(states) &&
                  states.map((state) => (
                    <option key={state.state_code} value={state.name}>
                      {state.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="form-input"
                disabled={!formData.state}
              >
                <option value="">Select City</option>
                {Array.isArray(cities) &&
                  cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-input"
                rows={5}
              ></textarea>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Membership Status</label>
              <input
                type="text"
                name="membershipStatus"
                value={formData.membershipStatus}
                onChange={handleInputChange}
                className="form-input"
                disabled
              />
            </div>
          </div>
        </div>
        <Button
          text={isLoading ? <div className="loader"></div> : 'Save'}
          className={`${
            isLoading ? 'bg-primary/50 mt-10' : 'mt-10'
          } "mt-10 text-white"`}
          onClick={handleSave}
        ></Button>
      </div>
    </>
  );
};

export default EditUserProfile;
