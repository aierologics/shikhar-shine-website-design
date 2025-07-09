Multi-step Admissions Form Implementation Plan:

1. Information Gathered:
- The current Admissions.tsx is a single-page form with multiple sections: Student Info, Father Info, Mother Info, Address Info, Academic Info, Additional Info, Document Upload, and Submit.
- The form uses React useState to manage all form data in a single object.
- Form submission uploads files and inserts data into Supabase.

2. Plan:
- Add a step state (e.g., currentStep) to track the current form step.
- Divide the form into logical steps:
  Step 1: Student Information
  Step 2: Parent Information (Father + Mother)
  Step 3: Address Information
  Step 4: Academic Information
  Step 5: Additional Information
  Step 6: Document Upload
  Step 7: Preview & Submit
- Render only the fields for the current step.
- Add Next and Previous buttons to navigate steps.
- On the Preview step, display a read-only summary of all entered data.
- On Preview, add Confirm and Edit buttons.
- On Confirm, trigger the existing handleSubmit function.
- Maintain form validation per step as needed.
- Preserve file upload handling.
- Ensure form reset after successful submission.

3. Dependent Files:
- Only src/pages/Admissions.tsx needs editing.

4. Follow-up Steps:
- Implement multi-step form UI and logic.
- Test navigation, data persistence, preview accuracy.
- Test form submission from preview.
- Test validation and error handling per step.

Please confirm if I should proceed with this plan.
