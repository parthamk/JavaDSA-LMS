import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { executeCode, getSupportedLanguages } from '../services/codeExecutionService'
import toast from 'react-hot-toast'
import { Form, Button, Spinner } from 'react-bootstrap'

const codeTemplates = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  python: `print("Hello, World!")`,
  javascript: `console.log("Hello, World!");`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
}

const Practice = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [code, setCode] = useState(codeTemplates.java)
  const [language, setLanguage] = useState('java')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [theme, setTheme] = useState('vs-dark')
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    fetchLanguages()
  }, [isAuthenticated, navigate])

  const fetchLanguages = async () => {
    try {
      const langs = await getSupportedLanguages()
      setLanguages(langs)
    } catch (err) {
      toast.error('Failed to fetch languages')
    }
  }

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang)
    setCode(codeTemplates[newLang] || '// Start coding...')
    setOutput(null)
    setError(null)
  }

  const handleRunCode = async () => {
    if (!code.trim()) {
      toast.error('Please write some code first')
      return
    }

    setLoading(true)
    setError(null)
    setOutput(null)

    try {
      // Prepare payload for code execution
      const payload = {
        language,
        version: '*',
        files: [
          {
            name: language === 'java' ? 'Main.java' : `main.${language}`,
            content: code,
          },
        ],
        stdin: input || '', // Include stdin even if empty
      }

      console.log('Executing code with payload:', payload)

      const result = await executeCode(payload)

      console.log('Code execution result:', result)

      if (result.success) {
        // Display actual output (even if empty)
        setOutput(result.output || '')
        setError(null)
        toast.success('✅ Code executed successfully!')
      } else {
        // Display error with type and details
        const errorType = result.error || 'Execution Error'
        const errorDetails = result.output || ''
        
        // Format error message
        let fullError = errorType
        if (errorDetails) {
          fullError = `${errorType}\n\n${errorDetails}`
        }
        
        setError(fullError)
        setOutput(null)
        
        // Show appropriate toast message based on error type
        if (errorType.includes('Compilation')) {
          toast.error('❌ Compilation Error')
        } else if (errorType.includes('Runtime')) {
          toast.error('❌ Runtime Error')
        } else if (errorType.includes('Timeout') || errorType.includes('Infinite')) {
          toast.error('⏱️ Timeout or Infinite Loop')
        } else {
          toast.error(`❌ ${errorType}`)
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to execute code'
      setError(errorMsg)
      toast.error(errorMsg)
      console.error('Code execution error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setCode(codeTemplates[language] || '')
    setInput('')
    setOutput(null)
    setError(null)
  }

  return (
    <div className="d-flex flex-column" style={{ height: 'calc(100vh - 80px)', backgroundColor: '#1e1e1e' }}>
      {/* Toolbar */}
      <div
        className="d-flex flex-wrap gap-3 align-items-center p-3"
        style={{ backgroundColor: '#252526', borderBottom: '1px solid #3e3e42', color: 'white' }}
      >
        <div className="d-flex align-items-center gap-2">
          <label className="mb-0 fw-bold small">Language:</label>
          <Form.Select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            size="sm"
            style={{ width: '150px', backgroundColor: '#3e3e42', color: 'white', border: '1px solid #555' }}
          >
            {languages.length > 0 ? (
              languages.map((lang) => (
                <option key={lang.language} value={lang.language}>
                  {lang.language} ({lang.version})
                </option>
              ))
            ) : (
              <>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="cpp">C++</option>
              </>
            )}
          </Form.Select>
        </div>

        <div className="d-flex gap-2 flex-grow-1 justify-content-center">
          <Button
            variant="primary"
            size="sm"
            onClick={handleRunCode}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Running...
              </>
            ) : (
              '▶️ Run Code'
            )}
          </Button>
          <Button variant="outline-secondary" size="sm" onClick={handleClear}>
            🗑️ Clear
          </Button>
        </div>

        <div className="d-flex align-items-center gap-2">
          <label className="mb-0 fw-bold small">Theme:</label>
          <Form.Select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            size="sm"
            style={{ width: '120px', backgroundColor: '#3e3e42', color: 'white', border: '1px solid #555' }}
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
          </Form.Select>
        </div>
      </div>

      {/* Editor Container */}
      <div
        className="d-grid flex-grow-1"
        style={{
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 0,
          overflow: 'hidden',
        }}
      >
        {/* Editor Section */}
        <div
          className="d-flex flex-column"
          style={{
            borderRight: '1px solid #3e3e42',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundColor: '#2d2d30',
              color: '#cccccc',
              padding: '0.75rem 1rem',
              fontWeight: '600',
              fontSize: '0.9rem',
              borderBottom: '1px solid #3e3e42',
            }}
          >
            Code Editor
          </div>

          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme={theme}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                wordWrap: 'on',
                fontSize: 14,
              }}
            />
          </div>

          {/* Input Section */}
          <div
            style={{
              backgroundColor: '#1e1e1e',
              borderTop: '1px solid #3e3e42',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <label style={{ color: '#cccccc', fontWeight: '600', fontSize: '0.9rem', marginBottom: 0 }}>
              Input (stdin):
            </label>
            <Form.Control
              as="textarea"
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Provide input for your program (optional)"
              style={{
                backgroundColor: '#252526',
                color: '#d4d4d4',
                border: '1px solid #3e3e42',
                fontFamily: "'Monaco', 'Courier New', monospace",
                fontSize: '0.9rem',
              }}
            />
          </div>
        </div>

        {/* Output Section */}
        <div
          className="d-flex flex-column"
          style={{
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundColor: '#2d2d30',
              color: '#cccccc',
              padding: '0.75rem 1rem',
              fontWeight: '600',
              fontSize: '0.9rem',
              borderBottom: '1px solid #3e3e42',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            Output
            {loading && <span style={{ animation: 'spin 0.8s linear infinite' }}>⏳</span>}
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
            }}
          >
            {loading && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#858585',
                  textAlign: 'center',
                }}
              >
                <p style={{ margin: 0 }}>Executing code...</p>
              </div>
            )}

            {error && (
              <div className="error-output">
                <h5>❌ Error</h5>
                <pre>{error}</pre>
              </div>
            )}

            {output !== null && !error && !loading && (
              <div className="success-output">
                <h5>✅ Output</h5>
                <pre>{output || '(no output)'}</pre>
              </div>
            )}

            {output === null && !error && !loading && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: '#858585',
                  textAlign: 'center',
                }}
              >
                <p style={{ margin: 0 }}>Run your code to see output here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Practice
