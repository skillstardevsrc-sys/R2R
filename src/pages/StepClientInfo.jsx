import React, { useState } from 'react';
import { Building2, User, Phone, Mail, Globe, Briefcase, FileText } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';
import { WEBSITE_PURPOSES, BUSINESS_CATEGORIES } from '../data/websiteTypes';
import { validateClientInfo } from '../utils/validation';
import StepLayout from '../components/layout/StepLayout';
import TextField from '../components/ui/TextField';
import TextArea from '../components/ui/TextArea';

export default function StepClientInfo() {
  const { state, updateClientInfo, nextStep, prevStep } = usePlanner();
  const [errors, setErrors] = useState({});

  const client = state.client || {};

  const handleChange = (field, value) => {
    updateClientInfo({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleNext = () => {
    const { isValid, errors: validationErrors } = validateClientInfo(client);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    nextStep();
  };

  return (
    <StepLayout
      stepNumber={1}
      badge="Project Profile"
      title="Tell us about your brand & project."
      subtitle="Provide basic contact details and the primary objective of the new website."
      onNext={handleNext}
      onPrev={prevStep}
      canContinue={true}
    >
      <div className="bg-surface/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col gap-6">
        {/* Brand Name & Contact Person */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextField
            id="brandName"
            label="Brand / Company Name"
            placeholder="e.g. Apex Studio, Solaris AI"
            icon={Building2}
            value={client.brandName || ''}
            onChange={(e) => handleChange('brandName', e.target.value)}
            error={errors.brandName}
            required
          />

          <TextField
            id="contactPerson"
            label="Contact Person Name"
            placeholder="e.g. Alexander Vance"
            icon={User}
            value={client.contactPerson || ''}
            onChange={(e) => handleChange('contactPerson', e.target.value)}
            error={errors.contactPerson}
            required
          />
        </div>

        {/* WhatsApp & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextField
            id="whatsapp"
            label="WhatsApp Number"
            placeholder="e.g. +91 75581 38968 or +91 95855 75354"
            icon={Phone}
            value={client.whatsapp || ''}
            onChange={(e) => handleChange('whatsapp', e.target.value)}
            error={errors.whatsapp}
            helperText="Used for direct brief delivery & WhatsApp preview"
            required
          />

          <TextField
            id="email"
            label="Email Address"
            placeholder="e.g. alexander@apex.design"
            icon={Mail}
            type="email"
            value={client.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
          />
        </div>

        {/* Business Category & Website Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="businessCategory" className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-accent" />
              <span>Business Category</span>
            </label>
            <select
              id="businessCategory"
              value={client.businessCategory || BUSINESS_CATEGORIES[0]}
              onChange={(e) => handleChange('businessCategory', e.target.value)}
              className="w-full bg-[#141414] text-white text-sm rounded-xl px-4 py-3 border border-white/10 hover:border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all cursor-pointer"
            >
              {BUSINESS_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-[#141414] text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="websitePurpose" className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-accent" />
              <span>Website Purpose <span className="text-accent">*</span></span>
            </label>
            <select
              id="websitePurpose"
              value={client.websitePurpose || WEBSITE_PURPOSES[0]}
              onChange={(e) => handleChange('websitePurpose', e.target.value)}
              className="w-full bg-[#141414] text-white text-sm rounded-xl px-4 py-3 border border-white/10 hover:border-white/20 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all cursor-pointer"
            >
              {WEBSITE_PURPOSES.map((purpose) => (
                <option key={purpose} value={purpose} className="bg-[#141414] text-white">
                  {purpose}
                </option>
              ))}
            </select>
            {errors.websitePurpose && (
              <span className="text-xs text-rose-400">{errors.websitePurpose}</span>
            )}
          </div>
        </div>

        {/* Custom Purpose input if "Other" is selected */}
        {client.websitePurpose === 'Other' && (
          <TextField
            id="customPurpose"
            label="Specify Other Purpose"
            placeholder="Describe your primary website purpose..."
            value={client.customPurpose || ''}
            onChange={(e) => handleChange('customPurpose', e.target.value)}
            error={errors.customPurpose}
            required
          />
        )}

        {/* Business Description */}
        <TextArea
          id="description"
          label="Short Business Description"
          placeholder="Briefly describe what your business offers, who your clients are, and what makes your product unique..."
          value={client.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          maxLength={1000}
        />
      </div>
    </StepLayout>
  );
}
