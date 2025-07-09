import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddressInfoProps {
  formData: {
    permanentAddress: string;
    permanentCity: string;
    permanentState: string;
    permanentPincode: string;
    currentAddress: string;
    currentCity: string;
    currentState: string;
    currentPincode: string;
    sameAsPermanent: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSameAsPermanentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry',
];

const AddressInfo: React.FC<AddressInfoProps> = ({ formData, onInputChange, onSameAsPermanentChange }) => {
  return (
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
                onChange={onInputChange}
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
                onChange={onInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="permanentState">State *</Label>
              <Select
                value={formData.permanentState}
                onValueChange={(value) => {
                  const event = {
                    target: { name: 'permanentState', value },
                  } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
                  onInputChange(event);
                }}
              >
                <SelectTrigger className="w-full mt-1" id="permanentState">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="permanentPincode">Pincode *</Label>
              <Input
                id="permanentPincode"
                name="permanentPincode"
                value={formData.permanentPincode}
                onChange={onInputChange}
                required
                className="mt-1"
              />
            </div>
          </div>
        </div>
        <div className="mb-4 flex items-center space-x-3">
          <input
            type="checkbox"
            id="sameAsPermanent"
            name="sameAsPermanent"
            checked={formData.sameAsPermanent}
            onChange={onSameAsPermanentChange}
            className="w-5 h-5 text-school-orange border-gray-300 rounded focus:ring-school-orange"
          />
          <label htmlFor="sameAsPermanent" className="text-gray-700 font-medium">
            Current address is same as permanent address
          </label>
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
                onChange={onInputChange}
                required
                className="mt-1"
                rows={3}
                disabled={formData.sameAsPermanent}
              />
            </div>
            <div>
              <Label htmlFor="currentCity">City *</Label>
              <Input
                id="currentCity"
                name="currentCity"
                value={formData.currentCity}
                onChange={onInputChange}
                required
                className="mt-1"
                disabled={formData.sameAsPermanent}
              />
            </div>
            <div>
              <Label htmlFor="currentState">State *</Label>
              <Select
                value={formData.currentState}
                onValueChange={(value) => {
                  const event = {
                    target: { name: 'currentState', value },
                  } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
                  onInputChange(event);
                }}
                disabled={formData.sameAsPermanent}
              >
                <SelectTrigger className="w-full mt-1" id="currentState">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="currentPincode">Pincode *</Label>
              <Input
                id="currentPincode"
                name="currentPincode"
                value={formData.currentPincode}
                onChange={onInputChange}
                required
                className="mt-1"
                disabled={formData.sameAsPermanent}
              />
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default AddressInfo;