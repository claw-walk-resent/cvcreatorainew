
import { toast } from "@/hooks/use-toast";

// Types
export interface AIEnhanceResponse {
  enhancedText: string;
  success: boolean;
  message?: string;
}

// API key
const OPENROUTE_API_KEY = "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";

// Safe toast function that won't crash if toast isn't available
const safeToast = (props: any) => {
  try {
    return toast(props);
  } catch (e) {
    console.warn("Toast failed:", e);
    console.log("Toast would have shown:", props);
    return { id: "fallback", dismiss: () => {}, update: () => {} };
  }
};

// AI Enhancement function with improved context and field-specific prompting
export const enhanceTextWithAI = async (
  text: string, 
  role: string = "resume", 
  context: string = ""
): Promise<AIEnhanceResponse> => {
  try {
    if (!text || text.trim().length < 10) {
      return {
        enhancedText: text,
        success: false,
        message: "Text is too short to enhance (minimum 10 characters)"
      };
    }
    
    // Create field-specific prompts to get better results
    let fieldPrompt = "";
    
    switch (role) {
      case "professional summary":
        fieldPrompt = `
Focus on creating a compelling 3-4 sentence professional summary that:
- Starts with a strong opener highlighting years of experience or expertise
- Mentions key skills and accomplishments relevant to the target role
- Includes career goals or passion statement
- Uses powerful, confident language without being verbose
- Avoids clichés and generic statements
`;
        break;
      case "work experience":
        fieldPrompt = `
Focus on creating impactful bullet points that:
- Begin with strong action verbs in past tense (or present for current positions)
- Include specific metrics, percentages, or numbers whenever possible
- Highlight achievements and results rather than just responsibilities
- Align with industry keywords and terminology
- Are concise (1-2 lines each)
`;
        break;
      case "education":
        fieldPrompt = `
Focus on highlighting educational achievements and relevant coursework:
- Include academic honors, high GPA if applicable
- Mention relevant coursework, projects, or thesis topics
- Include extracurricular activities if they demonstrate leadership or relevant skills
- Format consistently and professionally
`;
        break;
      case "project description":
        fieldPrompt = `
Focus on showcasing project highlights:
- Begin with the project's purpose or business problem solved
- Highlight technologies/methods used and your specific role
- Emphasize results, impact, or user benefits
- Include team size and your contributions if relevant
`;
        break;
      case "skills":
        fieldPrompt = `
Focus on creating a clear, organized skills section:
- Group similar skills together (technical, soft, domain knowledge)
- List most relevant skills first
- Use industry-standard terminology
- Be specific rather than generic
`;
        break;
      default:
        fieldPrompt = `
Focus on creating professional, achievement-oriented content that:
- Uses strong action verbs
- Includes specific metrics where possible
- Aligns with industry standards
- Is concise and impactful
`;
    }
    
    const prompt = `
You are an expert CV/resume writer specializing in enhancing professional content.
Your task is to improve the following ${role} text for a CV/resume.

${fieldPrompt}

Additional context about this content: ${context}

Original text:
"${text}"

Enhance this text to be more impressive while:
- Maintaining professional tone and factual accuracy
- Ensuring content is appropriate for the section type (${role})
- Keeping similar length to the original
- Making it sound human and authentic, not overly formal or robotic
- Avoiding vague superlatives without evidence

Provide ONLY the enhanced text with no additional comments or formatting.
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTE_API_KEY}`
      },
      body: JSON.stringify({
        model: "google/gemini-pro",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("AI Enhancement Error:", errorData);
      return {
        enhancedText: text,
        success: false,
        message: "Failed to enhance text. Please try again."
      };
    }

    const data = await response.json();
    const enhancedText = data.choices[0].message.content.trim();

    return {
      enhancedText,
      success: true
    };
  } catch (error) {
    console.error("Error enhancing text with AI:", error);
    return {
      enhancedText: text,
      success: false,
      message: "An unexpected error occurred. Please try again."
    };
  }
};

// Export PDF function
export const exportCVToPDF = async (cvElementId: string, fileName: string = "cv"): Promise<boolean> => {
  try {
    const html2canvas = await import('html2canvas');
    const jsPDF = await import('jspdf');
    
    const cvElement = document.getElementById(cvElementId);
    if (!cvElement) {
      safeToast({
        title: "Error",
        description: "Could not find CV element to export",
        variant: "destructive"
      });
      return false;
    }
    
    // Get scale factor to maintain quality
    const scale = 2;
    
    safeToast({
      title: "Generating PDF",
      description: "Please wait while we create your CV...",
    });
    
    const canvas = await html2canvas.default(cvElement, {
      scale: scale,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      allowTaint: true
    });
    
    // A4 dimensions in mm: 210 × 297
    const imgWidth = 210;
    const pageHeight = 297;
    
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    const pdf = new jsPDF.default('p', 'mm');
    let position = 0;
    
    // First page
    pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Save the PDF
    pdf.save(`${fileName}.pdf`);
    
    safeToast({
      title: "Success",
      description: "CV exported successfully to PDF",
    });
    
    return true;
  } catch (error) {
    console.error("Error exporting CV to PDF:", error);
    safeToast({
      title: "Error",
      description: "Failed to export CV to PDF. Please try again.",
      variant: "destructive"
    });
    return false;
  }
};
