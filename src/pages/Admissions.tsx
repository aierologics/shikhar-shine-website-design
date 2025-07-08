
import { useState } from 'react';
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, FileText, Upload, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Admissions = () => {
  const [formData, setFormData] = useState({
    // Student Information
    studentName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    religion: '',
    caste: '',
    nationality: '',
    motherTongue: '',
    aadharNumber: '',
    
    // Parent Information
    fatherName: '',
    fatherOccupation: '',
    fatherQualification: '',
    fatherPhone: '',
    fatherEmail: '',
    fatherIncome: '',
    
    motherName: '',
    motherOccupation: '',
    motherQualification: '',
    motherPhone: '',
    motherEmail: '',
    motherIncome: '',
    
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    guardianEmail: '',
    
    // Address Information
    permanentAddress: '',
    permanentCity: '',
    permanentState: '',
    permanentPincode: '',
    
    currentAddress: '',
    currentCity: '',
    currentState: '',
    currentPincode: '',
    
    // Academic Information
    previousSchool: '',
    previousClass: '',
    previousPercentage: '',
    admissionClass: '',
    transportRequired: '',
    
    // Additional Information
    medicalConditions: '',
    specialRequirements: '',
    extracurricular: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Documents
    birthCertificate: null,
    transferCertificate: null,
    marksheet: null,
    passportPhoto: null,
    aadharCard: null,
    addressProof: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Admission form submitted:', formData);
    alert('Thank you for your application! We will contact you soon.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-school-blue hover:text-school-orange transition-colors mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="container mx-auto px-4 pb-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Admission <span className="text-school-orange">Application</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the Shikhar Shishu Sadan family and give your child the best educational foundation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
            {/* Student Information */}
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-school-blue">
                  <User className="mr-3 h-6 w-6" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="studentName">Full Name *</Label>
                    <Input
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-school-blue"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-school-blue"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="religion">Religion</Label>
                    <Input
                      id="religion"
                      name="religion"
                      value={formData.religion}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="caste">Caste</Label>
                    <Input
                      id="caste"
                      name="caste"
                      value={formData.caste}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherTongue">Mother Tongue</Label>
                    <Input
                      id="motherTongue"
                      name="motherTongue"
                      value={formData.motherTongue}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="aadharNumber">Aadhar Number</Label>
                    <Input
                      id="aadharNumber"
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Father Information */}
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-school-blue">
                  <User className="mr-3 h-6 w-6" />
                  Father's Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="fatherName">Father's Name *</Label>
                    <Input
                      id="fatherName"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fatherOccupation">Occupation</Label>
                    <Input
                      id="fatherOccupation"
                      name="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fatherQualification">Qualification</Label>
                    <Input
                      id="fatherQualification"
                      name="fatherQualification"
                      value={formData.fatherQualification}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fatherPhone">Phone Number *</Label>
                    <Input
                      id="fatherPhone"
                      name="fatherPhone"
                      type="tel"
                      value={formData.fatherPhone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fatherEmail">Email</Label>
                    <Input
                      id="fatherEmail"
                      name="fatherEmail"
                      type="email"
                      value={formData.fatherEmail}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fatherIncome">Monthly Income</Label>
                    <Input
                      id="fatherIncome"
                      name="fatherIncome"
                      type="number"
                      value={formData.fatherIncome}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mother Information */}
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-school-blue">
                  <User className="mr-3 h-6 w-6" />
                  Mother's Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="motherName">Mother's Name *</Label>
                    <Input
                      id="motherName"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherOccupation">Occupation</Label>
                    <Input
                      id="motherOccupation"
                      name="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherQualification">Qualification</Label>
                    <Input
                      id="motherQualification"
                      name="motherQualification"
                      value={formData.motherQualification}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherPhone">Phone Number *</Label>
                    <Input
                      id="motherPhone"
                      name="motherPhone"
                      type="tel"
                      value={formData.motherPhone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherEmail">Email</Label>
                    <Input
                      id="motherEmail"
                      name="motherEmail"
                      type="email"
                      value={formData.motherEmail}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherIncome">Monthly Income</Label>
                    <Input
                      id="motherIncome"
                      name="motherIncome"
                      type="number"
                      value={formData.motherIncome}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-school-blue">
                  <MapPin className="mr-3 h-6 w-6" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Permanent Address</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="permanentAddress">Street Address *</Label>
                      <Textarea
                        id="permanentAddress"
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="permanentCity">City *</Label>
                      <Input
                        id="permanentCity"
                        name="permanentCity"
                        value={formData.permanentCity}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="permanentState">State *</Label>
                      <Input
                        id="permanentState"
                        name="permanentState"
                        value={formData.permanentState}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="permanentPincode">Pincode *</Label>
                      <Input
                        id="permanentPincode"
                        name="permanentPincode"
                        value={formData.permanentPincode}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Address</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <Label htmlFor="currentAddress">Street Address *</Label>
                      <Textarea
                        id="currentAddress"
                        name="currentAddress"
                        value={formData.currentAddress}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentCity">City *</Label>
                      <Input
                        id="currentCity"
                        name="currentCity"
                        value={formData.currentCity}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentState">State *</Label>
                      <Input
                        id="currentState"
                        name="currentState"
                        value={formData.currentState}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentPincode">Pincode *</Label>
                      <Input
                        id="currentPincode"
                        name="currentPincode"
                        value={formData.currentPincode}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-school-blue">
                  <FileText className="mr-3 h-6 w-6" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="previousSchool">Previous School</Label>
                    <Input
                      id="previousSchool"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="previousClass">Previous Class</Label>
                    <Input
                      id="previousClass"
                      name="previousClass"
                      value={formData.previousClass}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="previousPercentage">Previous Percentage (%)</Label>
                    <Input
                      id="previousPercentage"
                      name="previousPercentage"
                      type="number"
                      value={formData.previousPercentage}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="admissionClass">Admission Class *</Label>
                    <select
                      id="admissionClass"
                      name="admissionClass"
                      value={formData.admissionClass}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-school-blue"
                    >
                      <option value="">Select Class</option>
                      <option value="nursery">Nursery</option>
                      <option value="lkg">LKG</option>
                      <option value="ukg">UKG</option>
                      <option value="1">Class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                      <option value="4">Class 4</option>
                      <option value="5">Class 5</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="transportRequired">Transport Required</Label>
                    <select
                      id="transportRequired"
                      name="transportRequired"
                      value={formData.transportRequired}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-school-blue"
                    >
                      <option value="">Select Option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-school-blue">
                  <FileText className="mr-3 h-6 w-6" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="medicalConditions">Medical Conditions (if any)</Label>
                    <Textarea
                      id="medicalConditions"
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialRequirements">Special Requirements</Label>
                    <Textarea
                      id="specialRequirements"
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="extracurricular">Extracurricular Interests</Label>
                    <Textarea
                      id="extracurricular"
                      name="extracurricular"
                      value={formData.extracurricular}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      name="emergencyPhone"
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Upload */}
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-school-blue">
                  <Upload className="mr-3 h-6 w-6" />
                  Document Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="birthCertificate">Birth Certificate *</Label>
                    <Input
                      id="birthCertificate"
                      name="birthCertificate"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="transferCertificate">Transfer Certificate (if applicable)</Label>
                    <Input
                      id="transferCertificate"
                      name="transferCertificate"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="marksheet">Previous Marksheet (if applicable)</Label>
                    <Input
                      id="marksheet"
                      name="marksheet"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="passportPhoto">Passport Size Photo *</Label>
                    <Input
                      id="passportPhoto"
                      name="passportPhoto"
                      type="file"
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="aadharCard">Aadhar Card (Student & Parents)</Label>
                    <Input
                      id="aadharCard"
                      name="aadharCard"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="addressProof">Address Proof</Label>
                    <Input
                      id="addressProof"
                      name="addressProof"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="text-center">
                  <p className="text-gray-600 mb-6">
                    By submitting this form, you agree to our terms and conditions. 
                    All information provided will be kept confidential.
                  </p>
                  <Button 
                    type="submit" 
                    className="bg-school-orange hover:bg-school-orange/90 text-white px-12 py-4 text-lg font-semibold"
                  >
                    Submit Application
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admissions;
