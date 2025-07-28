import React, { useState, type FormEvent } from 'react';
import Navbar from "../components/Navbar";
import FileUploader from '~/components/FileUploader';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router-dom';
import pdftoimg from '~/lib/pdftoimg';
import { generateUUID } from '~/lib/utils';
import { prepareInstructions } from '../../constants/index.js';

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    try {
      setIsProcessing(true);
      setStatusText('Uploading the file...');

      const uploadedFile = await fs.upload([file]);
      if (!uploadedFile) {
        setStatusText('Error: Failed to upload file');
        return;
      }

      setStatusText('Converting file to image...');
      const imageFile = await pdftoimg(file);

      if (!imageFile || !imageFile.file) {
        setStatusText('Error: Failed to convert file to image');
        return;
      }

      setStatusText('Uploading the image...');
      const uploadedImage = await fs.upload([imageFile.file]);
      if (!uploadedImage) {
        setStatusText('Error: Failed to upload image');
        return;
      }

      //using ai to generate things
      setStatusText('Preparing data');
      const uuid=generateUUID();
       const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
          await kv.set(`resume:${uuid}`, JSON.stringify(data));
        
        //using ai to generate resume feedback
        setStatusText('Analyzing...');
        const feedback = await ai.feedback( //coming from puter
            uploadedFile.path,
            //giving instructions to ai to analyze resume..like the prompt user gives
            //imported from index.ts in constants
            prepareInstructions({ jobTitle, jobDescription,AIResponseFormat: 'text' })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`)


      
      // Simulate completion
      setTimeout(() => {
        setStatusText('Analysis complete!');
        setIsProcessing(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatusText('Unexpected error occurred');
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.currentTarget.closest('form');
    if (!form) return;

    const formData = new FormData(form);
    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;

    if (!file) {
      setStatusText('Please upload a resume');
      return;
    }

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>Drop Your Resume for an ATS score and improvement Tips</h2>
          )}

          {!isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input type="text" name="company-name" id="company-name" placeholder="Company Name" required />
              </div>

              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input type="text" name="job-title" id="job-title" placeholder="Job Title" required />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea rows={5} name="job-description" id="job-description" placeholder="Job Description" required />
              </div>

              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={setFile} />
              </div>

              <button className="primary-button" type="submit">Analyze Resume</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
