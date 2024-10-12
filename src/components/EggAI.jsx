import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDv5_4NJrTbVl3oTxAVxNC9-kjALpmifrM';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: '15px',
  marginBottom: '20px',
  fontSize: '18px',
  backgroundColor: '#4caf50',
  color: 'white',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

export default function EggAI() {
  const [eggData, setEggData] = React.useState([]);
  const [analysisResults, setAnalysisResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [generatedQuestions, setGeneratedQuestions] = React.useState([]);
  const [generatedAnswers, setGeneratedAnswers] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        try {
          const parsedData = text.split('\n').map((line) => {
            const [eggId, qualityStatus, healthStatus, contaminationStatus, spectralAnalysis, parentChickenId, weight, size] = line.split(',');
            return {
              eggId: eggId.trim(),
              qualityStatus: qualityStatus.trim(),
              healthStatus: healthStatus.trim(),
              contaminationStatus: contaminationStatus.trim(),
              spectralAnalysis: spectralAnalysis.trim(),
              parentChickenId: parentChickenId.trim(),
              weight: parseFloat(weight.trim()),
              size: size.trim(),
            };
          });
          setEggData(parsedData);

          // Analyze the eggs immediately after loading the file
          const googleAI = GoogleGenerativeAI({ apiKey: API_KEY });
          const analysisPromises = parsedData.map(async (egg) => {
            const prompt = `Analyze the following egg data and provide possible issues: Quality Status: ${egg.qualityStatus}, Health Status: ${egg.healthStatus}, Contamination Status: ${egg.contaminationStatus}, Spectral Analysis Result: ${egg.spectralAnalysis}`;
            const response = await googleAI.generateText({ prompt });
            return { issue: response.data.choices[0].text.trim() };
          });
          const results = await Promise.all(analysisPromises);
          setAnalysisResults(results);
        } catch (error) {
          console.error('Error parsing file or analyzing eggs:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const generateQA = async (filePath) => {
    setLoading(true);
    try {
      // Read text from the provided file
      const text = await fetch(filePath).then(response => response.text());

      const genAI = new GoogleGenerativeAI(
        "AIzaSyCROORHopfeC_FSbAF_HSAJsFqgXiiaRgA"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Generate questions and answers based on the following text, clearly separating each question and answer pair with \"Q: \" for questions and \"A: \" for answers:\n\n${text}`;
      
      const chat = model.startChat({
        history: messages.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
        generationConfig: {
          maxOutputTokens: 10000,
        },
      });

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const responseText = await response.text();

      // Split based on "Q: " and "A: " prefixes
      const qaPairs = responseText.split(/(?=Q: )|(?=A: )/);
      const questions = qaPairs.filter((q) => q.startsWith("Q:"));
      const answers = qaPairs.filter((a) => a.startsWith("A:"));

      // Numbering the questions and answers
      const numberedQuestions = questions.map(
        (q, index) => `${index + 1}. ${q}`
      );
      const numberedAnswers = answers.map((a, index) => `${index + 1}. ${a}`);

      setGeneratedQuestions(numberedQuestions);
      setGeneratedAnswers(numberedAnswers);

      setMessages([
        ...messages,
        { role: "user", text: prompt },
        { role: "model", text: qaPairs.join("\n") },
      ]);
    } catch (error) {
      console.error("Error generating questions and answers:", error);
      setMessages([
        ...messages,
        {
          text: "Error generating questions and answers: " + error.message,
          type: "error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <StyledButton>Go to Dashboard</StyledButton>
      </Link>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        style={{ marginBottom: '20px' }}
      />
      <StyledButton onClick={() => generateQA('/path/to/your/file.txt')}>Start AI Analysis</StyledButton>
      {analysisResults.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Analysis Results</h2>
          {analysisResults.map((result, index) => (
            <p key={index}>Egg ID: {eggData[index].eggId} - Analysis Result: {result.issue}</p>
          ))}
        </div>
      )}
      {generatedQuestions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Generated Questions</h2>
          {generatedQuestions.map((question, index) => (
            <p key={index}>{question}</p>
          ))}
        </div>
      )}
      {generatedAnswers.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Generated Answers</h2>
          {generatedAnswers.map((answer, index) => (
            <p key={index}>{answer}</p>
          ))}
        </div>
      )}
    </div>
  );
}
