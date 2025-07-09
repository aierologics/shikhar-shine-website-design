import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StudentInfo from './StudentInfo';
import ParentInfo from './ParentInfo';
import AddressInfo from './AddressInfo';
import AcademicInfo from './AcademicInfo';
import AdditionalInfo from './AdditionalInfo';
import DocumentUpload from './DocumentUpload';
import Preview from './Preview';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

const AdmissionsMultiStep = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    religion: '',
    caste: '',
    nationality: '',
    motherTongue: '',
    aadharNumber: '',
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
    permanentAddress: '',
    permanentCity: '',
    permanentState: '',
    permanentPincode: '',
    currentAddress: '',
    currentCity: '',
    currentState: '',
    currentPincode: '',
    sameAsPermanent: false,
    previousSchool: '',
    previousClass: '',
    previousPercentage: '',
    admissionClass: '',
    transportRequired: '',
    medicalConditions: '',
    specialRequirements: '',
    extracurricular: '',
    emergencyContact: '',
    emergencyPhone: '',
    birthCertificate: null,
    transferCertificate: null,
    marksheet: null,
    passportPhoto: null,
    aadharCard: null,
    addressProof: null,
  });
const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSameAsPermanentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          sameAsPermanent: true,
          currentAddress: prev.permanentAddress,
          currentCity: prev.permanentCity,
          currentState: prev.permanentState,
          currentPincode: prev.permanentPincode,
        };
      } else {
        return {
          ...prev,
          sameAsPermanent: false,
          currentAddress: '',
          currentCity: '',
          currentState: '',
          currentPincode: '',
        };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast.toast({
          title: 'Invalid File Type',
          description: 'Only PDF, JPG, JPEG, and PNG files are allowed.',
          variant: 'destructive',
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.toast({
          title: 'File Too Large',
          description: 'File size must be less than 5MB.',
          variant: 'destructive',
        });
        return;
      }
      setFormData(prev => ({
        ...prev,
        [name]: file,
      }));
    }
  };

  const generateStudentId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const uploadFile = async (file: File | null, path: string) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error } = await supabase.storage
      .from('admissions')
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage.from('admissions').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async () => {
    try {
      let studentId = generateStudentId();

      for (let i = 0; i < 5; i++) {
        const { data } = await supabase
          .from('admissions')
          .select('student_id')
          .eq('student_id', studentId)
          .single();

        if (!data) break;
        studentId = generateStudentId();
      }

      const birthCertificateUrl = await uploadFile(formData.birthCertificate, 'birthCertificates');
      const transferCertificateUrl = await uploadFile(formData.transferCertificate, 'transferCertificates');
      const marksheetUrl = await uploadFile(formData.marksheet, 'marksheets');
      const passportPhotoUrl = await uploadFile(formData.passportPhoto, 'passportPhotos');
      const aadharCardUrl = await uploadFile(formData.aadharCard, 'aadharCards');
      const addressProofUrl = await uploadFile(formData.addressProof, 'addressProofs');

      const { error } = await supabase.from('admissions').insert({
        student_id: studentId,
        student_name: formData.studentName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        blood_group: formData.bloodGroup,
        religion: formData.religion,
        caste: formData.caste,
        nationality: formData.nationality,
        mother_tongue: formData.motherTongue,
        aadhar_number: formData.aadharNumber,
        father_name: formData.fatherName,
        father_occupation: formData.fatherOccupation,
        father_qualification: formData.fatherQualification,
        father_phone: formData.fatherPhone,
        father_email: formData.fatherEmail,
        father_income: formData.fatherIncome ? parseFloat(formData.fatherIncome) : null,
        mother_name: formData.motherName,
        mother_occupation: formData.motherOccupation,
        mother_qualification: formData.motherQualification,
        mother_phone: formData.motherPhone,
        mother_email: formData.motherEmail,
        mother_income: formData.motherIncome ? parseFloat(formData.motherIncome) : null,
        guardian_name: formData.guardianName,
        guardian_relation: formData.guardianRelation,
        guardian_phone: formData.guardianPhone,
        guardian_email: formData.guardianEmail,
        permanent_address: formData.permanentAddress,
        permanent_city: formData.permanentCity,
        permanent_state: formData.permanentState,
        permanent_pincode: formData.permanentPincode,
        current_address: formData.currentAddress,
        current_city: formData.currentCity,
        current_state: formData.currentState,
        current_pincode: formData.currentPincode,
        previous_school: formData.previousSchool,
        previous_class: formData.previousClass,
        previous_percentage: formData.previousPercentage ? parseFloat(formData.previousPercentage) : null,
        admission_class: formData.admissionClass,
        transport_required: formData.transportRequired === 'yes',
        medical_conditions: formData.medicalConditions,
        special_requirements: formData.specialRequirements,
        extracurricular: formData.extracurricular,
        emergency_contact: formData.emergencyContact,
        emergency_phone: formData.emergencyPhone,
        birth_certificate_url: birthCertificateUrl,
        transfer_certificate_url: transferCertificateUrl,
        marksheet_url: marksheetUrl,
        passport_photo_url: passportPhotoUrl,
        aadhar_card_url: aadharCardUrl,
        address_proof_url: addressProofUrl,
      });

      if (error) throw error;

      toast.toast({
        title: 'Application Submitted',
        description: `Your application has been submitted successfully. Your Student ID is ${studentId}`,
      });

      setFormData({
        studentName: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        religion: '',
        caste: '',
        nationality: '',
        motherTongue: '',
        aadharNumber: '',
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
        permanentAddress: '',
        permanentCity: '',
        permanentState: '',
        permanentPincode: '',
        currentAddress: '',
        currentCity: '',
        currentState: '',
        currentPincode: '',
        sameAsPermanent: false, // ✅ This line was missing
        previousSchool: '',
        previousClass: '',
        previousPercentage: '',
        admissionClass: '',
        transportRequired: '',
        medicalConditions: '',
        specialRequirements: '',
        extracurricular: '',
        emergencyContact: '',
        emergencyPhone: '',
        birthCertificate: null,
        transferCertificate: null,
        marksheet: null,
        passportPhoto: null,
        aadharCard: null,
        addressProof: null,
      });

      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting admission form:', error);
      toast.toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 7));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const steps = [
    'Student Info',
    'Parent Info',
    'Address Info',
    'Academic Info',
    'Additional Info',
    'Document Upload',
    'Preview',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-6 md:px-12 pb-24 max-w-5xl bg-white rounded-lg shadow-lg">
          <div className="text-center mb-8 pt-8">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 tracking-wide">
              Admission <span className="text-school-orange">Application</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Join the Shikhar Shishu Sadan family and give your child the best educational foundation
            </p>
          </div>

          {/* Steps Indicator */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-8">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const isCompleted = currentStep > stepNumber;
                return (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                        ${isCompleted ? 'bg-school-orange text-white shadow-md' : isActive ? 'bg-school-orange/90 text-white shadow' : 'bg-gray-300 text-gray-600'}
                      `}
                    >
                      {stepNumber}
                    </div>
                    <div
                      className={`mt-3 text-sm max-w-[100px] text-center
                        ${isActive ? 'text-school-orange font-semibold' : 'text-gray-500'}
                      `}
                    >
                      {step}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-4 md:px-8">
            {currentStep === 1 && (
              <StudentInfo formData={formData} onInputChange={handleInputChange} />
            )}
            {currentStep === 2 && (
              <ParentInfo formData={formData} onInputChange={handleInputChange} />
            )}
            {currentStep === 3 && (
              <AddressInfo formData={formData} onInputChange={handleInputChange} onSameAsPermanentChange={handleSameAsPermanentChange} />
            )}
            {currentStep === 4 && (
              <AcademicInfo formData={formData} onInputChange={handleInputChange} />
            )}
            {currentStep === 5 && (
              <AdditionalInfo formData={formData} onInputChange={handleInputChange} />
            )}
            {currentStep === 6 && (
              <DocumentUpload formData={formData} onFileChange={handleFileChange} />
            )}
            {currentStep === 7 && (
              <Preview formData={formData} />
            )}
          </div>

          <div className="flex justify-between max-w-4xl mx-auto mt-10 px-4 md:px-8">
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep} className="px-8 py-3 text-base">
                Previous
              </Button>
            )}
            {currentStep < 7 && (
              <Button className="bg-school-orange hover:bg-school-orange/90 text-white px-14 py-4 text-lg font-semibold" onClick={nextStep}>
                Next
              </Button>
            )}
            {currentStep === 7 && (
              <Button className="bg-school-orange hover:bg-school-orange/90 text-white px-14 py-4 text-lg font-semibold" onClick={handleSubmit}>
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdmissionsMultiStep;
