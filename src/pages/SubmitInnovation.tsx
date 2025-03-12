import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Upload, Send, Info } from "lucide-react";
import { useAnimateIn } from "../utils/animations";

interface FormData {
  name: string;
  email: string;
  title: string;
  description: string;
  file: File | null;
}

const SubmitInnovation = () => {
  const navigate = useNavigate();
  const animate = useAnimateIn();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    title: "",
    description: "",
    file: null,
  });

  const [dragActive, setDragActive] = useState(false);
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData(prev => ({ ...prev, file }));
      toast.success(`File added: ${file.name}`);
    }
  }, []);
  
  // Handle manual file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, file }));
      toast.success(`File added: ${file.name}`);
    }
  };
  
  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);
  
  // Remove file
  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    toast.info("File removed");
  };
  
  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data for submission
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      
      if (formData.file) {
        payload.append("file", formData.file);
      }
      
      // Send webhook using POST request
      const response = await fetch("https://hunren.app.n8n.cloud/webhook-test/6be710f0-50ef-4b85-921d-f3435f6d466e", {
        method: "POST",
        body: payload,
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      
      toast.success("Innovation submitted successfully!");
      
      // Reset form and redirect to home
      setFormData({
        name: "",
        email: "",
        title: "",
        description: "",
        file: null,
      });
      
      // Redirect to home page after successful submission
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit your innovation. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen w-full">
      <div 
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl opacity-50"
        />
      </div>
      
      <header className="w-full max-w-6xl mx-auto px-6 py-12 md:py-16 text-center">
        <div className={`space-y-4 transition-all duration-1000 ease-out ${animate ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block mb-2">
            <span className="text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full">
              Submit Your Innovation
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Share Your Innovation
          </h1>
          
          <p className="text-muted-foreground max-w-3xl text-lg font-normal leading-relaxed text-pretty mx-auto">
            Complete the form below to submit your innovation to our platform.
          </p>
        </div>
      </header>
      
      <main className="w-full max-w-3xl mx-auto px-6 pb-24">
        <form 
          onSubmit={handleSubmit} 
          className={`space-y-8 transition-all duration-1000 ease-out ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium flex items-center">
              Name <span className="text-destructive ml-1">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Your full name"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium flex items-center">
              Email <span className="text-destructive ml-1">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Innovation Title Field */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium flex items-center">
              Innovation Title <span className="text-destructive ml-1">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="A brief title for your innovation"
            />
          </div>

          {/* Innovation Description Field */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium flex items-center">
              Describe Your Innovation <span className="text-destructive ml-1">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
              placeholder="Provide a detailed description of your innovation..."
            />
          </div>

          {/* File Upload Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Supporting Document</label>
            
            <div 
              className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              {formData.file ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="bg-primary/10 rounded-full p-3 mb-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">{formData.file.name}</p>
                  <p className="text-muted-foreground text-sm mt-1">{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button 
                    type="button" 
                    onClick={removeFile}
                    className="text-sm text-destructive hover:underline mt-2"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="bg-primary/10 rounded-full p-3 mb-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">Drag and drop your file here</p>
                  <p className="text-muted-foreground text-sm mt-1">or click to browse</p>
                  
                  <label htmlFor="file-upload" className="mt-4 inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
                    Choose File
                  </label>
                  <input 
                    id="file-upload" 
                    type="file" 
                    className="sr-only" 
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground flex items-start gap-1.5 mt-1.5">
              <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>Accepted file formats: PDF, DOCX, PPTX, etc. Maximum file size: 10MB</span>
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-primary-foreground font-medium transition-colors ${
                isSubmitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Submit Innovation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
      
      <footer className="w-full py-8 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>Innovation Spotlight © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default SubmitInnovation;
